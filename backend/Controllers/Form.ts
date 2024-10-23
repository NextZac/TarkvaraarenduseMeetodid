import { Request, Response, NextFunction } from "express";
import { MikroORM } from "@mikro-orm/core";
import { Form } from "../Models/Form.entity"; // Adjust the path to your Form entity
import { FormAnswer } from "../Models/FormAnswer.entity"; // Adjust the path to your FormAnswer entity

// Define the type for the answers array
interface Answer {
  question?: string;
  answer?: string;
  textField?: string;
}

export default async function formController(
  req: Request,
  res: Response,
  next: NextFunction,
  orm: MikroORM,
) {
  try {
    const em = orm.em.fork(); // Get an EntityManager
    const formId = Number(req.params.id); // Get form ID from route params
    const submittedData: Answer[] = req.body; // Assume form answers are in the request body

    // Fetch the form by its ID
    const form = await em.findOne(Form, { id: formId });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Create an array to hold all answers
    const answers: Answer[] = []; // Specify the type for answers

    // Iterate through submitted data to extract answers and the textField
    for (const item of submittedData) {
      if (item.question && item.answer) {
        answers.push({
          question: item.question,
          answer: item.answer,
        });
      } else if (item.textField) {
        // Add the textField if it exists in the submitted data
        answers.push({ textField: item.textField });
      }
    }

    // Create a new FormAnswer instance
    const formAnswer = new FormAnswer();
    formAnswer.answer = answers; // Assuming your FormAnswer has a JSON property to store answers
    formAnswer.form = form; // Associate with the form

    // Persist the form answer
    em.persist(formAnswer);

    // Flush all changes to the database
    await em.flush();

    // Return a success message
    res.json({
      message: "Form submitted successfully",
    });
  } catch (error) {
    next(error);
  }
}
