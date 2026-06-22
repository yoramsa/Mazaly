import { Suspense } from 'react'
import Logo from '@/components/Logo'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'Connexion',
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[10%] top-[5%] h-72 w-72 rounded-full bg-bleu/20 blur-[120px]" />
        <div className="absolute left-[8%] bottom-[8%] h-72 w-72 rounded-full bg-mauve/20 blur-[120px]" />
      </div>
      <div className="glass w-full max-w-sm rounded-[2rem] p-8 shadow-lift">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-7 text-center font-serif text-2xl font-bold text-marine">
          Espace rédaction
        </h1>
        <p className="mt-1 text-center text-sm text-marine/60">
          Connectez-vous pour accéder au tableau de bord.
        </p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
