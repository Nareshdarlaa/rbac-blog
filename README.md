
# RBAC Blog Platform — MERN Stack

This is a full-stack blogging platform with **Role-Based Access Control (RBAC)**.  
- Users can: Signup, Login, View Blogs, Like & Comment.  
- Admins can: Do everything users can + Create & Delete Blogs.

---

## Technologies Used

**Frontend**: React.js  
**Backend**: Node.js + Express  
**Database**: MongoDB Atlas  
**Auth**: JWT + Bcrypt  
**Deployment**: Netlify (frontend) & Render (backend)

---

##  User Roles & Permissions

| Role   | What They Can Do                         |
|--------|------------------------------------------|
| `user` | View blogs, Like, Comment                |
| `admin`| Create new blogs, Delete blogs (RBAC)    |

---

##  Key Features

- JWT-based secure login
- Role-based access control (admin/user)
- Blog create, read, like, comment
- Admin-only delete
- Upload blog with image URL
- Responsive & Clean UI
- Read More toggle
- Deployment-ready structure

---

##  Installation & Running Locally

Follow the steps below to run this full-stack application on your local machine:

###  Backend Setup (Node.js + Express)

1. Open terminal  
2. Navigate to the backend folder:

```bash
cd Backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the `Backend/` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

5. Start the backend server:

```bash
npm start
```

> The backend will run at: `http://localhost:5000`

---

###  Frontend Setup (React.js)

1. Open a new terminal window/tab  
2. Navigate to the frontend folder:

```bash
cd Frontend
```

3. Install frontend dependencies:

```bash
npm install
```

4. Create a `.env` file in the `Frontend/` directory and add:

```env
REACT_APP_API_BASE=http://localhost:5000
```

5. Start the frontend React app:

```bash
npm start
```

> The frontend will run at: `http://localhost:3000`

---

###  Test it now:

- Open your browser and go to `http://localhost:3000`
- Register as a user or admin
- Try creating/viewing blogs, liking, commenting, or deleting (admin only)

---

##  Working of the Project (Step-by-Step Flow)

1. **User/Admin Signup & Login**
2. **Role-based routing (user → /blogs, admin → /admin)**
3. **Users can view, like, and comment**
4. **Admins can create and delete blogs**
5. **Protected routes using JWT & role-based middleware**

---

##  Folder Structure

```
rbac-blog/
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   └── .env
│   └── package.json
├── README.md
├── ARCHITECTURE.md
```

---

##  Deployment Instructions

- **Frontend** → Netlify or Vercel
- **Backend** → Render or Railway
- **Database** → MongoDB Atlas

---

