import { Suspense } from 'react'
import Logo from '@/components/Logo'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'Connexion',
}

export default function LoginPage() {
  return (
    <div className="mosaic flex min-h-screen items-center justify-center bg-creme px-4">
      <div className="w-full max-w-sm rounded-xl border border-or bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-serif text-2xl font-bold text-marine">
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
