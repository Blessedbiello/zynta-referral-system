# Zynta Referral System

A full-stack referral system built with Node.js/Express backend and vanilla HTML/CSS/JavaScript frontend. Users can register with optional referral codes and earn points through the referral program.

## Features

- **User Registration**: Register new users with name, email, and optional referral code
- **Referral System**: Users get unique referral codes and earn points when others use their codes
- **Points System**: 
  - Referrer earns 10 points when someone uses their code
  - New user earns 5 points when registering with a valid referral code
- **Responsive Design**: Teal and white themed UI that works on desktop and mobile
- **Real-time Updates**: Auto-refreshing user list and copy-to-clipboard functionality

## Project Structure

```
zynta-referral-system/
├── server.js              # Express backend server
├── package.json           # Node.js dependencies and scripts
├── README.md              # This file
└── public/                # Frontend files
    ├── index.html         # Main HTML page
    ├── styles.css         # CSS styling with teal/white theme
    └── script.js          # JavaScript with Fetch API integration
```

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or extract the project files** to your desired directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Frontend Interface

1. **Register a New User**:
   - Fill in the registration form with name and email (required)
   - Optionally enter a referral code to earn bonus points
   - Click "Register" to submit

2. **View All Users**:
   - See all registered users in the right panel
   - Each user card shows name, email, referral code, and current points
   - Click "Copy" next to any referral code to copy it to clipboard

### API Endpoints

The backend provides these REST API endpoints:

#### GET `/api/users`
Returns all registered users
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "referralCode": "ALICE123",
    "points": 0
  }
]
```

#### POST `/api/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "referralCode": "ALICE123"
}
```

#### GET `/api/users/:referralCode`
Find a user by their referral code
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "referralCode": "ALICE123",
  "points": 10
}
```

## Sample Data

The application starts with three sample users:
- Alice Johnson (alice@example.com) - Code: ALICE123
- Bob Smith (bob@example.com) - Code: BOB456  
- Carol Davis (carol@example.com) - Code: CAROL789

## Technical Details

### Backend
- **Framework**: Express.js
- **Data Storage**: In-memory array (data resets on server restart)
- **Port**: 3000
- **CORS**: Enabled for frontend communication

### Frontend
- **Technology**: Vanilla HTML, CSS, JavaScript
- **API Communication**: Fetch API
- **Styling**: CSS Grid/Flexbox with animations
- **Theme**: Teal (#008080) and white with gradients
- **Responsive**: Mobile-friendly design

### Security Features
- Input validation and sanitization
- HTML escaping to prevent XSS
- Email uniqueness validation
- Referral code validation

## Development

To make changes to the project:

1. **Backend changes**: Edit `server.js` and restart with `npm run dev`
2. **Frontend changes**: Edit files in `public/` directory and refresh browser
3. **Styling**: Modify `public/styles.css` for appearance changes
4. **JavaScript**: Update `public/script.js` for functionality changes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**Server won't start**:
- Check if port 3000 is already in use
- Ensure Node.js and npm are installed correctly

**Frontend not loading**:
- Verify server is running on http://localhost:3000
- Check browser console for JavaScript errors

**API requests failing**:
- Confirm server is running and responsive
- Check network tab in browser developer tools# zynta-referral-system
