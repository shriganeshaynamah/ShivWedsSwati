import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory guestbook store
interface GuestBookEntry {
  id: string;
  name: string;
  relation?: string;
  avatarUrl?: string;
  message: string;
  createdAt: string;
}

const guestBookEntries: GuestBookEntry[] = [
  {
    id: 'seed-1',
    name: 'Amit & Priya Sharma',
    relation: 'Friends, Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    message: 'Wishing Dr. Shiv Shankar and Dr. Shwati a lifetime of boundless joy, health, and happiness! May your union be blessed with endless laughter.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'seed-2',
    name: 'Rohan Verma',
    relation: 'Colleague, AIIMS',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    message: 'Heartiest congratulations to both of you! Two incredible doctors and wonderful souls making a perfect pair. Looking forward to celebrating together in Patna!',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'seed-3',
    name: 'Dr. Sneha & Family',
    relation: 'Family Friend, Patna',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    message: 'सदा सुहागन रहो! शिव और श्वाति को वैवाहिक जीवन की ढेरों शुभकामनाएं। ईश्वर आप दोनों की जोड़ी को सदा सलामत रखे।',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];

// ----------------- API ROUTES -----------------

// Guestbook APIs
app.get('/api/guestbook', (req, res) => {
  res.json({ entries: guestBookEntries });
});

app.post('/api/guestbook', (req, res) => {
  const { name, relation, message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const cleanName = (name && typeof name === 'string' && name.trim()) 
    ? name.trim() 
    : 'Well-Wisher / शुभचिंतक';

  const newEntry: GuestBookEntry = {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: cleanName,
    relation: (relation && typeof relation === 'string' && relation.trim()) ? relation.trim() : undefined,
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  guestBookEntries.unshift(newEntry);
  res.status(201).json({ success: true, entry: newEntry });
});

// Global Express error handler to gracefully catch malformed URI / payload errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Handled server error:', err?.message || err);
  if (!res.headersSent) {
    res.status(200).json({ error: 'Request processed with fallback' });
  }
});

// ----------------- VITE & STATIC HANDLING -----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        // AI Studio environment constraint: HMR is disabled
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
