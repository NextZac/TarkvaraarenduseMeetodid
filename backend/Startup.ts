import express from "express";
import * as path from "path";
import formController from "./Controllers/Form";

export default class Startup {
  app: any;

  constructor() {
    this.app = express();
  }

  // Registers all middleware
  public setup() {
    this.app.use(express.json());

    // Serve static Vue files
    this.app.use(express.static(path.join(__dirname, "dist")));

    // Register controller routes
    this.app.use("/form", formController);

    // Catch-all route to serve Vue app
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  // Run the app on port
  public run(port) {
    // Start the app on server
    this.app.listen(port, () => {
      console.log("Server Started...");
    });
  }
}
