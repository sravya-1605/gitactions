import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './OwnerDashboard.css'; // reuse OwnerDashboard card styles

function UserDashboard({ currentUser }) {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!currentUser) return navigate('/login');
    if (currentUser.role === 'OWNER') return navigate('/owner-dashboard'); // owners go to OwnerDashboard
    fetchAllPets();
  }, [currentUser, navigate]);

  const fetchAllPets = async () => {
    try {
      const response = await api.get('/pets'); // fetch all pets
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic
  const filteredPets = selectedCategory === 'all'
    ? pets
    : pets.filter(pet => pet.type.toLowerCase() === selectedCategory);

  const handleAdopt = (petName) => {
    alert(`Thank you for your interest in adopting ${petName}!`);
  };

  if (loading) return <div className="page-container">Loading pets...</div>;

  return (
    <div className="page-container">
      <h1>Available Pets for Adoption</h1>

      {/* Filter buttons */}
      <div className="pet-filters">
        {['all', 'dog', 'cat', 'rabbit'].map(type => (
          <button
            key={type}
            className={selectedCategory === type ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setSelectedCategory(type)}
          >
            {type === 'all'
              ? `All Pets (${pets.length})`
              : `${type[0].toUpperCase() + type.slice(1)}s (${pets.filter(p => p.type.toLowerCase() === type).length})`}
          </button>
        ))}
      </div>

      {/* Pets grid */}
      <div className="pets-grid">
        {filteredPets.length === 0 && <p>No pets found.</p>}

        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image">
              <img src={pet.imageUrl || 'https://via.placeholder.com/220x150'} alt={pet.name} />
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
                <p>{pet.description}</p>
                <p><strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}</p>
                <p><strong>Trained:</strong> {pet.trained ? 'Yes' : 'No'}</p>
              </div>

              {/* Only users see Adopt button */}
              <button className="adopt-btn" onClick={() => handleAdopt(pet.name)}>
                Adopt {pet.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
