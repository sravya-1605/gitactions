import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Welcome to PetAdopt</h1>
        <p className="hero-subtitle">Find Your Perfect Companion</p>
        <div className="hero-content">
          <p>
            Every pet deserves a loving home, and every family deserves the joy that comes with pet companionship. 
            Our mission is to connect wonderful pets with caring families through our easy-to-use adoption platform.
          </p>
          <div className="features">
            <div className="feature">
              <h3>🐕 Dogs</h3>
              <p>Loyal companions ready to bring joy to your home</p>
            </div>
            <div className="feature">
              <h3>🐱 Cats</h3>
              <p>Independent and loving feline friends</p>
            </div>
            <div className="feature">
              <h3>🐰 Small Pets</h3>
              <p>Rabbits, guinea pigs, and other adorable companions</p>
            </div>
          </div>
          <div className="cta-buttons">
            <Link to="/pets" className="btn btn-primary">Browse Pets</Link>
            <Link to="/register" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home