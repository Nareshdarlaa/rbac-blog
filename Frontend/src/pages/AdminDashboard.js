import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleCreateBlog = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/blogs', { title, content, imageUrl }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Blog created successfully!');
      setTitle('');
      setContent('');
      setImageUrl('');
      navigate('/blogs');
    } catch (err) {
      alert('Failed to create blog');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Admin Dashboard - Create Blog</h2>

      <input
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '400px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <textarea
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="6"
        style={{ width: '400px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ width: '400px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleCreateBlog}
        style={{ width: '400px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Create Blog
      </button>
    </div>
  );
}

export default AdminDashboard;
