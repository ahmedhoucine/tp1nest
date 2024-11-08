import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddlewarepost implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'] as string;

    if (!authHeader) {
      console.log("No token provided");
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      // Log the token being verified
      console.log("Token received:", authHeader);

      const decoded = jwt.decode(authHeader) as { id: string };  // Use `id` instead of `userId`

      // Log the decoded token content
      console.log("Decoded token:", decoded);

      if (!decoded || !decoded.id) {  // Check for `id` instead of `userId`
        console.log("No id in decoded token");
        return res.status(401).json({ message: "Access denied. Invalid token." });
      }

      req['userId'] = decoded.id;  // Set `id` as `userId` in the request object
      next();  // Proceed to the next middleware or route handler

    } catch (error) {
      console.log("Token verification error:", error.message);
      return res.status(401).json({ message: "Access denied. Invalid token." });
    }
  }
}
