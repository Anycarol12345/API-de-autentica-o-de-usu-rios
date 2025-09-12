const Redis = require('ioredis');

class RedisTokenBlacklistRepository {
    constructor() {
        this.redis = new Redis(); // configurações padrão (localhost:6379)
    }

    async add(token, exp) {
        // exp = timestamp de expiração do token (em segundos)
        // O token será removido automaticamente após expirar
        const ttl = exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) {
            await this.redis.set(token, 'blacklisted', 'EX', ttl);
        }
    }

    async isBlacklisted(token) {
        const result = await this.redis.get(token);
        return result === 'blacklisted';
    }
}

module.exports = RedisTokenBlacklistRepository;