import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Form {
  @PrimaryKey()
  id!: number;

  @Property()
  FormName!: string;

  @Property()
  form_data!: JSON;
}
