import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { IoMdSend } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import SweetAlert from '../sweetAlert/SweetAlert';
import Swal from 'sweetalert2'
import { app } from '../../Firebase/Firebase.config';
import ConfirmAuth from '../ConfirmAUth/ConfirmAuth';


const currentDate = new Date();
const formattedDate = currentDate.toISOString();

const MyTasks = () => {
    const {  user,usersDB,tasksDB, CalculateTimeStamp,handleDeleteTask,upDateATaskContent,UpdateTask,title,description,editedID,handleTitleChange,handleDescriptionChange,handleCommentChange,setComment,isComment,handleUploadComment} = useContext(AuthContext);
 

    if (!usersDB && !user) {
        return <span className="loading loading-spinner loading-lg"></span>; 
    }
  
    const showAuthModal = async ()=>{
    document.getElementById('my_modal_2').showModal();
     
  }
  
  const MyCreatedTask = tasksDB?.filter(tasks => tasks?.AuthorGmail == user?.email);
  
    return (
        <div>
            {MyCreatedTask ?<>
               {MyCreatedTask.map(post =>  <div key={post._id} className='w-full p-3  my-2'>
                <div className='w-full flex flex-col border p-3'>
                <div className='flex mb-3 justify-between '>
                    <div className='w-full  block'>
                    <h2 className='md:text-3xl text-2xl w-full text-red-950 pr-2'>{post.Title}</h2>
                    <span >
                    {CalculateTimeStamp(post.TaskCreationTime).map(
                  (time) => {
                    if (time.IntervalMinute < 1) {
                      return <span key={post?._id} className='text-green-400'>Just now | Author: {post?.Authorname }</span>;
                    } else if (time.IntervalMinute < 60) {
                      return (
                        <span key={post?._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalMinute} minutes ago) | Author: {post?.Authorname }
                        </span>
                      );
                    } else if (time.IntervalHour < 24) {
                      return (
                        <span key={post?._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalHour} hours ago) | Author: {post?.Authorname }
                        </span>
                      );
                    } else if (time.IntervalDays < 7) {
                      return (
                        <span key={post?._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalDays} days ago) | Author: {post?.Authorname }
                        </span>
                      );
                    } else {
                      

                      return (
                        <span key={post?._id}>
                         hello
                        </span>
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
                        <h1 className='text-primary text-2xl'>Assign task:</h1>
                       
                    
                    </div>
                    <div> 
                <h1 className='py-1 text-2xl mb-3 mt-4'>Comment</h1>
                
                <div className='my-3'>

                {
                    post?.comments?.map((cmt, i) => <div key={i} className='border p-2'> 
                      <div className='flex justify-between '>
                      <span className='mb-1 text-lg text-primary'>{cmt.CommenterName? cmt.CommenterName : "Anonymous"}</span>
                      <span>
                       

                      {CalculateTimeStamp(cmt.CommentTime).map(
                  (time) => {
                    if (time.IntervalMinute < 1) {
                      return <span key={post._id} className='text-green-400'>Just now </span>;
                    } else if (time.IntervalMinute < 60) {
                      return (
                        <span key={post._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalMinute} minutes ago) 
                        </span>
                      );
                    } else if (time.IntervalHour < 24) {
                      return (
                        <span key={post._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalHour} hours ago) 
                        </span>
                      );
                    } else if (time.IntervalDays < 7) {
                      return (
                        <span key={post._id} className='text-green-400'>
                          {time.ThoseHour}:{time.ThoseMinute} {time.AmPm} ({time.IntervalDays} days ago) 
                        </span>
                      );
                    } else {
                     

                      return (
                        <span key={post._id}>
                          
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
                disabled={isComment === ""}
                onClick={ ()=> (user?.uid ? handleUploadComment(post._id) : showAuthModal()) }
                className='px-3 btn text-xl py-2 text-green-500 border'><IoMdSend />send</button>
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

export default MyTasks;