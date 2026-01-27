import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { User } from "../models/user.model.js";
import {Lecture} from "../models/lecture.model.js"

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    console.log("BODY :: ", req.body);
    console.log("COURSE ID: ", courseId);

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const alreadyPurchased = await CoursePurchase.findOne({
      courseId,
      userId,
      status: "completed",
    });

    if (alreadyPurchased) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    const options = {
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: `course_${courseId}`,
    };

    const order = await razorpay.orders.create(options);

    const purchase = await CoursePurchase.create({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      razorpayOrderId: order.id,
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("RAZORPAY ERROR: ",error);
    console.error(error);
    res.status(500).json({
      message: "Order creation failed",
      error:error.message
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
      console.log("ORDER_ID: ",razorpay_order_id);
      console.log("PAYMENT_ID: ",razorpay_payment_id);
      console.log("SIGNATURE: ",razorpay_signature);
      
    const purchase = await CoursePurchase.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found",
      });
    }

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    purchase.status = "completed";
    purchase.razorpayPaymentId = razorpay_payment_id;

    // if(purchase.courseId && purchase.courseId.lectures.length>0){
    //     await Lecture.updateMany(
    //         {_id: {$in: purchase.courseId.lectures}},
    //         {$set: {isPreviewFree: true}}
    //     );
    // }
    await purchase.save();

    await Course.findByIdAndUpdate(purchase.courseId, {
      $addToSet: { enrolledStudents: purchase.userId },
    });

    await User.findByIdAndUpdate(purchase.userId, {
       $addToSet: { enrolledCourses: purchase.courseId._id} 
    });

    return res.status(200).json({
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Verification failed",
    });
  }
};

export const getCourseDetailsWithPurchaseStatus =  async (req,res) => {
    try {
        const {courseId} = req.params;
        const userId = req.id;

        const course = await Course.findById(courseId).populate({path:"creator"}).populate({path:"lectures"});
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        const purchased = await CoursePurchase.findOne({userId, courseId, status:"completed"});


        return res.status(200).json({
            course,
            purchased: purchased ? true : false
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllPurchasedCourse = async (__,res) => {
    try {
        const purchasedCourse = await CoursePurchase.find({status:"completed"}).populate("courseId");
        if(!purchasedCourse){
            return res.status(404).json({
                purchasedCourse:[]
            })
        }
        return res.status(200).json({
            purchasedCourse
        })
    } catch (error) {
        console.log(error);
        
    }
}