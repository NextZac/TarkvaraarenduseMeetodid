import { Request, Response, NextFunction } from "express";
import { MikroORM } from "@mikro-orm/core";
import { Form } from "../Models/Form.entity"; // Assuming you have a Form entity defined

export default async function apiController(
  req: Request,
  res: Response,
  next: NextFunction,
  orm: MikroORM,
) {
  console.log("Received request for form with ID:", req.params.id); // Log the ID received
  console.log("Request Params:", req.params); // Log request parameters
  console.log("Request Path:", req.path); // Log the request path
  try {
    const em = orm.em.fork(); // Get an EntityManager
    const formId = Number(req.params.id); // Convert the ID to a number

    // Debug log for form ID
    console.log("Form ID after conversion:", formId); // Log after conversion

    // Fetch the form by its ID
    const form = await em.findOne(Form, { id: formId });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Parse the form_data JSON field
    const formData = JSON.parse(form.form_data);

    res.json({
      message: "Form retrieved successfully",
      form_name: form.FormName,
      questions: formData.questions,
    });
  } catch (error) {
    next(error);
  }
}
