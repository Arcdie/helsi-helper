const config = {
  app: {
    host: 'localhost',
    name: 'helsi-helper',
    url: process.env.APP_URL,
    environment: process.env.NODE_ENV,
    port: Number(process.env.APP_PORT),
    websocketPort: Number(process.env.APP_PORT) + 100,
  },

  mongodb: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    options: {
      connectTimeoutMS: 30000,
    },
  },

  helsi: {
    login: String(process.env.HELSI_LOGIN),
    password: String(process.env.HELSI_PASSWORD),
  }
};

export default config;
