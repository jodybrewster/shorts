// src/rateLimit.ts
import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Set up a rate limiter with a maximum of 100 requests per 15 minutes per IP
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 100, // 100 requests
  duration: 15 * 60, // Per 15 minutes
});

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   rateLimiter.consume(req.ip)
//     .then(() => {
//       next();
//     })
//     .catch(() => {
//       res.status(429).send('Too Many Requests');
//     });
next();
};