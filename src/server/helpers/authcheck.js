module.exports = (req, res, next) => {
  if (req.session.passport.user) {
    return next();
  } else {
    return res.json({
      status: 'error',
      message: 'You must be logged in to perform this action.'
    });
  }
};
