import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import loginBannar from '../../assets/logInBannar.png';
import ToastifyContainer, { notify } from '../../Hook/notify';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {
    const [isLoginError,setLoginError] = useState("");
    const [ isGoogleset , setgooglelogged] = useState(false);
    const {  googleSignIn ,user, signIn } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
   
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const GoogleRegister = async () => {
        try {
          
          await googleSignIn();
          
          setgooglelogged(true);
        } catch (error) {
          console.error("Google sign-in error:", error);
          
        }
      };

    const {  register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,reset } = useForm();

    const onSubmit = async (data) => {
        const {email , password }  = data;


       try {
        const userLogin = await signIn(email,password);
        console.log(userLogin)
         const navigateBack =  navigate(from, { replace: true });
        if(userLogin?.user){
            notify("You have successfully login your account.", navigateBack);
        }
       } catch (error) {
        if (error.code === 'auth/invalid-credential') {

            setLoginError("You hsvr given wrong Email Or Password. Please Input the right Information. Otherwise Dont have any account. plaese signup first");
            
            }
            else {
            reset();
            setLoginError('');
            console.error("Error creating user:", error);
          }
          console.log(error);
       }
           
       
    };



    return (
       
<div className="py-16">
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
                backgroundImage: `url(${loginBannar})`
              }}>
        </div>
        <ToastifyContainer></ToastifyContainer>
        <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <a href="#" onClick={GoogleRegister} className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                <div className="px-4 py-3">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                        <path
                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                            fill="#FFC107" />
                        <path
                            d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                            fill="#FF3D00" />
                        <path
                            d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                            fill="#4CAF50" />
                        <path
                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                            fill="#1976D2" />
                    </svg>
                </div>
                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
            </a>
            <form  onSubmit={handleSubmit(onSubmit)} >
            <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" className="text-xs text-center text-gray-500 uppercase">or login with email</a>
                <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div>
            {isLoginError ? <div role="alert" className="p-2 bg-slate-300 text-red-600">
  
  <span> {isLoginError}</span>

</div>  : '' }
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input id="email"
        {...register("email", {
          required: "Email addres must be required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        type="email" placeholder="Info@example.com" className="mt-2 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 bg-gray-200 text-gray-700 focus:ring-2 h-12 focus:outline-none focus:shadow-outline w-full rounded-md bg-gray-100 py-2 px-4 block px-3 appearance-none"   />

{errors.email && <div className="bg-red-200 px-4 py-2 mx-2 mt-2 rounded-md text-sm flex items-center mx-auto max-w-lg">
        <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className="text-red-800">{errors.email.message}</span>
    </div> }

            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                </div>
                <input 
                id="password"
                {...register("password", {
                  required: "required",
                  minLength: {
                    value: 5,
                    message: "min length is 5",
                  },
                  
                })}
                type="password" placeholder="enter your password" className="mt-2 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 h-12 w-full rounded-md bg-gray-100 px-3 bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline appearance-none py-2 px-4 block "
               
                />

{errors.password &&<div className="bg-red-200 px-4 py-2 mx-2 mt-2 rounded-md text-sm flex items-center mx-auto max-w-lg">
        <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className="text-red-800">{errors.password.message}</span>
    </div> }


            </div>
            <div className="mt-8">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
            </div>

            </form>
            
            <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <Link to="/signup"  className="text-xs text-gray-500 uppercase">or sign up</Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
    </div>
</div>
    );
};

export default Login;