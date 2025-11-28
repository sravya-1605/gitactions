import { useState, useEffect } from 'react';
import api from '../services/api';
import './OwnerDashboard.css';

function Pets({ currentUser }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAllPets(); }, []);

  const fetchAllPets = async () => {
    try {
      const response = await api.get('/pets');
      setPets(response.data);
    } catch (error) {
      console.error(error);
    } finally { setLoading(false); }
  };

  if (loading) return <div className="page-container">Loading pets...</div>;

  return (
    <div className="page-container">
      <div className="pets-grid">
        {pets.length === 0 && <p>No pets found.</p>}
        {pets.map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image">
              <img src={pet.imageUrl || 'https://via.placeholder.com/220x150'} alt={pet.name}/>
              <div className="pet-badges">
                {currentUser?.role !== 'USER' && pet.vaccinated && <span className="badge vaccinated">Vaccinated</span>}
                {currentUser?.role !== 'USER' && pet.trained && <span className="badge trained">Trained</span>}
              </div>
            </div>
            <div className="pet-info">
              <div className="pet-header">
                <h3>{pet.name}</h3>
                <span className="pet-type">{pet.type==='rabbit'?'🐰':pet.type==='cat'?'🐱':'🐕'}</span>
              </div>
              <div className="pet-details">
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Size:</strong> {pet.size}</p>
                <p><strong>Location:</strong> {pet.location}</p>
                <p>{pet.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pets;
