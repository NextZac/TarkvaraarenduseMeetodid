import express from "express";
import * as path from "path";
import formController from "./Controllers/Form";
import apiController from "./Controllers/Api";
import adminController from "./Controllers/Admin";
import { MikroORM } from "@mikro-orm/sqlite";

export default class Startup {
  app: any;

  constructor() {
    this.app = express();
  }

  // Registers all middleware
  public async setup() {
    this.app.use(express.json());

    // Serve static Vue files
    this.app.use(express.static(path.join(__dirname, "dist_front")));

    // Register controller routes
    this.app.use("/form", formController);
    this.app.use("/api/form", apiController);
    this.app.use("/api/form/:id", apiController);
    this.app.use("/admin", adminController);

    // Catch-all route to serve Vue app
    this.app.get("*", (req: any, res: any) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  // Run the app on port
  public run(port: number) {
    // Start the app on server
    this.app.listen(port, () => {
      console.log("Server Started...");
      console.log(`Listening on port ${port}`);
    });
  }
}
