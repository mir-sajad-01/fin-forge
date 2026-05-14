
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import logo from '../assets/finforge-logo.svg'

function Register() {
  const navigate = useNavigate()
  const { register } = useData()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await register({ name, email, password })
      navigate('/login', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <nav className="fixed inset-x-0 top-0 z-20 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            to="/"
            aria-label="Go to landing page"
            className="flex items-center gap-3 rounded-xl transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <img src={logo} alt="Fin Forge logo" className="h-10 w-10 rounded-xl shadow-sm" />
            <div>
              <p className="text-sm font-bold text-slate-900">Fin Forge</p>
              <p className="text-xs text-slate-500">Financial management</p>
            </div>
          </Link>
        </div>
      </nav>

      <div className="flex min-h-screen items-center justify-center px-4 pb-8 pt-24">
      <form 
        onSubmit={handleRegister} 
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Account ✨
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-semibold hover:scale-[1.02] active:scale-95 transition disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>

        <p className="mt-5 text-sm text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-500 ml-1 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
      </div>
    </div>
  )
}

export default Register
