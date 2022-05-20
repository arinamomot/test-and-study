const router = require("express").Router();
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const roleMiddleware = require("../middlewares/role-middleware");

// Auth
router.post(
  "/registration",
  body("email").isEmail(),
  body("email", "Email is required and cannot be empty.").notEmpty(),
  body("password", "Password must be at least 8 characters.").isLength({
    min: 8,
    max: 32,
  }),
  body("firstName", "First name must be greater than 1").isLength({ min: 2 }),
  body("lastName", "Last name must be greater than 1").isLength({ min: 2 }),
  userController.registration
);

router.post(
  "/login",
  body("email").isEmail(),
  body("email").notEmpty(),
  body("password").notEmpty(),
  userController.login
);

router.post("/logout", authMiddleware, userController.logout);

// Token
router.get("/refresh", userController.refresh);

// User
router.put(
  "/updateAccount",
  body("email").isEmail(),
  body("email", "Email is required and cannot be empty.").notEmpty(),
  body("firstName", "First name must be greater than 1").isLength({ min: 2 }),
  body("lastName", "Last name must be greater than 1").isLength({ min: 2 }),
  authMiddleware,
  userController.updateAccount
); //update user

router.get("/account", authMiddleware, userController.getAccountInfo);
router.get("/currentUser", authMiddleware, userController.getCurrentUser);

router.delete("/deleteAccount", authMiddleware, userController.deleteAccount);

//Users
router.get("/users", userController.getUsers);

module.exports = router;
