'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';
import { IPost } from '@utils/interfaces';

const MyProfile = () => {
    const handleEdit = () => {};
    const handleDelete = async () => {};

    const { data: session } = useSession();
    const [posts, setPosts] = useState<IPost | []>([]);

    useEffect(() => {
        console.log('inside useEffect');
        const getPrompts = async () => {
            const response = await axios(
                // `api/users/${session?.user?.id}/posts`,
                `api/users/6476349e5197ac23d5aa3ebc/posts`
            );
            // if (session?.user?.id) {
            //     setPosts(response.data);
            // }
            console.log("user's posts: ", response.data);
            setPosts(response.data);
        };
        getPrompts();
    }, []);

    return (
        <Profile
            name="My profile"
            desc="Welcome to your personalised profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
