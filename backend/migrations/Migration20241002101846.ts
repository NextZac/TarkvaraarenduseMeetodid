import { Migration } from '@mikro-orm/migrations';

export class Migration20241002101846 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`form\` (\`id\` integer not null primary key autoincrement, \`form_name\` text not null, \`form_data\` json not null);`);

    this.addSql(`create table \`form_answer\` (\`id\` integer not null primary key autoincrement, \`updated_at\` datetime not null);`);

    this.addSql(`create table \`student\` (\`id\` integer not null primary key autoincrement, \`full_name\` text not null, \`email\` text not null, \`form_answers_id\` integer not null, constraint \`student_form_answers_id_foreign\` foreign key(\`form_answers_id\`) references \`form_answer\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`student_form_answers_id_index\` on \`student\` (\`form_answers_id\`);`);
  }

}
