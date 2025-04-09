const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const newUser = await User.create({ name, email, password });
      res.status(201).json({
        name: newUser.name,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }

      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async loginWithGoogle(req, res, next) {
    try {
      const {googleToken} = req.body
      console.log(googleToken, '<<< tokengoogle');
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_API,  // Specify the WEB_CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload, '<<< payload');
    const userid = payload['sub'];
    const [user] = await User.findOrCreate({
      where: {
        email: payload.email
      },
      defaults: {
        name: payload.name,
        email: payload.email,
        password: `${Math.random()} + ${Date.now()}`
      }
    })

    let access_token = signToken({
      id: user.id,
    })
    // If the request specified a Google Workspace domain:
    // const domain = payload['hd'];
      res.json({access_token})
    } catch (error) {
      next(error); 
    }
  }
}

module.exports = AuthController;
