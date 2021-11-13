function authCheck(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("info", "Please login account");
  res.redirect("/login");
}

function nonAuthCheck(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = {
  authCheck: authCheck,
  nonAuthCheck: nonAuthCheck,
};
