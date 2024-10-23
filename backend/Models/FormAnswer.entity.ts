import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Form } from "./Form.entity";
@Entity()
export class FormAnswer {
  @PrimaryKey()
  id!: number;

  @Property({ type: "json" })
  answer!: object;

  @ManyToOne()
  form!: Form;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
