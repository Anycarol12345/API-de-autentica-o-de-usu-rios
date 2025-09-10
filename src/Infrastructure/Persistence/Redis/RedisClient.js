const { createCliente } = require('redis');
const config = require('src/config');

const redisClient = createCliente({
    url: config.redis.url,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRidis() {
    if(!redisClient.isReady){
        await redisClient.connect();
        console.log('Connected to Redis');
    }
}

module.exports = { redisClient, connectRidis };