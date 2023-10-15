const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");

// student account create

router.post("/create",studentsController.create);
// student login
router.post("/login",studentsController.login);
// student profile read
router.get("/profile-read",authVerifyMiddleware,studentsController.profileRead);
// student profile update
router.post("/profile-update",authVerifyMiddleware,studentsController.profileUpdate);
//profile delete
router.delete("/profile-delete",authVerifyMiddleware,studentsController.profileDelete);
router.post("/recovery-email-verify/:email",studentsController.recoveryVerifyEmail);
router.post("/recovery-verify-otp/:email/:otp",studentsController.recoveryVerifyOtp);
router.post("/recovery-reset-password",studentsController.recoveryResetPassword)
// works controller api
const worksController = require("../controllers/worksController")
router.post("/work-create",authVerifyMiddleware,worksController.workCreate);
router.get("/work-reads",authVerifyMiddleware,worksController.workRead)
router.post("/work-update",authVerifyMiddleware,worksController.workUpdate)
router.delete("/work-delete",authVerifyMiddleware,worksController.workDelete)


module.exports = router