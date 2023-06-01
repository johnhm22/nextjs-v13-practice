'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Form from '@components/Form';
import { IPost } from '@utils/interfaces';

function CreatePrompt() {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<IPost>({
        prompt: '',
        tag: '',
    });

    // const createPrompt = async (e) => {
    //     console.log('e is: ', e);
    //     e.preventDefault();
    //     setSubmitting(true);
    //     try {
    //         console.log('post in frontend createPrompt function:', post);
    //         console.log('session.user.id: ', session?.user.id);
    //         const response = await fetch('api/prompt/new', {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 prompt: post.prompt,
    //                 userId: session?.user?.id,
    //                 tag: post.tag,
    //             }),
    //         });
    //         console.log('response from new prompt api call', response);
    //         if (response.ok) {
    //             router.push('/');
    //         }
    //     } catch (error) {
    //         console.log('Error in createPrompt is: ', error);
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    //using axios

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios({
                url: 'api/prompt/new',
                method: 'POST',
                data: {
                    prompt: post.prompt,
                    userId: session?.user?.id,
                    tag: post.tag,
                },
            });
            console.log('response from new prompt api call', response);
            router.push('/');
        } catch (error) {
            console.log('Error in createPrompt is: ', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
}

export default CreatePrompt;
