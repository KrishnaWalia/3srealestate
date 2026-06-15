'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError('Invalid email or password.')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col">
      <div className="flex justify-center pt-10 pb-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold-gradient rounded-sm flex items-center justify-center shadow-gold">
            <span className="text-white font-heading font-bold text-lg">3S</span>
          </div>
          <div>
            <div className="font-heading font-bold text-xl text-white">3S Real Estate</div>
            <div className="text-gold-400 text-xs tracking-widest">SMART • SECURE • SOPHISTICATED</div>
          </div>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-charcoal-900 border border-white/10 rounded-2xl p-8 shadow-luxury">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-heading font-bold text-white mb-1">Welcome Back</h1>
              <p className="text-white/50 text-sm">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-1.5">Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="admin@3srealestate.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-1.5">Password</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-11 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-gradient text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60 mt-2 hover:shadow-gold-lg transition-all"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm">
                Don't have an account?{' '}
                <Link href="/register" className="text-gold-400 hover:text-gold-300 transition-colors">
                  Register
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-white/30 text-xs mt-6">
            Demo credentials: admin@3srealestate.com / Admin@123
          </p>
        </div>
      </div>
    </div>
  )
}