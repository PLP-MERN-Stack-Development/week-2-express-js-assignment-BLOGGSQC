const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'your_secret_key') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }
};

module.exports = authenticate;