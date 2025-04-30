import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [newComment, setNewComment] = useState({});
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      alert('Error fetching blogs');
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/blogs/${id}/like`);
      fetchBlogs(); // Refresh blogs
    } catch (err) {
      alert('Failed to like the blog');
    }
  };

  const handleComment = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/blogs/${id}/comment`, { comment: newComment[id] });
      setNewComment((prev) => ({ ...prev, [id]: '' }));
      fetchBlogs();
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  const toggleReadMore = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#007bff' }}>Explore Blogs</h2>

      {role === 'admin' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            ➕ Create New Blog
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
        {blogs.length === 0 ? (
          <p>No blogs yet. Be the first to post!</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} style={{
              width: '320px',
              minHeight: 'auto',
              border: '1px solid #e0e0e0',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#f9f9f9',
              transition: '0.3s',
              cursor: 'pointer'
            }}>
              {blog.imageUrl && (
                <img src={blog.imageUrl} alt="Blog" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
              )}
              <h3 style={{ color: '#007bff' }}>{blog.title}</h3>
              <p style={{ fontSize: '14px' }}>
                {expandedBlogId === blog._id ? blog.content : blog.content.slice(0, 100) + (blog.content.length > 100 ? "..." : "")}
              </p>
              {blog.content.length > 100 && (
                <button
                  onClick={() => toggleReadMore(blog._id)}
                  style={{ background: 'none', color: '#007bff', border: 'none', cursor: 'pointer', marginBottom: '10px' }}
                >
                  {expandedBlogId === blog._id ? 'Show Less' : 'Read More'}
                </button>
              )}
              <small>Author: {blog.author?.name || "Unknown"}</small><br />
              <small>Posted: {new Date(blog.timestamp).toLocaleDateString()}</small>

              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleLike(blog._id)} style={{ background: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                  👍 {blog.likes || 0} Likes
                </button>
              </div>

              <div style={{ marginTop: '10px' }}>
                <input
                  placeholder="Add a comment..."
                  value={newComment[blog._id] || ''}
                  onChange={(e) => setNewComment({ ...newComment, [blog._id]: e.target.value })}
                  style={{ width: '100%', padding: '5px', marginBottom: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button
                  onClick={() => handleComment(blog._id)}
                  style={{ backgroundColor: '#17a2b8', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
                >
                  Add Comment
                </button>
              </div>

              <div style={{ marginTop: '10px' }}>
                <h4>Comments:</h4>
                {blog.comments && blog.comments.length > 0 ? (
                  blog.comments.map((comment, index) => (
                    <p key={index} style={{ background: '#f1f1f1', padding: '5px', borderRadius: '5px' }}>{comment}</p>
                  ))
                ) : (
                  <small>No comments yet.</small>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogsPage;
