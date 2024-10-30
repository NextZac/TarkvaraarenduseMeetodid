import { Migration } from '@mikro-orm/migrations';

export class Migration20241023104053 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`form\` (\`id\` integer not null primary key autoincrement, \`form_name\` text not null, \`form_data\` text not null);`);

    this.addSql(`create table \`form_answer\` (\`id\` integer not null primary key autoincrement, \`answer\` json not null, \`form_id\` integer not null, \`updated_at\` datetime not null, constraint \`form_answer_form_id_foreign\` foreign key(\`form_id\`) references \`form\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`form_answer_form_id_index\` on \`form_answer\` (\`form_id\`);`);

    this.addSql(`create table \`student\` (\`id\` integer not null primary key autoincrement, \`full_name\` text not null, \`email\` text not null, \`form_answers_id\` integer not null, constraint \`student_form_answers_id_foreign\` foreign key(\`form_answers_id\`) references \`form_answer\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`student_form_answers_id_index\` on \`student\` (\`form_answers_id\`);`);
  }

}
