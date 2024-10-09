import { Options, SqliteDriver } from "@mikro-orm/sqlite";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const config: Options = {
  // for simplicity, we use the SQLite database, as it's available pretty much everywhere
  driver: SqliteDriver,
  dbName: "sqlite.db",
  // folder-based discovery setup, using common filename suffix
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["**/*.entity.ts"],
  // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
  // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
  seeder: {
    path: "./seeders", // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: "FormSeeder", // default seeder class name
    glob: "!(*.d).{js,ts}", // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: "ts", // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default config;
