import express from "express";
import * as path from "path";
import formController from "./Controllers/Form";
import apiController from "./Controllers/Api";
import adminController from "./Controllers/Admin";
import { MikroORM } from "@mikro-orm/sqlite";
import ormConfig from "./mikro-orm.config";

export default class Startup {
  app: any;
  orm: any;

  constructor() {
    this.app = express();
  }

  // Registers all middleware
  public async setup() {
    this.app.use(express.json());
    this.orm = await MikroORM.init(ormConfig);

    // Serve static Vue files
    this.app.use(express.static(path.join(__dirname, "dist_front")));

    // Register controller routes
    this.app.use("/form", (req, res, next) =>
      formController(req, res, next, this.orm),
    );
    this.app.use("/api/form", (req, res, next) =>
      apiController(req, res, next, this.orm),
    );
    this.app.use("/api/form/:id", (req, res, next) =>
      apiController(req, res, next, this.orm),
    );
    this.app.use("/admin", (req, res, next) =>
      adminController(req, res, next, this.orm),
    );

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
