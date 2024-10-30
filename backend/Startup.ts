import express from "express";
import * as path from "path";
import formController from "./Controllers/Form";
import apiController from "./Controllers/Api";
import adminController from "./Controllers/Admin";
import { MikroORM } from "@mikro-orm/sqlite";
import ormConfig from "./mikro-orm.config";

export default class Startup {
  app: express.Application; // Use explicit type for Express app
  orm: any;

  constructor() {
    this.app = express();
  }

  // Registers all middleware
  public async setup() {
    this.app.use(express.json());
    this.orm = await MikroORM.init(ormConfig);

    // Serve static Vue files from dist_front directory
    this.app.use(express.static(path.join(__dirname, "dist_front")));

    // Serve the Vue app for non-API routes explicitly
    this.app.get(["/form/:id", "/answers"], (req, res) => {
      res.sendFile(path.join(__dirname, "dist_front", "index.html"));
    });

    // API Routes
    this.app.get("/api/form/:id", (req, res, next) => {
      return apiController(req, res, next, this.orm);
    });

    this.app.post("/api/sendform/:id", (req, res, next) => {
      return formController(req, res, next, this.orm);
    });

    this.app.get("/api/answers", (req, res, next) => {
      return adminController(req, res, next, this.orm);
    });

    // Catch-all for Vue app for any non-API route
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist_front", "index.html"));
    });
  }

  // Run the app on port
  public run(port: number) {
    this.app.listen(port, () => {
      console.log("Server Started...");
      console.log(`Listening on port ${port}`);
    });
  }
}
