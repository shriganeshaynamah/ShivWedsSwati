import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// In-memory sessions and guestbook store
interface GitHubUser {
  id: number | string;
  login: string;
  name: string;
  avatar_url: string;
  bio?: string;
  html_url: string;
  email?: string;
}

interface GuestBookEntry {
  id: string;
  name: string;
  handle?: string;
  avatarUrl?: string;
  message: string;
  createdAt: string;
  isGitHubVerified?: boolean;
}

const sessions = new Map<string, GitHubUser>();

const guestBookEntries: GuestBookEntry[] = [
  {
    id: 'seed-1',
    name: 'Amit & Priya Sharma',
    handle: 'amit-sharma-tech',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    message: 'Wishing Dr. Shiv Shankar and Dr. Shwati a lifetime of boundless joy, health, and happiness! May your union be blessed with endless laughter.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isGitHubVerified: true,
  },
  {
    id: 'seed-2',
    name: 'Rohan Verma',
    handle: 'rohanv-dev',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    message: 'Heartiest congratulations to both of you! Two incredible souls making a perfect pair. Looking forward to celebrating together in Patna!',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isGitHubVerified: true,
  }
];

function getRedirectUri(req: express.Request): string {
  const host = req.get('x-forwarded-host') || req.get('host') || '';
  if (host.includes('ais-pre-')) {
    return 'https://ais-pre-bqh3ep774ncse22iyjynnm-231831413221.asia-east1.run.app/auth/callback';
  }
  if (process.env.APP_URL) {
    const base = process.env.APP_URL.replace(/\/+$/, '');
    return `${base}/auth/callback`;
  }
  return 'https://ais-dev-bqh3ep774ncse22iyjynnm-231831413221.asia-east1.run.app/auth/callback';
}

function getSessionUser(req: express.Request): GitHubUser | null {
  const token = req.cookies?.session_token || 
                (req.headers['authorization']?.replace(/^Bearer\s+/i, '')) ||
                (req.headers['x-session-token'] as string);

  if (token && sessions.has(token)) {
    return sessions.get(token) || null;
  }
  return null;
}

// ----------------- API ROUTES -----------------

// Status & Config info
app.get('/api/auth/config', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.CLIENT_ID || '';
  const hasSecret = Boolean(process.env.GITHUB_CLIENT_SECRET || process.env.CLIENT_SECRET);
  const currentRedirectUri = getRedirectUri(req);

  res.json({
    configured: Boolean(clientId && hasSecret),
    hasClientId: Boolean(clientId),
    hasSecret,
    clientId: clientId ? `${clientId.slice(0, 4)}...` : null,
    runtimeUrls: {
      developmentCallback: 'https://ais-dev-bqh3ep774ncse22iyjynnm-231831413221.asia-east1.run.app/auth/callback',
      sharedCallback: 'https://ais-pre-bqh3ep774ncse22iyjynnm-231831413221.asia-east1.run.app/auth/callback',
      detectedCallback: currentRedirectUri
    }
  });
});

// Construct OAuth URL endpoint
app.get('/api/auth/github/url', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.CLIENT_ID;
  const redirectUri = getRedirectUri(req);
  const state = crypto.randomBytes(16).toString('hex');

  if (!clientId) {
    return res.json({
      configured: false,
      url: null,
      error: 'GitHub OAuth is not configured yet. GITHUB_CLIENT_ID environment variable is missing.',
      setupNeeded: true,
      runtimeUrls: {
        developmentCallback: 'https://ais-dev-bqh3ep774ncse22iyjynnm-231831413221.asia-east1.run.app/auth/callback',
        sharedCallback: 'https://ais-pre-bqh3ep774ncse22iyjynnm-231831413221.asia-east1.run.app/auth/callback',
        detectedCallback: redirectUri
      }
    });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
    state,
    allow_signup: 'true'
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

  res.json({ 
    configured: true,
    url: authUrl, 
    state,
    redirectUri 
  });
});

