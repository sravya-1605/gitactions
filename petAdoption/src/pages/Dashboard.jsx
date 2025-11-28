import { useState } from 'react'
import { pets } from '../data/pets'

function Dashboard({ currentUser }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState([])

  const filteredPets = selectedCategory === 'all' 
    ? pets 
    : pets.filter(pet => pet.type === selectedCategory)

  const toggleFavorite = (petId) => {
    setFavorites(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    )
  }

  const handleAdopt = (petName) => {
    alert(`Adoption application started for ${petName}! In a real app, this would open a detailed adoption form with your information pre-filled.`)
  }

  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="dashboard-container">
          <h2>Please log in to access your dashboard</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard, {currentUser.name}!</h1>
        <p>Browse and adopt your perfect companion</p>
        <div className="user-stats">
          <div className="stat">
            <span className="stat-number">{favorites.length}</span>
            <span className="stat-label">Favorites</span>
          </div>
          <div className="stat">
            <span className="stat-number">{pets.length}</span>
            <span className="stat-label">Available Pets</span>
          </div>
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">Applications</span>
          </div>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="pet-filters">
        <button 
          className={selectedCategory === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCategory('all')}
        >
          All Pets ({pets.length})
        </button>
        <button 
          className={selectedCategory === 'dog' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCategory('dog')}
        >
          Dogs ({pets.filter(p => p.type === 'dog').length})
        </button>
        <button 
          className={selectedCategory === 'cat' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCategory('cat')}
        >
          Cats ({pets.filter(p => p.type === 'cat').length})
        </button>
        <button 
          className={selectedCategory === 'rabbit' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCategory('rabbit')}
        >
          Small Pets ({pets.filter(p => p.type === 'rabbit').length})
        </button>
      </div>

      {/* Pets grid */}
      <div className="pets-grid">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-card dashboard-card">
            <div className="pet-image">
              <img src={pet.image} alt={pet.name} />
              <div className="pet-badges">
                {pet.vaccinated && <span className="badge vaccinated">Vaccinated</span>}
                {pet.trained && <span className="badge trained">Trained</span>}
              </div>
              <button 
                className={`favorite-btn ${favorites.includes(pet.id) ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(pet.id)}
              >
                {favorites.includes(pet.id) ? '❤️' : '🤍'}
              </button>
            </div>
            
            <div className="pet-info">
              <div className="pet-header">
                <h3>{pet.name}</h3>
                <span className="pet-type">{pet.type === 'rabbit' ? '🐰' : pet.type === 'cat' ? '🐱' : '🐕'}</span>
              </div>
              
              <div className="pet-details">
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age} year{pet.age !== 1 ? 's' : ''}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Size:</strong> {pet.size}</p>
                <p><strong>Location:</strong> {pet.location}</p>
              </div>
              
              <p className="pet-description">{pet.description}</p>
              
              <button 
                className="btn btn-primary adopt-btn"
                onClick={() => handleAdopt(pet.name)}
              >
                Start Adoption Process
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="no-pets">
          <h3>No pets found</h3>
          <p>Try selecting a different category.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard