const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secretKey="iamnowmernstackdeveloper"

router.post(
  "/createuser",
  [
    body("email", "Incorrect Email Syntax").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword= await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        location: req.body.location,
        email: req.body.email,
      });
      res.json({ success: true });
    } catch {
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Incorrect Email Syntax").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
        const { email, password } = req.body;
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res.status(400).json({ errors: "Login with vaild email-id" });
      }

      const pwdCompare= await bcrypt.compare(req.body.password,userdata.password)
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }
      const data={
        user:{
            id:userdata.id
        }
      }
const authToken=jwt.sign(data,secretKey)


      return res.json({ success: true, authToken:authToken });
    } catch {
      res.json({ success: false });
    }
  }
);

module.exports = router;
