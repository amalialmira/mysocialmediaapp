require('dotenv').config()
const Redis = require("ioredis");

const redis = new Redis({
    port: 16102, // Redis port
    host: "redis-16102.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com", // Redis host
    username: "default", // needs Redis >= 6
    password: process.env.REDIS_PWD,
    db: 0, // Defaults to 0
  });

module.exports = redis