'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { IPost, IPromptPost } from '@utils/interfaces';

const MyProfile = () => {
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState<IPromptPost[] | undefined>([]);

    console.log('session in profile/page.tsx:', session);

    const router = useRouter();

    const handleEdit = (id: string) => {
        router.push(`/update-prompt?id=${id}`);
    };

    const handleDelete = async (id: string) => {
        console.log('id in handleDelete', id);
        const hasConfirmed = confirm(
            'Are you sure you want to delete this prompt?'
        ); //built into browser
        if (hasConfirmed) {
            try {
                await axios({
                    url: `api/prompt/${id}`,
                    method: 'DELETE',
                });

                //filter out deleted post from myPosts using setMyPosts
                const filteredPosts = myPosts!.filter(
                    (p: IPromptPost) => p._id !== id
                );
                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        console.log('useEffect called');
        const getPrompts = async () => {
            const response = await axios(
                `api/users/${session?.user?.id}/posts`
            );
            setMyPosts(response.data);

            // if (session?.user?.id) {
            //     setMyPosts(response.data);
            // }
        };
        getPrompts();
    }, []);

    return (
        <Profile
            name="My"
            desc="Welcome to your personalised profile page"
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
