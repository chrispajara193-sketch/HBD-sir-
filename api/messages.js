import { Redis } from '@upstash/redis';

// Connect to Redis if environment variables exist
let redis = null;
if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
} else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// In-memory fallback
let memoryMessages = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Development Team",
    message: "Happy Birthday, Boss! Thank you for always guiding us with patience and pushing us to reach our full potential. Have a fantastic day!",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Marketing",
    message: "Wishing you the happiest of birthdays! May this upcoming year bring you even more success, great health, and happiness.",
    createdAt: new Date().toISOString()
  }
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- GET: Fetch all messages ---
  if (req.method === 'GET') {
    try {
      if (redis) {
        const messages = await redis.get('birthday_messages');
        return res.status(200).json(messages || memoryMessages);
      }
      return res.status(200).json(memoryMessages);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  }

  // --- POST: Save a new message ---
  if (req.method === 'POST') {
    const { name, role, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      role: role ? role.trim() : 'Team Member',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      if (redis) {
        let currentMessages = (await redis.get('birthday_messages')) || memoryMessages;
        currentMessages.unshift(newMessage); // Add to top
        await redis.set('birthday_messages', currentMessages);
      } else {
        memoryMessages.unshift(newMessage);
      }
      return res.status(201).json(newMessage);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}