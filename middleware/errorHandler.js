function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.name === 'ValidationError' ? 400 :
                     err.name === 'NotFoundError' ? 404 : 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
}

module.exports = errorHandler;
