import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { FormAnswer } from "./FormAnswer.entity";

@Entity()
export class Student {
  @PrimaryKey()
  id!: number;

  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @ManyToOne()
  formAnswers!: FormAnswer;
}
