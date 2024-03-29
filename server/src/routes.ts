// src/routes.ts
import { Express, Request, Response } from 'express';
import { rateLimiterMiddleware } from './rateLimit'; // Assuming you've set this up
import { createShortUrl, redirectToUrl, updateUrl, deleteUrl, getShorts } from './controllers/urlController'; // Placeholder for your controller functions

export const registerRoutes = (app: Express) => {
  // Create a shortened URL
  app.post('/api/v1/create', rateLimiterMiddleware, (req: Request, res: Response) => {
    createShortUrl(req, res);
  });

   // Update an existing shortened URL
   app.get('/api/v1/shorts', rateLimiterMiddleware, (req: Request, res: Response) => {
    console.log('/api/v1/shorts');

    getShorts(req, res);
  });


  // Redirect to the original URL using a shortcode
  app.get('/a/:shortcode', (req: Request, res: Response) => {
    redirectToUrl(req, res);
  });

  // Update an existing shortened URL
  app.patch('/api/v1/:shortcode', rateLimiterMiddleware, (req: Request, res: Response) => {
    updateUrl(req, res);
  });

  

  // Delete a shortened URL
  app.delete('/api/v1/:shortcode', rateLimiterMiddleware, (req: Request, res: Response) => {
    deleteUrl(req, res);
  });
};