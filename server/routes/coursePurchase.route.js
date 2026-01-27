import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { createOrder, getAllPurchasedCourse, getCourseDetailsWithPurchaseStatus, verifyPayment } from '../controllers/coursePurchase.controller.js'

const router = express.Router();

router.route("/order/create").post(isAuthenticated, createOrder);
router.route("/order/verify").post(isAuthenticated, verifyPayment);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailsWithPurchaseStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;