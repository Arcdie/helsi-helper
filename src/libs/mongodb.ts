import mongoose from 'mongoose';

import config from '../config';

export default function () {
  mongoose.set('strictQuery', false);

  return mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
    config.mongodb.options,
  );
}
