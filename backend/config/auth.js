import crypto from 'crypto';

const SECRET = process.env.JWT_SECRET || 'nidula_photography_secret_key_1359';

export function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
    if (signature !== expectedSignature) return null;

    const decodedBody = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (decodedBody.exp < Date.now()) return null; // Expired

    return decodedBody;
  } catch (err) {
    return null;
  }
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided. Access denied.' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Access denied.' });
  }
  req.user = decoded;
  next();
}
