

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5001,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://essene60:mommydear@marketplace.ki0qdyk.mongodb.net/marketplace"||
    process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' +
   (process.env.MONGO_PORT || '27017') +
    '/Marketplace'
    }

    export default config
