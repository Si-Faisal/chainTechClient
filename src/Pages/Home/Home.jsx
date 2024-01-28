import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Timeline from '../../Components/Timeline/Timeline';
import RegisterUser from '../../Components/RegisterUser/RegisterUser';
import ConfirmAuth from '../../Components/ConfirmAUth/ConfirmAuth';
import UserProfile from '../../Components/UserProfile/UserProfile';
import MyTasks from '../../Components/MyTasks/MyTasks';
import Swal from 'sweetalert2';


const currentDate = new Date();
const formattedDate = currentDate.toISOString();

const Home = () => {
    const {  user,usersDB,tasksDB, CalculateTimeStamp,handleDeleteTask,upDateATaskContent,UpdateTask,title,description,setDescription,editedID,handleTitleChange,handleDescriptionChange,handleCommentChange,setComment,isComment,handleUploadComment,setTitle,handleTasksubmit,loading,setRefetch} = useContext(AuthContext);

    console.log(tasksDB)
    const [isTab , setTab] = useState("timeline");
  console.log(user)
    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    const ActiveTab = async (value) => {
        setRefetch(true);
        setTab(value)
}



    const showAuthModal = async ()=>{
        const result= document.getElementById('my_modal_2').showModal();
        console.log(result)
    }

   

    return (
        <div className='container mx-auto  w-full flex flex-col md:flex-row  '>
            <div className='md:w-1/5 w-full bg-slate-300 md:h-screen sticky top-0'>
                <h1 className='px-4 py-4 text-success md:block hidden text-center text-3xl'>Menu.</h1>
                <ul className='z-10 py-3 md:px-8 px-2 md:text-xl text-sm   text-red-800 flex md:flex-col flex-row justify-between'>
                    <li className={` ${isTab == "timeline" ? "border-green-500 text-red-500" : "" }  py-2  border-b-2 `} onClick={()=>ActiveTab("timeline")}>TimeLine</li>
                   
                    
                    <li
  className={` ${isTab === 'task' ? 'border-green-500 text-red-500' : ''}  py-2  border-b-2 `}
  onClick={() => (user?.uid ? ActiveTab('task') : showAuthModal())}
>
  Create Task
</li>
                   
                   
                    {/* <PrivateRoute></PrivateRoute> */}
                    
                    
                    {user?.uid && <li className={` ${isTab == "profile" ? "border-green-500 text-red-500" : "" }  py-2  border-b-2 `} onClick={()=>ActiveTab("profile")}>Profile</li>}
                    {user?.uid && <li className={` ${isTab == "YourTasks" ? "border-green-500 text-red-500" : "" }  py-2  border-b-2 `} onClick={()=>ActiveTab("YourTasks")}>My Tasks</li>}
                </ul>
            </div>
            <div className='md:w-3/5 w-full'>
                { isTab =="profile" ? <div>
                    <UserProfile></UserProfile>
                </div> : isTab == "timeline" ? <div>
                    
                    <Timeline></Timeline>

                </div> :  isTab == "YourTasks" ? <div>
                    
                    <MyTasks></MyTasks>
                </div> :<div>
               <div className="bg-white p-4 rounded-lg ">
                <div className="relative bg-inherit">
                    <input
                       required
                       value={title}
                        onChange={handleTitleChange}
                        type="text"
                        id="username"
                        name="username"
                        className="peer tracking-[1px] h-10 w-full rounded-lg  placeholder-transparent ring-2 px-2 ring-green-500 focus:ring-green-600 focus:outline-none focus:border-green-600"
                        placeholder="Type inside me"
                    />
                    <label
                        htmlFor="username"
                        className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                    >
                        Task Title
                    </label>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
                <div className="relative bg-inherit">
                    <textarea
                        required
                        value={description}
                        onChange={handleDescriptionChange}
                        id="description"
                        name="description"
                        className="peer tracking-[1px] h-60 w-full rounded-lg placeholder-transparent ring-2 p-5 ring-green-500 focus:ring-green-600 focus:outline-none focus:border-green-800"
                        placeholder="Type inside me"
                    ></textarea>
                    <label
                        htmlFor="description"
                        className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                    >
                        Task Description..
                    </label>
                </div>
                <button onClick={handleTasksubmit} className="mt-4  bg-blue-500 text-white py-2 px-4 rounded-lg">
                Post
            </button>
            </div>

           
            
               </div>}
               
            </div>
            <div className='md:w-1/5 hidden md:block'> 
               <RegisterUser></RegisterUser>
            </div>
            <ConfirmAuth></ConfirmAuth>
       

        
    </div>
    );
};

export default Home;