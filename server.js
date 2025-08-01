const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    referralCode: 'ALICE123',
    points: 0
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    referralCode: 'BOB456',
    points: 0
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@example.com',
    referralCode: 'CAROL789',
    points: 0
  }
];

let nextUserId = 4;

function generateReferralCode(name) {
  const prefix = name.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 3);
  const randomNum = Math.floor(Math.random() * 1000);
  return `${prefix}${randomNum}`;
}

app.get('/api/users', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/register', (req, res) => {
  try {
    const { name, email, referralCode } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (name.trim() === '' || email.trim() === '') {
      return res.status(400).json({ error: 'Name and email cannot be empty' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = {
      id: nextUserId++,
      name: name.trim(),
      email: email.trim(),
      referralCode: generateReferralCode(name),
      points: 0
    };

    if (referralCode && referralCode.trim() !== '') {
      const referrer = users.find(user => user.referralCode === referralCode.trim());
      if (referrer) {
        referrer.points += 10;
        newUser.points += 5;
      } else {
        return res.status(400).json({ error: 'Invalid referral code' });
      }
    }

    users.push(newUser);
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: newUser 
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users/:referralCode', (req, res) => {
  try {
    const { referralCode } = req.params;
    const user = users.find(user => user.referralCode === referralCode);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});