import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const UserProfile = () => {
  const {  user,usersDB} = useContext(AuthContext);

  const MyProfileData = usersDB?.find(singleData => singleData?.email == user?.email)

console.log(MyProfileData);
    return (
        <div>
            <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 text-center sm:px-6">
   
        <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={MyProfileData?.userImage} />
        </div>
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
            Your Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
            I am a Task Manager and Monitizer
        </p>
    </div>
    <div className="border-t border-gray-200">
        <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                   {MyProfileData?.name}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {MyProfileData?.email}
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Gender
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {MyProfileData?.gender}
                </dd>
            </div>
            
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {MyProfileData?.phone}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    About
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To get social media testimonials like these, keep your customers engaged with your social media accounts by posting regularly yourself
                </dd>
            </div>
        </dl>
    </div>
</div>
        </div>
    );
};

export default UserProfile;