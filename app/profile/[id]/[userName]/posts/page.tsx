'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

import Profile from '@components/Profile';
import { IPromptPost } from '@utils/interfaces';

const UserProfile = ({ params }) => {
    const { id, userName } = params;
    const [userPosts, setUserPosts] = useState<IPromptPost[] | undefined>([]);

    useEffect(() => {
        const getUserPrompts = async () => {
            const response = await axios(`/api/users/${id}/posts`);
            setUserPosts(response.data);
        };
        getUserPrompts();
    }, []);

    return (
        <Profile
            name={userName}
            desc={`Welcome to the profile page for ${userName}`}
            data={userPosts}
        />
    );
};

export default UserProfile;
