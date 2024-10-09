import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Form } from "./Form.entity";
@Entity()
export class FormAnswer {
  @PrimaryKey()
  id!: number;

  @Property()
  answer!: string;

  @OneToOne()
  form!: Form;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
