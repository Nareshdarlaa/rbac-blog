import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, role });
      alert('Signup successful!');
      navigate('/');
    } catch (err) {
      alert('Signup failed. Try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 0px 10px #ccc' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Signup</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleSignup}
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Signup
        </button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
