import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header({ isLoggedIn, currentUser, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('role')
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🐾 PetAdopt</h1>
        </div>
        <nav className="nav">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/pets" 
            className={location.pathname === '/pets' ? 'nav-link active' : 'nav-link'}
          >
            Pets
          </Link>
          <Link 
            to="/contact" 
            className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
          >
            Contact
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link 
                to="/profile" 
                className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link'}
              >
                Profile
              </Link>

              {currentUser?.role === 'ADMIN' && (
                <>
                  <Link 
                    to="/profile" 
                    className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link'}
                  >
                    Content
                  </Link>
                  <Link 
                    to="/admin/users" 
                    className={location.pathname === '/admin/users' ? 'nav-link active' : 'nav-link'}
                  >
                    Manage Users
                  </Link>
                </>
              )}

              {currentUser?.role === 'OWNER' && (
                <Link 
                  to="/owner-dashboard" 
                  className={location.pathname === '/owner-dashboard' ? 'nav-link active' : 'nav-link'}
                >
                  Owner Dashboard
                </Link>
              )}

              {currentUser?.role === 'USER' && (
                <Link 
                  to="/dashboard" 
                  className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
                >
                  User Dashboard
                </Link>
              )}

              <div className="user-menu">
                <span className="welcome-text">
                  Welcome, {currentUser?.firstName || currentUser?.username}!
                  <span className="role-badge">{currentUser?.role}</span>
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={location.pathname === '/register' ? 'nav-link active' : 'nav-link'}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
