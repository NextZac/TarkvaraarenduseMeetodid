import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/core";
import { Form } from "../Models/Form.entity";
import { FormAnswer } from "../Models/FormAnswer.entity";
import { Student } from "../Models/Student.entity";

export class FormSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Create a Form
    const form = em.create(Form, {
      FormName: "Form 1",
      form_data: {
        questions: [
          { question: "Why do birds fly?" },
          { question: "Why are you here?" },
        ],
      },
    });

    // Create a FormAnswer
    const formAnswer = em.create(FormAnswer, {
      answer: "Dont know",
      form: form,
      updatedAt: new Date(),
    });

    // Create a Student
    const student = em.create(Student, {
      fullName: "Marten Haamer",
      email: "marten.haamer@gmail.com",
      formAnswers: formAnswer,
    });

    // Persist the entities
    em.persist([form, formAnswer, student]);

    // Flush the changes (insert into the database)
    await em.flush();
  }
}
