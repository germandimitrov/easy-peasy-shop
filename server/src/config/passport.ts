import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../entity/User';
import encrypt from '../config/encryption';

module.exports = () => {
  passport.use(new LocalStrategy((email, password, done) => {
      User.findOne({ email: email }).then(user => {
          if (!user) return done(null, false);
          if (! (encrypt.generateHashedPassword(user.salt, password) === user.password) ) return done(null, false);
          return done(null, user);
      });
  }));

  passport.serializeUser((user: User, done) => {
      if (user) return done(null, user.id);
  });

  passport.deserializeUser((id :any, done) => {
    User.findOne(id).then(user => {
          if (!user) return done(null, false);
          return done(null, user);
      });
  });
};