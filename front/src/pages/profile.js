import React from 'react';

// components
import UserProfile from '../components/user/UserProfile.js'
import UserPasswordEdit from '../components/user/UserPasswordEdit.js'
import FindId from '../components/user/FindId.js'
import FindPassword from '../components/user/FindPassword.js'
import FindIdQuestion from '../components/user/FindIdQuestion.js'


const Profile = () => {
    return (
        <div>
            UserProfile
            <UserProfile />
            <br />
            UserPasswordEdit
            <UserPasswordEdit prevPasswordCheck={true}/>
            <br />
            FindId
            <FindId />
            <br />
            <br />
            FindIdQeustion
            <FindIdQuestion />
            <br />
            <br />
            FindPassword
            <FindPassword />
        </div>
    );
};

export default Profile;
