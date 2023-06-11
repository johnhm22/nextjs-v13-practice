'use client';

import { FormEvent, useState } from 'react';
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

    //using axios
    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        console.log('createPrompt called');
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
