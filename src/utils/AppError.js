// Custom error: message ke saath HTTP status code bhi carry karta hai
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
