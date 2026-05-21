const redis = require("redis");

let redisClient = null;

async function connectRedis() {
  try {
    redisClient = redis.createClient({
      url: "redis://127.0.0.1:6379",
      socket: {
        reconnectStrategy: false,
      },
    });

    redisClient.on("error", (err) => {
      console.log("Redis not available");
    });

    await redisClient.connect();

    console.log("Redis Connected");
  } catch (error) {
    console.log("Running without Redis cache");
  }
}

connectRedis();

module.exports = redisClient;