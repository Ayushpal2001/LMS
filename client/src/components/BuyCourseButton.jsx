import React from "react";
import { Button } from "./ui/button";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "@/features/api/purchaseApi";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  // Razorpay SDK loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      const res = await createOrder(courseId).unwrap();
      const { orderId, amount, currency, key } = res;

      const options = {
        key,
        amount,
        currency,
        name: "LMS course purchase",
        description: "Buy Course",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verification = await verifyPayment(response).unwrap();
            // console.log("Payment Success: ", response);
            toast.success("Payment Successful! Course enrolled.");
            // redirect to course progress page
            window.location.href = `/course-progress/${courseId}`;
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error(error?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#6366f1",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error: ", error);
      toast.error("Payment failed");
    }
  };

  return (
    <Button onClick={handlePayment} disabled={isLoading} className="w-full">
      {isLoading ? "Processing..." : "Buy Course"}
    </Button>
  );
};

export default BuyCourseButton;
