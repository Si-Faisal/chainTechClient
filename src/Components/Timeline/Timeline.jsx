import React, { useContext, useEffect, useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

import { AuthContext } from '../../AuthProvider/AuthProvider';
import { MdDelete } from "react-icons/md";
import SweetAlert from '../sweetAlert/SweetAlert';
import Swal from 'sweetalert2'
import ConfirmAuth from '../ConfirmAUth/ConfirmAuth';
import { useQuery } from 'react-query';
const currentDate = new Date();
const formattedDate = currentDate.toISOString();

const Timeline = () => {

  const {  user,usersDB,tasksDB, CalculateTimeStamp,handleDeleteTask,upDateATaskContent,UpdateTask,title,description,setDescription,editedID,handleTitleChange,handleDescriptionChange,handleCommentChange,setComment,isComment,handleUploadComment,setTitle} = useContext(AuthContext);

  


    const [userEmails, setUserEmails] = useState([]);
    const [assignedUserEmail, setAssignedUserEmail] = useState('');

    const token = localStorage.getItem("access-token");

    if (!usersDB && !user) {
        return <span className="loading loading-spinner loading-lg"></span>; 
    }



    useEffect(() => {
     
      const userEmailAddress = usersDB?.map(user => user.email);
      setUserEmails(userEmailAddress);
    }, [usersDB]);


   const handleAssignedUserChange = (e) => {
    setAssignedUserEmail(e.target.value);
  };

    const assignTaskToUser = async (taskId, userEmail) => {
      console.log(taskId , userEmail)
        
      
        const notificationContent = {
          taskId: taskId,
          message: `You have a new task assignment.`,
          taskAssignTime: new Date(),
          state : "pending"
        };

        try {
          fetch('http://localhost:5000/usernotification', {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              authorization: `bearer ${token}`,
          },
          body: JSON.stringify(notificationContent),
      })
          .then((res) => res.json())
          .then((data) => {
              if (data.insertedId) {
                  
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Notification Send Successfully',
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
      
      };
    
    const showAuthModal = async ()=>{
    document.getElementById('my_modal_2').showModal();
     
  }

   
    return (
        <div>
            {tasksDB?<>
               {tasksDB.map(post =>  <div key={post._id} className='w-full p-3  my-2'>
                <div className='w-full flex flex-col border p-3'>
                <div className='flex mb-3 justify-between '>
                    <div className='w-full  block'>
                    <h2 className='md:text-3xl text-2xl w-full text-red-950 pr-2'>{post.Title}</h2>
                    <span>
                    
                    { CalculateTimeStamp(post?.TaskCreationTime).map(
                  (time) => {
                    if (time.IntervalMinute < 1) {
                      return <span key={post._id} className='text-green-400'>Just now | Author: {post?.Authorname }</span>;
                    } else if (time.IntervalMinute < 60) {
                      return (
                        <span key={post._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalMinute} minutes ago) | Author: {post?.Authorname }
                        </span>
                      );
                    } else if (time.IntervalHour < 24) {
                      return (
                        <span key={post._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalHour} hours ago) | Author: {post?.Authorname }
                        </span>
                      );
                    } else if (time.IntervalDays < 7) {
                      return (
                        <span key={post._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalDays} days ago) | Author: {post?.Authorname }
                        </span>
                      );
                    } else {
                    

                      return (
                        <span key={post._id}>hello</span>
                      );
                    }
                  }
                )}

                       
                    </span>
                    </div>
                    {
                      <div className='flex gap-2 pl'>

                     <button 
                     onClick={ ()=> (user?.uid ? UpdateTask(post._id) : showAuthModal()) } className='text-3xl text-green-500'><FaEdit /></button>
                     <button 
                     onClick={ ()=> (user?.uid ? handleDeleteTask(post._id) : showAuthModal()) }
                      className='text-3xl text-red-500'><MdDelete /></button>
                     </div> 
                    }
                  
                 
                  
                 
                    
                    </div>
                    <div className='h-auto'>
                        {
                            post.Description
                        }
                    </div>
                    <div>
                        
                        <div className="flex items-center ">
    <label htmlFor="input-6" className="block text-xl font-medium text-gray-700 dark:text-gray-100 mr-3 text-green-400">Assign task:</label>
    <div className="relative mt-1">
    <input
  type="text"
  id="input-6"
  className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
  placeholder="user@xyz.com"
  list="userEmailsList"
  
  onChange={handleAssignedUserChange}
/>
<datalist id="userEmailsList">
  {userEmails.map((email,i) => (
    <option key={i} value={email} />
  ))}
</datalist>
<span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4 text-blue-400 pointer-events-none"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
</span>

    </div>
    <button onClick={()=>assignTaskToUser(post._id, assignedUserEmail)} className='flex px-3 py-2 border text-success hover:bg-success hover:text-white radius gap-2 rounded-sm mt-2 ml-2 items-center'><IoMdSend/> post</button>
</div>
                       
                <div className='flex items-center mt-2'>
                 
                
                  {post?.assignUsers && Array.isArray(post?.assignUsers) && post?.assignUsers.map(assigEmail => (
    <span key={assigEmail} className='text-green-500 text-sm px-2 border'>{assigEmail}</span>
  ))}
                  
                  
                </div>
              
                    
                    </div>
                    <div> 
                <h1 className='py-1 text-2xl mb-3 mt-4'>Comment</h1>
                
                <div className='my-3'>

                {
                    post?.Comment?.map((cmt, i) => <div key={i} className='border p-2'> 
                      <div className='flex justify-between '>
                      <span className='mb-1 text-lg text-primary'>{cmt.CommenterName? cmt.CommenterName : "Anonymous"}</span>
                      <span>
                       

                      {CalculateTimeStamp(cmt?.CommentTime?.seconds, cmt?.CommentTime?.nanoseconds).map(
                  (time) => {
                    if (time.IntervalMinute < 1) {
                      return <span key={post.id} className='text-green-400'>Just now </span>;
                    } else if (time.IntervalMinute < 60) {
                      return (
                        <span key={post.id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalMinute} minutes ago) 
                        </span>
                      );
                    } else if (time.IntervalHour < 24) {
                      return (
                        <span key={post.id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalHour} hours ago) 
                        </span>
                      );
                    } else if (time.IntervalDays < 7) {
                      return (
                        <span key={post.id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalDays} days ago) 
                        </span>
                      );
                    } else {
                     

                      return (
                        <span key={post.id}>
                          
                        </span>
                      );
                    }
                  }
                )}
                        
                      </span>
                      
                      </div>
                       
                       <p>{cmt.usercomment}</p>
                    </div> )
                }

                </div>
                
                   
                
                <textarea value={isComment} onChange={handleCommentChange} id='comment' placeholder="write a comment" className="textarea textarea-bordered textarea-md w-full" ></textarea>
                <div className='text-right '>
                <button 
                onClick={ ()=> (user?.uid ? handleUploadComment(post.id) : showAuthModal()) }
               disabled={isComment === ""}
                className="px-3 btn text-xl py-2 text-green-500 border"><IoMdSend />send</button>
                </div>
            </div> 
                </div>
                
                </div>)}
            </> : <h2>Create Your post...</h2> }




            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
              <div className="bg-white p-4 rounded-lg ">
                <div className="relative bg-inherit">
                    <input
                        onChange={handleTitleChange}
                        type="text"
                        id="username"
                        name="username"
                        className="peer tracking-[1px] h-10 w-full rounded-lg  placeholder-transparent ring-2 px-2 ring-green-500 focus:ring-green-600 focus:outline-none focus:border-green-600"
                        placeholder="Type inside me"
                        defaultValue={title}
                    >
                        
                    </input>
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
                        onChange={handleDescriptionChange}
                        id="description"
                        name="description"
                        className="peer tracking-[1px] h-60 w-full rounded-lg placeholder-transparent ring-2 p-5 ring-green-500 focus:ring-green-600 focus:outline-none focus:border-green-800"
                        placeholder="Type inside me"
                        defaultValue={description}
                    >

                    </textarea>
                    <label
                        htmlFor="description"
                        className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                    >
                        Task Description..
                    </label>
                    
                </div>
            </div>
            <div className='modal-action'>
            <form method="dialog">
                <div>
                    <button onClick={()=>upDateATaskContent(editedID, title, description)} className="btn btn-success">Post</button>
                </div>
                </form>
            </div>

                
              </div>
            </dialog>

            <ConfirmAuth></ConfirmAuth>


                        
        </div>
        
    );
};

export default Timeline;