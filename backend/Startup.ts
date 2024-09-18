import * as express from "express";
import formController from "./Controllers/Form";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export default class Startup {
  app: any;

  constructor() {
    this.app = express();
  }

  //Registers all middleware
  public setup() {
    this.app.use(express.json());
    //register controller routes
    this.app.use("/form", messageController);
  }

  public async openDb() {
    return open({
      filename: "/tmp/database.db",
      driver: sqlite3.Database,
    });
  }

  //run the app on port
  public run(port) {
    //starting app on server
    this.app.listen(port, () => {
      console.log("Server Started...");
    });
  }
}
