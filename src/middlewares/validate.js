const AppError = require('../utils/AppError');

// Required fields check karta hai, missing ho to 400 throw karta hai
const requireFields = (...fields) => (req, res, next) => {
  const body = req.body || {};
  const missing = fields.filter((f) => {
    const v = body[f];
    return v === undefined || v === null || String(v).trim() === '';
  });

  if (missing.length > 0) {
    return next(new AppError(`Missing required field(s): ${missing.join(', ')}`, 400));
  }
  next();
};

module.exports = { requireFields };
