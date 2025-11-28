import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Check if already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = (localStorage.getItem('role') || '').toUpperCase()
    
    if (token) {
      if (role === 'OWNER') {
        navigate('/owner-dashboard')
      } else {
        navigate('/user-dashboard')
      }
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.password) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.login(formData)
      const { token, id, username, email, firstName, lastName, role } = response.data
      
      // Normalize backend role 'SHELTER' to 'OWNER' for frontend
      const normalizedRole = (role || '').toUpperCase() === 'SHELTER' ? 'OWNER' : (role || '').toUpperCase()

      const userData = {
        id,
        username,
        email,
        firstName,
        lastName,
        role: normalizedRole,
        loginTime: new Date().toLocaleString()
      }
      
      // Store user data in localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('currentUser', JSON.stringify(userData))
      localStorage.setItem('role', userData.role)
      
      // Call the onLogin callback with user data
      onLogin(userData)
      
      alert('Login successful!')

      // Redirect based on backend role
      if (userData.role === 'OWNER') {
        navigate('/owner-dashboard')
      } else {
        navigate('/user-dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      if (error.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>



          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="form-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
