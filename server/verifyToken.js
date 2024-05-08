const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    // Extract the token by splitting the header string using a space character
    idToken = req.headers.authorization.split(' ')[1];
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user information to the request object
    console.log(decodedToken);
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = verifyToken;