import React, { useState, useEffect } from "react";
import { courseApiRequests, enrollmentApiRequests } from "../../api";
import { toast } from "react-toastify";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthenticationContext";

const PaymentModal = ({ isOpen, onClose, onConfirm, courseTitle, coursePrice }) => {
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = async () => {
    if (paymentMethod === "credit-card" && (!cardNumber || !expiryDate || !cvv)) {
      toast.error("Please fill in all credit card details.");
      return;
    }

    setProcessing(true);
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    
    // Simulate success (80% chance) or failure (20% chance)
    if (Math.random() < 0.8) {
      onConfirm();
      toast.success("Payment successful!");
    } else {
      toast.error("Payment failed. Please try again.");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
        <h3 className="text-lg font-semibold mb-2">{courseTitle}</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">${coursePrice.toFixed(2)}</p>
        
        <div className="mb-4">
          <p className="font-semibold mb-2">Select Payment Method:</p>
          {["credit-card", "paypal", "bitcoin"].map((method) => (
            <label key={method} className="flex items-center mb-2">
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <span className="capitalize">{method.replace("-", " ")}</span>
            </label>
          ))}
        </div>

        {paymentMethod === "credit-card" && (
          <div className="space-y-4 mb-4">
            <div>
              <label htmlFor="card-number" className="block mb-1">Card Number</label>
              <input
                id="card-number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expiry-date" className="block mb-1">Expiry Date</label>
                <input
                  id="expiry-date"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cvv" className="block mb-1">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={processing}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const userId = isLoggedIn ? user.id : undefined;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApiRequests.getCourses();
        setCourses(response.data);
      } catch (error) {
        toast.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  const handleEnrollClick = (course) => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to enroll in a course");
      navigate("/login");
    } else if (!course._id) {
      toast.error("Invalid course ID");
    } else {
      setSelectedCourse(course);
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentConfirm = async () => {
    try {
      await enrollmentApiRequests.createEnrollment({ userId, courseId: selectedCourse._id });
      toast.success("Course enrollment successful");
      navigate(`/enrollments/${userId}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response ? error.response.data.message : "Error enrolling user");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white bg-orange-500 py-6 shadow-lg">
        AVAILABLE COURSES
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative transform hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute top-0 left-0 bg-blue-900 text-white text-sm px-4 py-1 rounded-br-lg">
                Learners Interest
              </div>

              <div className="h-40 bg-gray-200 flex justify-center items-center">
                <img
                  src={logo}
                  alt="Course logo"
                  className="h-full w-full object-cover rounded-t-lg"
                />
              </div>

              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-lg font-bold text-green-600 mb-4">${20}</p>

                <button
                  className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 shadow-md"
                  onClick={() => handleEnrollClick(course)}
                >
                  Enroll
                </button>

                <a
                  href="#"
                  className="text-blue-500 text-sm mt-2 inline-block hover:underline"
                >
                  Learn more »
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No courses available at the moment.
          </p>
        )}
      </div>

      {selectedCourse && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onConfirm={handlePaymentConfirm}
          courseTitle={selectedCourse.title}
          coursePrice={20}
        />
      )}
    </div>
  );
};

export default Course;
