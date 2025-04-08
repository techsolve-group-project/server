class RootController {
  static async hello(req, res) {
    res.status(200).json({ message: "Hello, World!" });
  }
}

module.exports = RootController;
