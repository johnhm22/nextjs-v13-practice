'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

import { IPromptPost } from '@utils/interfaces';
import PromptCardList from './PromptCardList';

const Feed = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [posts, setPosts] = useState<IPromptPost[]>();

    const getPrompts = async () => {
        const response = await axios('api/prompt', {});
        setPosts(response.data);
    };

    useEffect(() => {
        getPrompts();
    }, []);

    const debouncedSearch = debounce((arg) => {
        console.log('debouncedSearch called');
        console.log('search arg in debounce: ', arg);
        setSearchText(arg);
        if (arg === '') {
            getPrompts();
        } else {
            const filteredPosts = posts!.filter(
                (p) =>
                    p.prompt.includes(searchText) ||
                    // p.creator.username === searchText ||
                    p.tag === searchText
            );
            setPosts(filteredPosts);
        }
    }, 200);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('e.target.value: ', e.target.value);
        debouncedSearch(e.target.value);
    };

    const tagSearch = (tag: string) => {
        const filteredPosts = posts!.filter((p) => p.tag === tag);
        setPosts(filteredPosts);
    };

    const handleTagClick = (tag: string) => {
        setSearchText(tag);
        tagSearch(tag);
    };

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
            <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;
