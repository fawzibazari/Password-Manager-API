import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { secret } from '../services/auth';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

export default new Strategy(opts, async (payload, done) => {
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findByIds(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
