'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { IPost } from '@utils/interfaces';
import PromptCardList from './PromptCardList';

const Feed = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [posts, setPosts] = useState<IPost>();

    useEffect(() => {
        const getPrompts = async () => {
            const response = await axios('api/prompt', {});
            console.log('response for getPrompts: ', response.data);
            console.log('response for creator: ', response.data[0].creator);
            setPosts(response.data);
        };
        getPrompts();
    }, []);

    const handleSearchChange = (e) => {};

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList data={posts} handleTagClick={() => {}} />
        </section>
    );
};

export default Feed;
