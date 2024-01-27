import React, { useEffect, useState  , useContext} from 'react';
import { useForm} from "react-hook-form";

import { Link, useNavigate, useRouteError } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ToastifyContainer, { notify } from '../../Hook/notify';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import 'firebase/analytics'; 



const Registation = () => {
  
  const [isSignupError,setSignUpError] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const navigate = useNavigate();
  
  const [isGoogleset,setgooglelogged] = useState(false);
  const { user, createUser, updateUserProfile , googleSignIn  } = useContext(AuthContext);
  
const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm();

    

  const GoogleRegister = async () => {
    try {
     
      await googleSignIn();
      setgooglelogged(true);

      if(isGoogleset == true){
        notify("Congratulations You Successfully created Your Account", navigate)
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
 
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

      const onSubmit = async (data) => {
       
        const password = data.confirmpassword;
        const gender = data.gender;
        const email = data.email;
        const phone = data.phone;
        const firstname = data.firstname;
        const lastname = data.lastname;
        const name = firstname + " " + lastname;


        const fileInput = document.querySelector('input[type="file"]');
        const imageFile = fileInput.files[0];

        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('https://chain-teck-project-server.vercel.app/Imgupload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(imgURL);

                    createUser(email, password)
                        .then((result) => {
                            const loggedUser = result.user;
                          console.log(loggedUser);
                            updateUserProfile(name, imgURL)
                                .then(() => {
                                    const userInformation = {
                                        name: name,
                                        email: email,
                                        userImage: imgURL,
                                        gender : gender,
                                        phone : phone,
                                        SignUpTime : new Date(),
                                        Role: "user"
                                    };

                                    const token = localStorage.getItem('access-token');

                                    fetch('https://chain-teck-project-server.vercel.app/users', {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/json',
                                            authorization: `bearer ${token}`,
                                        },
                                        body: JSON.stringify(userInformation),
                                    })
                                        .then((res) => res.json())
                                        .then((data) => {
                                          console.log(data)
                                            if (data.insertedId) {
                                                reset();
                                                notify("Congratulations! You have successfully created your account.", navigate);
                                            }
                                        })
                                        .catch((error) => console.log(error));
                                })
                                .catch((error) => console.log(error));
                        })
                        .catch((error) => {
                          
                          if (error.code === 'auth/email-already-in-use') {
            
                            setSignUpError("Email is already in use. Please use a different email.");
                          } else {
                            reset();
                            setSignUpError('')
                            console.error("Error creating user:", error);
                          }
                        
                        });
                }
            })
            .catch((error) => console.log(error));


    };

    return (
        <div className='lg:m-10 flex justify-center items-center'>
        <div  className=" relative  border border-gray-100  bg-white max-w-screen-md   shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ">
        <div>
         <h1 className="mb-6 text-xl font-semibold text-center lg:text-4xl">Create Your Account</h1>
      

       <ToastifyContainer></ToastifyContainer>
        <div className="w-full flex-1 mt-2">
      <div className="flex flex-col items-center">
        <button
          className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"  onClick={GoogleRegister}
        >
          <div className="bg-white p-2 rounded-full">
             <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
          </div>
          <span className="ml-4"  >Sign Up with Google</span>
        </button>

        <button
          
          className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
        >
          <div className="bg-white p-1 rounded-full">
           <svg className="w-6" viewBox="0 0 32 32">
                                    <path fillRule="evenodd"
                                        d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                                </svg>
          </div>
          <span className="ml-4">Sign Up with GitHub</span>
        </button>
      </div>

      <div className="my-4 border-b text-center">
        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
          Or sign up with e-mail
        </div>
      </div>

      
    </div>
       

<div role="alert" className={`alert alert-error ${isSignupError ? 'visible' : 'hidden'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{isSignupError}</span>
      </div>
        
        </div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className=' space-y-3  rounded-md p-6 lg:p-10 ' >
       
      <div className="grid gap-3 md:grid-cols-2">
          <div> 
            <label className="" for='FirstName'> First Name </label>
            <input
                 className="mt-2 h-12 w-full rounded-md bg-gray-100 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 px-3" 
                 placeholder='First Name'
                    id="Fname"
                    aria-invalid={errors.firstname ? "true" : "false"}
                    {...register("firstname", { required: true })}
                />
                {errors.firstname && errors.firstname.type === "required" && (
        <div className="bg-red-200 px-4 py-2 mx-2 mt-2 rounded-md text-sm flex items-center mx-auto max-w-lg">
        <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className="text-red-800">First name is required</span>
    </div>
      )}
          </div>
          <div>
            <label className="" for='LastName'> Last Name </label>
           
            <input type="text" placeholder="Last  Name" className="mt-2  outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 h-12 w-full rounded-md bg-gray-100 px-3"
                 
                 aria-invalid={errors.lastname ? "true" : "false"}
                    id="Lname"
                    {...register("lastname", )}
                />
                
          </div>
        </div>
        
        <div>
          <label className="" for='email'> Email Address </label>
          <input
        id="email"
        {...register("email", {
          required: "Email addres must be required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        type="email" placeholder="Info@example.com" className="mt-2 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 h-12 w-full rounded-md bg-gray-100 px-3" 
      />
      {errors.email && <div className="bg-red-200 px-4 py-2 mx-2 mt-2 rounded-md text-sm flex items-center mx-auto max-w-lg">
        <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className="text-red-800">{errors.email.message}</span>
    </div> }

        </div>
        <div  className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="" for='password'> Password </label>
          <input
        id="password"
        {...register("password", {
          required: "required",
          minLength: {
            value: 5,
            message: "min length is 5",
          },
          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
            message:
                'Password should include at least one capital letter, one special character, and one number',
        },
        })}
        type="password" placeholder="enter your oassword" className="mt-2 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 h-12 w-full rounded-md bg-gray-100 px-3"
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

        <div>
          <label className="" for='Confirm password'>Confirm Password </label>
          <input
        id="confirmpassword"
        {...register("confirmpassword", {
          required: "Required",
          minLength: {
            value: 5,
            message: "min length is 5",
          },
          validate: (value) =>
          value === watch('password') || 'Passwords do not match',
        })}
        type="password" placeholder="enter your confirm password" className="mt-2 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 h-12 w-full rounded-md bg-gray-100 px-3"
      />
      {errors.confirmpassword && <div className="bg-red-200 px-4 py-2 mx-2 mt-2 rounded-md text-sm flex items-center mx-auto max-w-lg">
        <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className="text-red-800">{errors.confirmpassword.message}</span>
    </div> }

         
    </div>

    </div>
        
        <div className="grid gap-3 lg:grid-cols-2">
          <div>
            <label className=""> Gender </label>
            <div className="relative w-56 mt-2 bg-gray-100 rounded-lg">
              
              
              <select className=" h-12 w-full rounded-md outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 bg-gray-100 px-3"   {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
              
            </div>
          </div>
          <div>
            <label className=""> Phone: <span className="text-sm text-gray-400">(optional)</span> </label>
            <input {...register("phone")} type="text" placeholder="+880........" className="mt-2 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 h-12 w-full rounded-md bg-gray-100 px-3" />
          </div>
        </div>
        <div>
        <label className="my-2 file-input-label">Profile Picture</label>  
        <input {...register("ProfilePic",{ required: true })} type="file" className="file-input outline mt-2 outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 file-input-bordered file-input-md w-full bg-gray-100  " />
        {errors.ProfilePic && <p role="alert">{errors.ProfilePic.message}</p>}
        </div>
       
        <div className="checkbox" style={{ whiteSpace: 'nowrap' }}>
        <input type="checkbox" id="checkbox1"  defaultChecked={true} />
        <label for="checkbox1">
          I agree to the <a href="#" target="_blank" className="text-blue-600">Terms and Conditions</a>
        </label>
      </div>
      
      
        <div>
          <button type="submit" className="mt-2 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">SubMit</button>
        </div>

        <div>
        <label for="">Already Have an Account? <span className="text-blue-600"> <Link to="/login">Please Login here..</Link> </span></label>

      </div>
      </form>
      
      </div>
        
        </div>
    );
}

export default Registation;