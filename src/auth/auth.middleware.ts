import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'] as string;

    if (!authHeader) {
      console.log("No token provided");
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      // Decode and verify the token
      const decoded = jwt.decode(authHeader) as { id: string };  // Use `id` instead of `userId`
      
      if (!decoded.id) {
        return res.status(401).json({ message: "Access denied. Invalid token." });
      }

      // Inject userId into the request object
      req['userId'] = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Access denied. Invalid token." });
    }
  }
}
