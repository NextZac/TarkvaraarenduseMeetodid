import { Form } from "../Models/Form";
import Startup from "./Startup";
var CONFIG = require("../../config.json");

export default class messageBiz {
  public async getAllMessages() {
    var messages = await messageModel.find();
    return messages;
  }

  public async getMessage(id: String) {
    var message = await messageModel.findById(id);
    return message;
  }

  public async insertMessage(message: String) {
    const messageDB = new messageModel({
      message: message,
      postDate: Date.now().toString(),
    });
    var response = await messageDB.save();
    return response;
  }
}
