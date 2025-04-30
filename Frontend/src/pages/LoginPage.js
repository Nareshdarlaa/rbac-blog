import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      alert('Login successful!');

      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/blogs');
      }
    } catch (err) {
      alert('Login failed. Check email/password.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh'
    }}>
      <div style={{
        width: '350px',
        padding: '30px',
        borderRadius: '10px',
        background: 'white',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>Login</h2>

        <label style={{ fontWeight: 'bold' }}>Email</label>
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <label style={{ fontWeight: 'bold' }}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Login
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
