'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import Form from '@components/Form';
import { IPost } from '@utils/interfaces';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    console.log('promptId:', promptId);

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<IPost>({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async (promptId: IPost) => {
            const response = await axios({
                url: `api/prompt/${promptId}`,
                method: 'GET',
            });
            setPost({
                prompt: response.data.prompt,
                tag: response.data.tag,
            });
        };
        if (promptId) {
            getPromptDetails(promptId);
        }
    }, [promptId]);

    //using axios
    const updatePrompt = async (e: HTMLFormElement) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            alert('Prompt ID not found');
        }

        try {
            const response = await axios({
                url: `api/prompt/${promptId}`,
                method: 'PATCH',
                data: {
                    prompt: post.prompt,
                    tag: post.tag,
                },
            });
            router.push('/');
        } catch (error) {
            console.log('Error in updatePrompt is: ', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default EditPrompt;
