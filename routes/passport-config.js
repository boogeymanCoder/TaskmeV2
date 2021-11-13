const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const Account = require("../models/account");

function initializePassport(passport) {
  // TODO enable passport
  // FIXME continue passport configuration
  passport.use(
    new LocalStrategy(
      { usernameField: "usernameEmail" },
      async (usernameEmail, password, done) => {
        console.log(
          "Local Strategy received: " + usernameEmail + " " + password
        );
        const account =
          (await Account.findOne({ username: usernameEmail })) ||
          (await Account.findOne({ email: usernameEmail }));
        console.log("Account:", account);
        if (account === null) {
          console.log("Account Not Found");
          return done(null, false);
        } else if (await bcrypt.compare(password, account.password)) {
          console.log("Local Strategy Successful");
          return done(null, account);
        } else {
          console.log("Wrong Password");
          return done(null, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    return done(null, await Account.findById(id));
  });
}

module.exports = initializePassport;
