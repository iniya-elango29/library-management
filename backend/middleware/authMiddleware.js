const requireAuth = (req, res, next) => {
  if (!req.session.user) return res.redirect('/');
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Forbidden: Admins Only');
  }
  next();
};

module.exports = {
  requireAuth,
  requireAdmin
};
