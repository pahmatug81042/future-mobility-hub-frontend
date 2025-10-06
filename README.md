# Future Mobility Hub - Frontend

**Future Mobility Hub** frontend is a modern, responsive, and interactive React application built with **React.js**, **React Router**, **Context API**, and **Leaflet.js** for maps. It connects seamlessly with the backend API to provide users with trips, vehicles, predictive analytics, and route suggestions while supporting authentication and role-based access.

---

## Features

- **Authentication**
  - User registration and login
  - Protected routes for authenticated users
  - Admin access for dashboards and analytics

- **Dashboard**
  - Displays user trips, vehicles, and predictive traffic analytics
  - Fetches real-time updates from backend

- **Admin Dashboard**
  - Key statistics for trips and vehicles
  - Weekly and monthly trip trends
  - Vehicle usage heatmaps
  - Predictive analytics overview

- **Trips**
  - Create new trips with `TripForm`
  - View all trips in `TripList`
  - Predicted traffic levels included for each trip

- **Vehicles**
  - Vehicle list display
  - Real-time vehicle tracking via Socket.io

- **Route Suggestions**
  - Optimal route recommendations based on origin and destination
  - Traffic predictions along the suggested route
  - Interactive map visualization using `TrafficMap` and Leaflet.js

- **User Profile**
  - Update name and email in user profile
  - Accessible to all authenticated users

- **Theme Toggle**
  - Switch between light and dark modes
  - Persistent theme using `ThemeContext`

- **Security & Best Practices**
  - JWT authentication for secure API access
  - Role-based access (Admin/User)
  - Input validation and error handling

- **Responsive UI**
  - Works on desktop and mobile devices
  - Clean and modern design

---

## Tech Stack

- **Frontend:** React.js, React Router, Context API
- **State Management:** AuthContext, ThemeContext
- **HTTP Requests:** Axios
- **Maps & Visualization:** Leaflet.js, react-leaflet, Polyline, Marker
- **Styling:** CSS, App.css, global and modular styles
- **Real-Time:** Socket.io-client
- **Protected Routes & Authentication:** Custom route protection with contexts

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/future-mobility-hub-frontend.git
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root directory with:
```env
VITE_BACKEND_URL=http://localhost:5000
```
4. Start the development server:
```bash
npm run dev
```
The frontend will run on http://localhost:5173
 by default.

## Scripts
* npm run dev – Start frontend in development mode
* npm run build – Build frontend for production
* npm run preview – Preview production build locally

## Future Enhancements
* Add pagination and filtering for trips and vehicles
* Improve map visuals with custom markers and clustering
* Implement push notifications for real-time trip/vehicle updates
* Integrate AI-based route optimization and traffic prediction
* Improve accessibility and mobile responsiveness