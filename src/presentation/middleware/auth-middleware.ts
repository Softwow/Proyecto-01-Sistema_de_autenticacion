import { Request, Response, NextFunction } from "express";
import { error } from "console";
import { jwtAdapter } from "../../config/jwt.adapter";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserModel } from "../../data/mongo/models/user-model";
/**
 * Middleware for validating JWT token in the request header.
 */
/**
 * Middleware for validating JWT token in the request header.
 */
export class AuthMiddlewere {
  /**
   * Validates the JWT token in the request header.
   * @param req The Express request object.
   * @param res The Express response object.
   * @param next The next middleware function.
   */
  static async validateJwtToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(404).json({
        error: "No token provided",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(500).json({
        error: "Invalid token",
      });
    }

    const token = authHeader.split(" ").at(1) || "";

    try {
      const payload = await jwtAdapter.validationToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await UserModel.findById(payload.id);
      if (!user)
        return res.status(401).json({ error: "Invalid token of user" });
      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (err) {
      return res.status(500).json({
        msg: "Invalid token",
        error,
      });
    }
  }
}
