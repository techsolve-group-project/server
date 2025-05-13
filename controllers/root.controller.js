class RootController {
  static async hello(req, res) {
    res
      .status(200)
      .json({
        message: "Welcome to TechSolve API",
        team: ["Kosala", "Moses", "Hafizh"],
        createdAt: "Apr 10, 2025",
      });
  }
}

module.exports = RootController;
