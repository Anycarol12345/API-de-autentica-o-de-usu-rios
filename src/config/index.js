require('dotenv').config();
module.exports = {
    serve: { port: process.env.PORT || 3000 },
    db: { dialect: process.env.DB_DIALECT || 'postgres', url: process.env.DATABASE_URL || 'postgresql://postgres:passwordd@localhost:5432/node'},
    jwt: { secret: process.env.JWT_SECRET || 'supersecretjwtkey', expiresIn: process.env.JWT_EXPIRES_IN || '1h'},
    redis: { url: process.env.REDIS_URL || 'redis://localhost:6379', password: process.env.REDIS_PASSWORD || null}
}