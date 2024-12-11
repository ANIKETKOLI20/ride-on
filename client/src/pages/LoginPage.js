import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password)
      return toast.error("Please fill in all fields");
    try {
      await login({ variables: { input: loginData } });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
        <div className='w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
          <div className='max-w-md w-full p-6'>
            <h1 className='text-3xl font-semibold mb-6 text-black text-center'>Login</h1>
            <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
              Welcome back! Log in to your account
            </h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
              {/* Username Input Field with Icon */}
              <InputField
                label='Username'
                id='username'
                name='username'
                value={loginData.username}
                onChange={handleChange}
                icon='fa-user' // User icon for Username
              />

              {/* Password Input Field with Show/Hide Icon */}
              <InputField
                label='Password'
                id='password'
                name='password'
                type={showPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                value={loginData.password}
                onChange={handleChange}
                icon={showPassword ? 'fa-eye-slash' : 'fa-eye'} // Toggle between eye and eye-slash icon
                onIconClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                showHidePassword // Enable show/hide functionality
              />
              <div>
                <button
                  type='submit'
                  className='w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
            <div className='mt-4 text-sm text-gray-600 text-center'>
              <p>
                {"Don't"} have an account?{" "}
                <Link to='/signup' className='text-black hover:underline'>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
