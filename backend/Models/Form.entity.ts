import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Form {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  FormName!: string;

  @Property()
  form_data!: string;
}
