import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const RegisterUser = () => {
    const {  usersDB} = useContext(AuthContext);
    
   
    return (
        <div className='bg-slate-300 p-2 sticky top-0'>
            <h1 className='text-3xl text-green-600'>All Register User</h1>
            <ul>
                {
                    usersDB?.map((user, i) =>{
                       return ( <li key={user._id} className='flex flex-col my-2'>
                           
                       <span className='text-xl h-auto w-full'>{i+1}. Name:  {user?.name}  </span>
                       <span className='text-xl h-auto w-full'>Email: {user?.email}  </span>
                   </li>)
                    })
                }
                
            </ul>
        </div>
    );
};

export default RegisterUser;