🏪 Store Management & Rating System
A full-stack web application built using NestJS (backend) and React (frontend) with PostgreSQL as the database (via Supabase). The platform supports multiple roles – Admin, Store Owner, and User – each with specific dashboards and permissions.

🚀 Technologies Used

Backend

NestJS (Node.js framework)
TypeORM (ORM for PostgreSQL)
PostgreSQL (Database via Supabase)
JWT Authentication with cookies
Bcrypt for secure password hashing
Swagger for API documentation

Frontend

React.js (with React Router)
Axios (for API calls)
React Hook Form (form handling + validation)
Tailwind CSS (responsive styling)
React Icons (FaStar) for star rating system
React Toastify (notifications)

✨ Features
🔑 Authentication & Authorization

User registration & login with validations

JWT-based authentication with cookies
Role-based access control (Admin, Store Owner, User)
Update password functionality

🛠 Admin Features

Dashboard with analytics:

Total number of users
Total number of stores
Total number of ratings

Manage Users:

Add users (Normal, Admin)
View user list with filters (Name, Email, Address, Role)
If role = Store Owner → show average rating

Manage Stores:

Add new stores (name, email, address, owner)
View list of stores with filters
Show average ratings of stores

🏬 Store Owner Features

View all users who rated their stores (Name, Email, Rating, Store)
See average rating of their stores
Manage own stores

👤 User Features

Browse list of stores with:
Store name, address, average rating
User’s submitted rating
Search stores by Name & Address
Submit or update ratings (1–5 stars) for any store

📱 UI & UX

Responsive sidebar layout (different menus for Admin, Store Owner, User)
Star-based rating system
Mobile-friendly forms and tables
Toast notifications for success/error states

<img width="1909" height="829" alt="Screenshot 2025-09-21 233412" src="https://github.com/user-attachments/assets/3bb3ed09-fef4-4830-8e9b-baeafe8a9ab4" />


<img width="1896" height="850" alt="Screenshot 2025-09-21 233317" src="https://github.com/user-attachments/assets/04daad1b-fa58-44ad-9a05-dbdc5f5646ea" />

