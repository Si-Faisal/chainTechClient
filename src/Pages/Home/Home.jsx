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

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isTab , setTab] = useState("timeline");
    
   

    const {  user, loading} = useContext(AuthContext);
    

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const ActiveTab = async (value) => {
        setTab(value)

}
    

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

  

    const handleTasksubmit = async() => {

        const tasksInfo = {
            Title : title,
            Description: description,
            TaskCreationTime : new Date(),
            Authorname : user?.displayName,
            AuthorGmail : user.email
        }
        const token = localStorage.getItem('access-token');
        try {
            fetch('https://chain-teck-project-server.vercel.app/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`,
            },
            body: JSON.stringify(tasksInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Task Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch((error) => console.log(error));
           
            setTitle('');
            setDescription("");
            
        } catch (error) {
            console.error('Error adding document: ', error);
        }

    }

 
    
       
    
    

    const showAuthModal = async ()=>{
        const result= document.getElementById('my_modal_2').showModal();
        console.log(result)
    }

   

    return (
        <div className='container mx-auto  w-full flex flex-col md:flex-row  '>
            <div className='md:w-1/5 w-full bg-slate-300 md:h-screen sticky top-0'>
                <h1 className='px-4 py-4 text-success md:block hidden text-center text-3xl'>Menu.</h1>
                <ul className=' py-3 md:px-8 px-2 text-xl  text-red-800 flex md:flex-col flex-row justify-between'>
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
                        for="username"
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
                        for="description"
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