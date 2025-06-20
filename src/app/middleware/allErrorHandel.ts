import { ErrorRequestHandler } from 'express';

const allErrorHandel: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: err.name,
        errors: err.errors
      }
    });
    return; 
  }

  res.status(500).json({
    message: 'Internal Server Error',
    success: false,
    error: {
      name: err.name || 'Error',
      message: err.message || 'Something went wrong'
    }
  });
  return; 
};

export default allErrorHandel;
