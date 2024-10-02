import { Request, Response, NextFunction } from "express";
import { MikroORM } from "@mikro-orm/core";

export default async function adminController(
  req: Request,
  res: Response,
  next: NextFunction,
  orm: MikroORM,
) {
  try {
    const em = orm.em.fork(); // Get an EntityManager
    // Example usage of ORM to fetch data

    res.json({ message: "API controller is working", data: [] });
  } catch (error) {
    next(error);
  }
}
