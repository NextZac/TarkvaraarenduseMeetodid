import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class FormAnswer {
  @PrimaryKey()
  id!: number;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
