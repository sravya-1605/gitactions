import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile({ currentUser, onUpdateProfile }) {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    state: currentUser?.state || '',
    zipCode: currentUser?.zipCode || '',
    bio: currentUser?.bio || '',
    petPreference: currentUser?.petPreference || 'any',
    experience: currentUser?.experience || 'beginner'
  })

  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="profile-container">
          <h2>Please log in to view your profile</h2>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateProfile(formData)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      city: currentUser?.city || '',
      state: currentUser?.state || '',
      zipCode: currentUser?.zipCode || '',
      bio: currentUser?.bio || '',
      petPreference: currentUser?.petPreference || 'any',
      experience: currentUser?.experience || 'beginner'
    })
    setIsEditing(false)
  }

  return (
    <div className="page-container">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {(currentUser.name || currentUser.email).charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-info">
            <h1>{currentUser.name || 'Pet Lover'}</h1>
            <p className="profile-email">{currentUser.email}</p>
            <p className="profile-member-since">Member since {currentUser.loginTime || 'Today'}</p>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" form="profile-form" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          {!isEditing ? (
            // View Mode
            <div className="profile-view">
              <div className="profile-section">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name:</label>
                    <span>{currentUser.name || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone:</label>
                    <span>{currentUser.phone || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <label>Address:</label>
                    <span>{currentUser.address || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <label>City:</label>
                    <span>{currentUser.city || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <label>State:</label>
                    <span>{currentUser.state || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <label>Zip Code:</label>
                    <span>{currentUser.zipCode || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Pet Preferences</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Preferred Pet Type:</label>
                    <span className="capitalize">{currentUser.petPreference || 'Any'}</span>
                  </div>
                  <div className="info-item">
                    <label>Experience Level:</label>
                    <span className="capitalize">{currentUser.experience || 'Beginner'}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>About Me</h3>
                <p className="bio-text">
                  {currentUser.bio || 'No bio provided yet. Click "Edit Profile" to add information about yourself and what kind of pet companion you\'re looking for!'}
                </p>
              </div>

              <div className="profile-section">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                    Browse Pets
                  </button>
                  <button className="btn btn-secondary" onClick={() => alert('Feature coming soon!')}>
                    View Applications
                  </button>
                  <button className="btn btn-secondary" onClick={() => alert('Feature coming soon!')}>
                    My Favorites
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form id="profile-form" onSubmit={handleSubmit} className="profile-form">
              <div className="profile-section">
                <h3>Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your street address"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter your state"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Enter your zip code"
                    />
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Pet Preferences</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="petPreference">Preferred Pet Type</label>
                    <select
                      id="petPreference"
                      name="petPreference"
                      value={formData.petPreference}
                      onChange={handleChange}
                    >
                      <option value="any">Any</option>
                      <option value="dog">Dogs</option>
                      <option value="cat">Cats</option>
                      <option value="rabbit">Small Pets</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="experience">Experience Level</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="experienced">Experienced</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>About Me</h3>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself, your living situation, and what kind of pet companion you're looking for..."
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile