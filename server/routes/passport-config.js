const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const Account = require("../models/account");

function initializePassport(passport) {
  // TODO enable passport
  // FIXME continue passport configuration
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log("Local Strategy received: " + username + " " + password);
      const account = await Account.findOne({ username: username });
      console.log("Account:", account);
      if (account === null) {
        console.log("Account Not Found");
        return done(null, false, { message: "Invalid Email or Username" });
      } else if (await bcrypt.compare(password, account.password)) {
        console.log("Local Strategy Successful");
        return done(null, account);
      } else {
        console.log("Wrong Password");
        return done(null, false, { message: "Invalid Password" });
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    Account.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = initializePassport;