// OAuth Callback Handler
const callbackHandler: express.RequestHandler = async (req, res) => {
  const { code, error, error_description } = req.query;

  if (error) {
    const errorMsg = (error_description as string) || (error as string) || 'GitHub authorization denied';
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Failed</title></head>
        <body style="font-family:system-ui;text-align:center;padding:40px;background:#FFFDF9;color:#881337;">
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: ${JSON.stringify(errorMsg)} }, '*');
              setTimeout(() => window.close(), 1500);
            } else {
              window.location.href = '/';
            }
          </script>
          <h3>Authentication Failed</h3>
          <p>${errorMsg}</p>
          <p>Closing window...</p>
        </body>
      </html>
    `);
  }

  if (!code || typeof code !== 'string') {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Missing Code</title></head>
        <body style="font-family:system-ui;text-align:center;padding:40px;background:#FFFDF9;color:#881337;">
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: 'No authorization code received' }, '*');
              setTimeout(() => window.close(), 1500);
            } else {
              window.location.href = '/';
            }
          </script>
          <h3>Missing Authorization Code</h3>
          <p>Please initiate sign in from the wedding invitation page.</p>
        </body>
      </html>
    `);
  }

  const clientId = process.env.GITHUB_CLIENT_ID || process.env.CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET || process.env.CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Configuration Missing</title></head>
        <body style="font-family:system-ui;text-align:center;padding:40px;background:#FFFDF9;color:#881337;">
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'OAUTH_AUTH_ERROR', 
                error: 'GitHub OAuth Client Secret is not set on the server.' 
              }, '*');
              setTimeout(() => window.close(), 2000);
            } else {
              window.location.href = '/';
            }
          </script>
          <h3>OAuth Configuration Incomplete</h3>
          <p>Please configure GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in app secrets.</p>
        </body>
      </html>
    `);
  }

  try {
    const redirectUri = getRedirectUri(req);

    // Exchange code for token with GitHub
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      const tokenError = tokenData.error_description || tokenData.error;
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head><title>Token Exchange Failed</title></head>
          <body style="font-family:system-ui;text-align:center;padding:40px;background:#FFFDF9;color:#881337;">
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: ${JSON.stringify(tokenError)} }, '*');
                setTimeout(() => window.close(), 2000);
              } else {
                window.location.href = '/';
              }
            </script>
            <h3>GitHub Token Exchange Failed</h3>
            <p>${tokenError}</p>
          </body>
        </html>
      `);
    }

    const accessToken = tokenData.access_token;

    // Fetch user details from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Shiv-Shwati-Wedding-App',
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user profile: ${userResponse.statusText}`);
    }

    const ghUser = await userResponse.json();

    const sessionUser: GitHubUser = {
      id: ghUser.id,
      login: ghUser.login,
      name: ghUser.name || ghUser.login,
      avatar_url: ghUser.avatar_url,
      bio: ghUser.bio || '',
      html_url: ghUser.html_url,
      email: ghUser.email || '',
    };

    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, sessionUser);

    // Set secure cross-origin iframe cookie
    res.cookie('session_token', sessionId, {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      partitioned: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Return postMessage snippet to parent window and close popup
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authentication Successful</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background: #FFFDF9;
              color: #881337;
              text-align: center;
            }
            .card {
              background: white;
              padding: 30px;
              border-radius: 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              border: 2px solid #E2A03F;
              max-width: 320px;
            }
            img {
              width: 70px;
              height: 70px;
              border-radius: 50%;
              border: 3px solid #E2A03F;
              margin-bottom: 12px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${sessionUser.avatar_url}" alt="${sessionUser.login}" />
            <h3 style="margin: 0 0 8px 0;">Welcome, ${sessionUser.name}!</h3>
            <p style="font-size: 14px; color: #555; margin: 0 0 16px 0;">Signed in with GitHub.</p>
            <p style="font-size: 12px; color: #888;">Closing window...</p>
          </div>
          <script>
            try {
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_AUTH_SUCCESS',
                  user: ${JSON.stringify(sessionUser)},
                  sessionToken: ${JSON.stringify(sessionId)}
                }, '*');
                setTimeout(() => window.close(), 600);
              } else {
                window.location.href = '/';
              }
            } catch (err) {
              console.error(err);
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
  } catch (err: any) {
    const errorMsg = err.message || 'An unexpected error occurred during GitHub login';
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Error</title></head>
        <body style="font-family:system-ui;text-align:center;padding:40px;background:#FFFDF9;color:#881337;">
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: ${JSON.stringify(errorMsg)} }, '*');
              setTimeout(() => window.close(), 2000);
            } else {
              window.location.href = '/';
            }
          </script>
          <h3>Login Error</h3>
          <p>${errorMsg}</p>
        </body>
      </html>
    `);
  }
};

app.get('/auth/callback', callbackHandler);
app.get('/auth/callback/', callbackHandler);

// Current user endpoint
app.get('/api/auth/me', (req, res) => {
  const user = getSessionUser(req);
  if (user) {
    return res.json({ authenticated: true, user });
  }
  return res.json({ authenticated: false, user: null });
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  const token = req.cookies?.session_token || 
                (req.headers['authorization']?.replace(/^Bearer\s+/i, '')) ||
                (req.headers['x-session-token'] as string);

  if (token) {
    sessions.delete(token);
  }

  res.clearCookie('session_token', {
    secure: true,
    sameSite: 'none',
    partitioned: true,
  });

  res.json({ success: true });
});

// Guestbook APIs
app.get('/api/guestbook', (req, res) => {
  res.json({ entries: guestBookEntries });
});

app.post('/api/guestbook', (req, res) => {
  const sessionUser = getSessionUser(req);
  const { message, name } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(200).json({ error: 'Message cannot be empty' });
  }

  const entryName = sessionUser ? (sessionUser.name || sessionUser.login) : (name?.trim() || 'Guest');
  
  const newEntry: GuestBookEntry = {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: entryName,
    handle: sessionUser?.login,
    avatarUrl: sessionUser?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    message: message.trim(),
    createdAt: new Date().toISOString(),
    isGitHubVerified: Boolean(sessionUser),
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
