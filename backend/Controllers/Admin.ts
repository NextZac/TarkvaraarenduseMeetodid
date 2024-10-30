import { Request, Response, NextFunction } from "express";
import { MikroORM } from "@mikro-orm/core";
import { FormAnswer } from "../Models/FormAnswer.entity"; // Adjust the path to your entities

export default async function adminController(
  req: Request,
  res: Response,
  next: NextFunction,
  orm: MikroORM,
) {
  try {
    console.log("Fetching answers...");
    const em = orm.em.fork(); // Get a forked EntityManager for a new transaction

    // Fetch all answers
    const answers = await em.find(FormAnswer, {}); // Fetches all entries in the Answer table

    // Format and send the JSON response
    res.json(
      answers.map((answer) => ({
        question: answer.form,
        answer: answer.answer,
      })),
    );
  } catch (error) {
    next(error);
  }
}
