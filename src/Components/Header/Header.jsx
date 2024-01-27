import React, { useContext } from 'react';
import { GrUserWorker } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Header = () => {
  const { logOut , dbUsers , user} = useContext(AuthContext);
  console.log(user)
    return (
        <div className='mb-2'>
            <div className="navbar flex justify-between bg-base-100">
  <div className="flex">
    <a className="btn btn-ghost text-6xl text-success">
    <GrUserWorker />
    </a>
  </div>
  <div className='hidden md:block'>
  <h1 className='text-4xl py-4 text-center text-green-600'>Task WorkShop </h1>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      
      {
        user?.uid ? <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={logOut}><a >Logout</a></li>
      </ul>
      </div> 
       
      :  <div>
        <Link to="/login"><button className='btn btn-primary'>LogIn</button></Link>
        <Link to="/signup"><button className='btn btn-success'>Signup</button></Link>
      </div>
      }
     
      
    </div>
  </div>
</div>
            
        </div>
    );
};

export default Header;