Maui’s Memories

This is a full-stack project for displaying foster dogs and their profiles.
It has a public website and a private admin page used locally to manage the data.

What it does:
  Shows foster dogs in a responsive grid
  Clicking a dog opens a detail page
  Each dog can have multiple photos
  Includes an About page with photos
  Has a local CRUD page to add, edit, and delete dogs
Tech used:
  React (Vite)
  React Router
  CSS
  ASP.NET Core Web API
  Entity Framework Core
  SQLite
Running the project:
  Backend
  cd backend
  dotnet run
  
  Frontend
  cd frontend
  npm install
  npm run dev
  Frontend runs at:http://localhost:5173
Routes:
  / — Home
  /dogs/:id — Dog profile
  /about — About page
  /crud — Admin page (local use only)
Notes:
  The admin page is not linked publicly
  CRUD endpoints are unsecured and intended for local use
  Images are stored in frontend/public/assets
  Image filenames are case-sensitive
Purpose:
  This project was built to learn React, APIs, and basic full-stack development.
