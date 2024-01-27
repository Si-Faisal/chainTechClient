import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import 'firebase/analytics'; 
import {app} from '../Firebase/Firebase.config';
import { useQuery } from "react-query";
import Swal from "sweetalert2";
export const AuthContext = createContext(null);
const token = localStorage.getItem("access-token");

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usersDB , setusersDB] = useState([]);
    const [tasksDB, setTasksDB] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editedID, setEditedId] = useState();
    const [isComment , setComment]= useState('');

    const googleProvider = new GoogleAuthProvider();

    const auth = getAuth(app);



    if(!user){
        <span className="loading loading-spinner loading-lg"></span>
    }
  
    // Authentication start..........
    const createUser = async (email, password) => {
        setLoading(true);
        return await createUserWithEmailAndPassword(auth, email, password) 

    }

    const googleSignIn =async () => {
        setLoading(true);
        return await signInWithPopup(auth, googleProvider);
    }

    const signIn = async (email, password) => {
        setLoading(true);
        return await signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        setUser(null);
        return signOut(auth);
    }

    const updateUserProfile =async (name, imgUrl) => {
        return await updateProfile(auth.currentUser, {
            displayName: name , photoURL : imgUrl
        });
    }

    useEffect(() => {
        const unsubscribe =onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])


    // authentication end....

    //  FireStore Db Start......

    const convertIso8601ToFirestore = (iso8601Timestamp) => {
        const date = new Date(iso8601Timestamp);
        const seconds = Math.floor(date.getTime() / 1000);
        const nanoseconds = (date.getTime() % 1000) * 1e6;
        return { seconds, nanoseconds };
      };
      
    

     
    const CalculateTimeStamp =(iso8601Timestamp)=>{
        const date = new Date(iso8601Timestamp);
        const firestoreSeconds = Math.floor(date.getTime() / 1000);
        const firestoreNanoseconds = (date.getTime() % 1000) * 1e6;

        const timestamp = new Date(firestoreSeconds * 1000 + firestoreNanoseconds / 1e6);
        const hours = timestamp.getHours();
        const ThoseMinutes = timestamp.getMinutes();
        const ThoseSeconds = timestamp.getSeconds();

         const formattedHours = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        const now = new Date();
        const intervalInMilliseconds = now - timestamp;
    
        const intervalInHours = Math.floor(intervalInMilliseconds / (1000 * 60 * 60));
        const intervalInDays = Math.floor(intervalInHours / 24);
        const intervalInMinutes = Math.floor(intervalInMilliseconds / (1000 * 60));
        const remainingSeconds = Math.floor((intervalInMilliseconds % (1000 * 60)) / 1000);
    
    
        const ConsumeTime ={
           ThoseHour : formattedHours,
           ThoseMinute : ThoseMinutes,
           ThoseSeconds : ThoseSeconds,
           IntervalDays : intervalInDays,
           IntervalHour : intervalInHours,
           IntervalMinute : intervalInMinutes,
           IntervalSecond : remainingSeconds,
           AmPm : ampm

        }

        return [ConsumeTime];
    }

   
    
    const  handleDeleteTask = async (taskid)=>{
        console.log(taskid)
            
            Swal.fire({
                title: "Do you want to delete the task?",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Delete",
              }).then( async(result) => {
                
                if (result.isConfirmed) {
                  try {
                    const res = await fetch(`https://chain-teck-project-server.vercel.app/task/${taskid}`, {
                        method: 'DELETE',
                        headers: {
                            authorization: `bearar ${token}`,
                        },
                    });
                    const data = await res.json();
                    console.log(data);
                    if (data.success == true) {
                        
                         await fetch('https://chain-teck-project-server.vercel.app/tasks', {
                            headers: {
                                authorization: `bearar ${token} `
                            }
                        });
                         await fetch('https://chain-teck-project-server.vercel.app/users', {
                            headers: {
                                authorization: `bearar ${token} `
                            }
                        });




                        Swal.fire("Task have been deleted!", "", "success");
                    }
                    
                } catch (error) {
                    console.error('Error removing class:', error);
                }
                  
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              })
        }


        const upDateATaskContent = async(id, updatedTitle, updatedDec)=>{
       
        
           
            console.log(id, updatedTitle,updatedDec)
    
            const Newdata = {
                Title : updatedTitle,
                Description : updatedDec
            }
             try {
                
             
              const token = localStorage.getItem("access-token");
            fetch(`https://chain-teck-project-server.vercel.app/task/${id}`, {
    
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearar ${token} `
                },
                body: JSON.stringify(Newdata)
    
            })
                .then(res => res.json())
                .then(async(data) => {
                    console.log(data)
                    if (data.modifiedCount) {
                        await fetch('https://chain-teck-project-server.vercel.app/tasks', {
                            headers: {
                                authorization: `bearar ${token} `
                            }
                        });
                         await fetch('https://chain-teck-project-server.vercel.app/users', {
                            headers: {
                                authorization: `bearar ${token} `
                            }
                        });
                      
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Task updated',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
             } catch (error) {
                 console.error("Error updating comment:", error.message);
             }
    
    
    
        }


        const UpdateTask = async(id) => {
         
              const TargetedPost =  tasksDB.find(data => {
                  if(data._id == id){
                    return data;
                  }
               });
               console.log(TargetedPost);
               setEditedId(TargetedPost._id);
               setTitle(TargetedPost.Title)
               setDescription(TargetedPost.Description)
      
                 document.getElementById('my_modal_5').showModal();
             
          }


          
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }


    const handleCommentChange = (e)=>{
        setComment(e.target.value);
               
    }

    const handleUploadComment =async (id)=>{
        console.log(id);
        const newcomment = {
            usercomment : isComment,
            CommenterName : user?.displayName,
            CommenterEmail : user?.email
        }

    
        try {
            
      const token = localStorage.getItem("access-token");
        fetch(`https://chain-teck-project-server.vercel.app/task/comment/${id}`, {

            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `bearar ${token} `
            },
            body: JSON.stringify(newcomment)

        })
            .then(res => res.json())
            .then(async(data) => {
                console.log(data)
                if (data.acknowledged == true) {

                   setComment('');
                   await fetch('https://chain-teck-project-server.vercel.app/tasks', {
                    headers: {
                        authorization: `bearar ${token} `
                    }
                });
                 await fetch('https://chain-teck-project-server.vercel.app/users', {
                    headers: {
                        authorization: `bearar ${token} `
                    }
                });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Comment to the Task',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
         } catch (error) {
             console.error("Error updating comment:", error.message);
         }
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
           await fetch('https://chain-teck-project-server.vercel.app/tasks', {
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
                    setTitle('');
                    setDescription("");
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
  
    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                
                const response = await fetch('https://chain-teck-project-server.vercel.app/users', {
                    headers: {
                        authorization: `bearar ${token} `
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setusersDB(data);
            } catch (error) {
                // setError(error.message); 
                console.log(error)
            } finally {
                // setIsLoading(false);
            }
        };
       

        const fetchTasksData = async () => {
            try {
                
                const response = await fetch('https://chain-teck-project-server.vercel.app/tasks', {
                    headers: {
                        authorization: `bearar ${token} `
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks data');
                }
                const data = await response.json();
                setTasksDB(data);
            } catch (error) {
                // setError(error.message); 
                console.log(error)
            } finally {
                // setIsLoading(false);
            }
        };

        fetchTasksData();

        fetchUsersData();
    }, [handleDeleteTask,upDateATaskContent,handleTasksubmit]);
  

    const AuthDetails = {
        handleDescriptionChange,
        handleCommentChange,
        handleTitleChange,
        user,
        loading,
        createUser,
        googleSignIn,
        signIn,
        logOut,
        updateUserProfile,
        setUser,
        CalculateTimeStamp,
        usersDB,
        convertIso8601ToFirestore,
        tasksDB,
        handleDeleteTask,
        upDateATaskContent,
        UpdateTask,
        title,
        setTitle,
        description,
        setDescription,
        editedID,
        isComment,
        setComment,
        handleUploadComment,
        handleTasksubmit
    }

    return (
        <AuthContext.Provider value={AuthDetails}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;