
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useData } from '../context/DataContext'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <form 
        onSubmit={handleRegister} 
        className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 border border-gray-200"
      >
        <Link
          to="/"
          aria-label="Back to landing page"
          title="Back to home"
          className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

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
  )
}

export default Register
