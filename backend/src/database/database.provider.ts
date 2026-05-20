import mongoose from 'mongoose';
import { AppConfig } from '../app.config.provider';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (config: AppConfig) => {
    const mongooseInstance = await mongoose.connect(config.database.url, {
      dbName: 'practicum',
    });

    return mongooseInstance.connection;
  },
  inject: ['CONFIG'],
};
