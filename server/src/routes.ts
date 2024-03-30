// src/routes.ts
import { Express, Request, Response } from "express";
import { rateLimiterMiddleware } from "./rateLimit"; // Assuming you've set this up
import {
  createShortUrl,
  redirectToUrl,
  updateUrl,
  deleteUrl,
  getShorts,
} from "./controllers/urlController"; // Placeholder for your controller functions

export const registerRoutes = (app: Express) => {

  app.get('/404',  (req: Request, res: Response) => {
    res.send( "<html><head><head><body><h1>404</h1><p>url doesn't exist</p></body></html>")
  }
);
  // Create a shortened URL
  app.post(
    "/api/v1/shorts",
    rateLimiterMiddleware,
    (req: Request, res: Response) => {
      createShortUrl(req, res);
    }
  );

  // Update an existing shortened URL
  app.get(
    "/api/v1/shorts",
    rateLimiterMiddleware,
    (req: Request, res: Response) => {
      getShorts(req, res);
    }
  );

  // Redirect to the original URL using a shortcode
  app.get("/a/:shortcode", (req: Request, res: Response) => {
    redirectToUrl(req, res);
  });

  // Update an existing shortened URL
  app.patch(
    "/api/v1/shorts/:shortcode",
    rateLimiterMiddleware,
    (req: Request, res: Response) => {
      updateUrl(req, res);
    }
  );

  // Delete a shortened URL
  app.delete(
    "/api/v1/shorts/:shortcode",
    rateLimiterMiddleware,
    (req: Request, res: Response) => {
      console.log('deleteUrl')
      deleteUrl(req, res);
    }
  );
};
