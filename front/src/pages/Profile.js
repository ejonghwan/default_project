import React from 'react';

// components
import UserProfile from '../components/user/UserProfile.js'
import UserPasswordEdit from '../components/user/UserPasswordEdit.js'
import FindId from '../components/user/FindId.js'
import FindPassword from '../components/user/FindPassword.js'


const Profile = () => {
    return (
        <div>
            Profile
            <UserProfile />
            <UserPasswordEdit />
            <br />
            <br />
            <FindId />
            <FindPassword />
        </div>
    );
};

export default Profile;