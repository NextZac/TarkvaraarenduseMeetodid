import * as express from "express";

const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     var biz = new messageBiz();
//     var messages = await biz.getAllMessages();
//     res.json(messages);
//   } catch (err) {
//     res.send("Error " + err);
//   }
// });

router.get("/", async (req, res) => {
  try {
    res.json("hello");
  } catch (err) {
    res.send("Error " + err);
  }
});

export default router;
