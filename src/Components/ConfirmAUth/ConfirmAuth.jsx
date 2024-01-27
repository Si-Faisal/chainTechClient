import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmAuth = () => {
    return (
        <div>
            {/* <button className="btn" >open modal</button> */}
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello! User</h3>
    <p className="py-4">You really want to Create task,Update task,delete task and Comments to the task post!! Then you have to be login or signup first.</p>
    <Link to="/login"><button className='
    btn btn-success'>LogIn here</button></Link>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
        </div>

    );
};

export default ConfirmAuth;