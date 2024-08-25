import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx"; 

// CustomAlert Component
// eslint-disable-next-line react/prop-types
const CustomAlert = ({ message, onClose, type = "success" }) => {
    const alertStyles = {
        success: "bg-green-100 text-green-800 border-green-500",
        error: "bg-red-100 text-red-800 border-red-500",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-500",
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className={`p-6 rounded-lg shadow-lg w-80 text-center border-2 ${alertStyles[type]}`}>
          <p className="text-lg font-semibold">{message}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    );
};

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneno: "",
        password: "",
        conPassword: "",
    });

    const [error, setError] = useState(""); 
    const [alertMessage, setAlertMessage] = useState(""); 
    const [showAlert, setShowAlert] = useState(false); 

    const { signup } = useAuth(); 

    const inputOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.conPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(""); 
        try {
            await signup(formData.email, formData.password, formData.name);
            setAlertMessage("Sign Up Successful! Please proceed to sign in.");
            setShowAlert(true); 
        } catch (err) {
            setError("Sign up failed. Please try again.");
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false); 
        navigate("/signin"); 
    };

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-slate-900">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full px-8 py-10 bg-slate-800 border border-gray-700 rounded-lg shadow-lg"
            >
                <h2 className="text-white text-4xl text-center font-bold mb-6">Sign Up</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>} 

                <div className="mb-4">
                    <label className="block text-white text-lg mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={inputOnChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white text-lg mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={inputOnChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white text-lg mb-2" htmlFor="phoneno">
                        Phone Number
                    </label>
                    <input
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
                        type="tel"
                        name="phoneno"
                        placeholder="Enter your phone number"
                        value={formData.phoneno}
                        onChange={inputOnChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white text-lg mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={inputOnChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-white text-lg mb-2" htmlFor="conPassword">
                        Confirm Password
                    </label>
                    <input
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
                        type="password"
                        name="conPassword"
                        placeholder="Confirm your password"
                        value={formData.conPassword}
                        onChange={inputOnChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                >
                    Sign Up
                </button>
            </form>

            {showAlert && (
                <CustomAlert message={alertMessage} onClose={handleAlertClose} />
            )}
        </section>
    );
};

export default Signup;
