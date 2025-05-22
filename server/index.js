app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  // Don't expose error details in production
  const isProd = process.env.NODE_ENV === 'production';
  
  res.status(err.status || 500).json({
    error: {
      message: isProd ? 'Internal Server Error' : err.message,
      ...(isProd ? {} : { stack: err.stack })
    }
  });
}); 