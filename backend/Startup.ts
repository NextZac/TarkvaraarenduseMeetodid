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

    // Serve static Vue files
    this.app.use(express.static(path.join(__dirname, "dist_front")));

    // Serve the Vue app for the form route
    this.app.get("/form/:id", (req, res) => {
      res.sendFile(path.join(__dirname, "dist_front", "index.html"));
    });

    // Register API controller for form-related routes
    // this.app.use("/api/form", (req, res, next) => {
    //   apiController(req, res, next, this.orm);
    // });

    // Define specific route for getting a form by ID
    this.app.get("/api/form/:id", (req, res, next) => {
      return apiController(req, res, next, this.orm);
    });

    // Register controller for form handling
    this.app.post("/api/sendform/:id", (req, res, next) => {
      return formController(req, res, next, this.orm);
    });

    // Register admin routes
    this.app.use("/admin", (req, res, next) => {
      adminController(req, res, next, this.orm);
    });

    // Catch-all route to serve the Vue app for any other route
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
