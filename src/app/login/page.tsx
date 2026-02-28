'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const result = await signIn('credentials', {
      password,
      redirect: false,
    })
    if (result?.ok) {
      router.push('/admin')
    } else {
      setError('Incorrect password.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-light tracking-widest uppercase mb-8 text-center">Admin</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-beige-200 border border-neutral-700 px-4 py-3 text-sm rounded focus:outline-none focus:border-neutral-400"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-neutral-100 text-neutral-900 py-3 text-sm tracking-widest uppercase font-medium rounded hover:bg-white transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
