import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './OwnerDashboard.css';

function OwnerDashboard({ currentUser }) {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', type: '', breed: '', age: '', gender: '', size: '', location: '', description: '', imageUrl: '', vaccinated: false, trained: false
  });
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    if (!currentUser) return navigate('/login');
    if (currentUser.role !== 'OWNER') return navigate('/user-dashboard');
    fetchPets();
  }, [currentUser, navigate]);

  const fetchPets = async () => {
    try {
      const response = await api.get(`/pets/my-pets`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPet) {
        await api.put(`/pets/${editingPet.id}`, formData);
        alert('Pet updated successfully!');
      } else {
        await api.post('/pets', formData);
        alert('Pet added successfully!');
      }
      setFormData({ name:'', type:'', breed:'', age:'', gender:'', size:'', location:'', description:'', imageUrl:'', vaccinated:false, trained:false });
      setEditingPet(null);
      fetchPets();
    } catch (error) {
      console.error('Failed to save pet:', error.response?.data || error.message);
      alert('Failed to save pet: ' + (error.response?.data || error.message));
    }
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name || '',
      type: pet.type || '',
      breed: pet.breed || '',
      age: pet.age || '',
      gender: pet.gender || '',
      size: pet.size || '',
      location: pet.location || '',
      description: pet.description || '',
      imageUrl: pet.imageUrl || '',
      vaccinated: pet.vaccinated || false,
      trained: pet.trained || false
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      await api.delete(`/pets/${id}`);
      alert('Pet deleted successfully!');
      fetchPets();
    } catch (error) {
      console.error(error);
      alert('Failed to delete pet');
    }
  };

  if (loading) return <div className="page-container"><div className="loading">Loading pets...</div></div>;

  return (
    <div className="page-container">
      <h1>Owner Dashboard</h1>

      {/* Vertical Form */}
      <div className="pet-form-vertical">
        <h2>{editingPet ? 'Edit Pet' : 'Add New Pet'}</h2>
        <form onSubmit={handleSubmit}>
          {['type','name','breed','age','gender','size','location','description','imageUrl'].map(field => (
            <div className="form-field" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'age' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="form-field checkboxes">
            <label><input type="checkbox" name="vaccinated" checked={formData.vaccinated} onChange={handleChange} /> Vaccinated</label>
            <label><input type="checkbox" name="trained" checked={formData.trained} onChange={handleChange} /> Trained</label>
          </div>

          <button type="submit" className="submit-btn">{editingPet ? 'Update Pet' : 'Add Pet'}</button>
        </form>
      </div>

      {/* Pets horizontal cards */}
      <div className="pets-grid">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image">
              <img src={pet.imageUrl || 'https://via.placeholder.com/220x150'} alt={pet.name} />
              <div className="pet-badges">
                {pet.vaccinated && <span className="badge vaccinated">Vaccinated</span>}
                {pet.trained && <span className="badge trained">Trained</span>}
              </div>
            </div>
            <div className="pet-info">
              <div className="pet-header">
                <h3>{pet.name}</h3>
                <span className="pet-type">{pet.type === 'rabbit' ? '🐰' : pet.type === 'cat' ? '🐱' : '🐕'}</span>
              </div>
              <div className="pet-details">
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Size:</strong> {pet.size}</p>
                <p><strong>Location:</strong> {pet.location}</p>
                <p>{pet.description}</p>
              </div>
              <div className="card-buttons">
                <button onClick={() => handleEdit(pet)}>Edit</button>
                <button onClick={() => handleDelete(pet.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {pets.length === 0 && <p>No pets found. Add some pets!</p>}
      </div>
    </div>
  );
}

export default OwnerDashboard;
