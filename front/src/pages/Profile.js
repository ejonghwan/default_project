import React from 'react';

// components
import UserProfile from '../components/user/UserProfile.js'
import UserProfileEdit from '../components/user/UserProfileEdit.js'


const Profile = () => {
    return (
        <div>
            Profile
            <UserProfile />
            <UserProfileEdit />
        </div>
    );
};

export default Profile;