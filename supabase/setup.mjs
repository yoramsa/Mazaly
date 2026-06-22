import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')
const API = 'https://api.supabase.com'

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN
const REGION = process.env.SUPABASE_REGION || 'eu-central-1'
const PROJECT_NAME = process.env.SUPABASE_PROJECT_NAME || 'mazaly'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
let ORG_ID = process.env.SUPABASE_ORG_ID
let PROJECT_REF = process.env.SUPABASE_PROJECT_REF

function fail(msg) {
  console.error(`\n❌ ${msg}\n`)
  process.exit(1)
}

function log(msg) {
  console.log(msg)
}

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
  const text = await res.text()
  let body
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = text
  }
  if (!res.ok) {
    const detail = typeof body === 'string' ? body : JSON.stringify(body)
    throw new Error(`${options.method || 'GET'} ${path} -> ${res.status}: ${detail}`)
  }
  return body
}

async function runSql(ref, query) {
  return api(`/v1/projects/${ref}/database/query`, {
    method: 'POST',
    body: JSON.stringify({ query }),
  })
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  if (!TOKEN) {
    fail(
      'Variable SUPABASE_ACCESS_TOKEN manquante.\n' +
        'Crée un Personal Access Token sur https://supabase.com/dashboard/account/tokens\n' +
        'puis relance :\n' +
        '  SUPABASE_ACCESS_TOKEN=sbp_xxx ADMIN_EMAIL=toi@exemple.com ADMIN_PASSWORD=motdepasse node supabase/setup.mjs'
    )
  }

  if (!PROJECT_REF) {
    log('→ Récupération des organisations…')
    const orgs = await api('/v1/organizations')
    if (!Array.isArray(orgs) || orgs.length === 0) {
      fail('Aucune organisation trouvée. Crée d\'abord un compte Supabase sur https://supabase.com')
    }
    if (!ORG_ID) {
      if (orgs.length === 1) {
        ORG_ID = orgs[0].id
        log(`  Organisation : ${orgs[0].name} (${ORG_ID})`)
      } else {
        log('  Plusieurs organisations trouvées :')
        orgs.forEach((o) => log(`   - ${o.name} : ${o.id}`))
        fail('Relance avec SUPABASE_ORG_ID=<id> pour choisir.')
      }
    }

    log('→ Vérification des projets existants…')
    const projects = await api('/v1/projects')
    const existing = Array.isArray(projects)
      ? projects.find((p) => p.name === PROJECT_NAME)
      : null

    if (existing) {
      PROJECT_REF = existing.id
      log(`  Projet « ${PROJECT_NAME} » déjà existant (${PROJECT_REF}), réutilisation.`)
    } else {
      const dbPass = randomBytes(18).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)
      log(`→ Création du projet « ${PROJECT_NAME} » (région ${REGION})…`)
      const created = await api('/v1/projects', {
        method: 'POST',
        body: JSON.stringify({
          name: PROJECT_NAME,
          organization_id: ORG_ID,
          region: REGION,
          db_pass: dbPass,
          plan: 'free',
        }),
      })
      PROJECT_REF = created.id || created.ref
      log(`  Projet créé : ${PROJECT_REF}`)
      log(`  Mot de passe base de données : ${dbPass}`)
      log('  (note-le quelque part, il ne sera plus affiché)')
    }
  }

  log('→ Attente de la disponibilité du projet (peut prendre 1 à 3 minutes)…')
  let healthy = false
  for (let i = 0; i < 60; i++) {
    try {
      const p = await api(`/v1/projects/${PROJECT_REF}`)
      const status = p.status || (p.database && p.database.status)
      if (status === 'ACTIVE_HEALTHY') {
        healthy = true
        break
      }
      process.stdout.write(`  …${status || 'PROVISIONING'}\r`)
    } catch {
      process.stdout.write('  …attente\r')
    }
    await sleep(5000)
  }
  if (!healthy) fail('Le projet n\'est pas devenu disponible à temps. Relance le script un peu plus tard.')
  log('\n  Projet disponible.')

  log('→ Récupération des clés API…')
  const keys = await api(`/v1/projects/${PROJECT_REF}/api-keys?reveal=true`)
  const anon = keys.find((k) => k.name === 'anon')?.api_key
  const service = keys.find((k) => k.name === 'service_role')?.api_key
  if (!anon || !service) fail('Impossible de récupérer les clés anon / service_role.')
  const url = `https://${PROJECT_REF}.supabase.co`

  log('→ Exécution du schéma SQL…')
  const schema = readFileSync(join(ROOT, 'supabase', 'schema.sql'), 'utf8')
  try {
    await runSql(PROJECT_REF, schema)
    log('  Schéma appliqué.')
  } catch (e) {
    log(`  ⚠ Schéma : ${e.message}`)
    log('  (si les tables existent déjà, c\'est normal — on continue)')
  }

  log('→ Création des buckets Storage et policies…')
  const storage = readFileSync(join(ROOT, 'supabase', 'storage.sql'), 'utf8')
  try {
    await runSql(PROJECT_REF, storage)
    log('  Storage configuré.')
  } catch (e) {
    log(`  ⚠ Storage : ${e.message}`)
  }

  log('→ Écriture de .env.local…')
  const envPath = join(ROOT, '.env.local')
  const envContent =
    `NEXT_PUBLIC_SUPABASE_URL=${url}\n` +
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=${anon}\n` +
    `SUPABASE_SERVICE_ROLE_KEY=${service}\n`
  if (existsSync(envPath)) {
    writeFileSync(`${envPath}.backup`, readFileSync(envPath))
    log('  Ancien .env.local sauvegardé en .env.local.backup')
  }
  writeFileSync(envPath, envContent)
  log('  .env.local écrit.')

  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    log(`→ Création du compte admin (${ADMIN_EMAIL})…`)
    try {
      const res = await fetch(`${url}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
          apikey: service,
          Authorization: `Bearer ${service}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          email_confirm: true,
        }),
      })
      const body = await res.json()
      if (!res.ok && res.status !== 422) {
        log(`  ⚠ Création utilisateur : ${JSON.stringify(body)}`)
      } else {
        log('  Compte créé (ou déjà existant).')
      }
      await runSql(
        PROJECT_REF,
        `update profiles set role = 'admin' where id = (select id from auth.users where email = '${ADMIN_EMAIL.replace(/'/g, "''")}');`
      )
      log('  Rôle admin attribué.')
    } catch (e) {
      log(`  ⚠ Admin : ${e.message}`)
    }
  } else {
    log('→ ADMIN_EMAIL / ADMIN_PASSWORD non fournis : compte admin à créer manuellement.')
  }

  log('\n✅ Terminé !')
  log(`   URL projet : ${url}`)
  log('   Lance maintenant : npm run dev  →  http://localhost:3000')
  log('   Admin : http://localhost:3000/login')
  log('\n🔐 Pense à révoquer ton Personal Access Token après usage si tu ne t\'en sers plus :')
  log('   https://supabase.com/dashboard/account/tokens')
}

main().catch((e) => fail(e.message))
