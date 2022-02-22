// Importing require frameworks/libraries
import passport from "passport-jwt";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Constants
dotenv.config();
const jwtStrat = passport.Strategy;
const extractJwt = passport.ExtractJwt;
const keys = process.env;
const User = mongoose.model("Buyer");
const opts = {};

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

export default (pass) => {
  pass.use(
    new jwtStrat(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
