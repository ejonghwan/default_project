import React from 'react';

// components
import UserProfile from '../components/user/UserProfile.js'
import UserPasswordEdit from '../components/user/UserPasswordEdit.js'


const Profile = () => {
    return (
        <div>
            Profile
            <UserProfile />
            <UserPasswordEdit />
        </div>
    );
};

export default Profile;