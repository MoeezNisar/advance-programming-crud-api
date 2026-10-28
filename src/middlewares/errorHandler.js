// Centralized error handling: saare errors yahin aate hain
module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Galat JSON body bheji gayi
  if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Invalid JSON body';
  }

  if (status === 500) console.error(err);

  res.status(status).json({ success: false, status, message });
};
