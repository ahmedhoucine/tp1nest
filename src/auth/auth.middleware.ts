import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'] as string;

    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(authHeader, 'your-secret-key') as { userId: string };
      if (!decoded.userId) {
        return res.status(401).json({ message: "Access denied. Invalid token." });
      }
      
      // Inject userId into the request object
      req['userId'] = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Access denied. Invalid token." });
    }
  }
}
