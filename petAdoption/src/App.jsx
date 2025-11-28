import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Pets from './pages/Pets'
import Dashboard from './pages/Dashboard'
import UserDashboard from './pages/UserDashboard'
import OwnerDashboard from './pages/OwnerDashborad'
import Profile from './pages/Profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Initialize app state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('currentUser')
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setIsLoggedIn(true)
        setCurrentUser(userData)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        // Clear corrupted data
        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('role')
      }
    }
  }, [])

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setCurrentUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('role', userData.role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('role')
    localStorage.removeItem('pets')
    localStorage.removeItem('adoptionRequests')
    localStorage.removeItem('users')
  }

  const handleUpdateProfile = (updatedData) => {
    const newUserData = {
      ...currentUser,
      ...updatedData
    }
    setCurrentUser(newUserData)
    localStorage.setItem('currentUser', JSON.stringify(newUserData))
  }

  return (
    <Router>
      <div className="App">
        <Header 
          isLoggedIn={isLoggedIn} 
          currentUser={currentUser} 
          onLogout={handleLogout} 
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pets" element={<Pets />} />
            
            {/* Role-based Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                currentUser?.role === 'OWNER'
                  ? <OwnerDashboard currentUser={currentUser} />
                  : <UserDashboard currentUser={currentUser} />
              } 
            />
            <Route 
              path="/user-dashboard" 
              element={<UserDashboard currentUser={currentUser} />} 
            />
            <Route 
              path="/owner-dashboard" 
              element={<OwnerDashboard currentUser={currentUser} />} 
            />
            <Route 
              path="/profile" 
              element={
                <Profile 
                  currentUser={currentUser} 
                  onUpdateProfile={handleUpdateProfile} 
                />
              } 
            />
            
            {/* Removed Admin routes */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
