import React from 'react';
import PromptCard from './PromptCard';
import { IPost, IPromptPost } from '@utils/interfaces';

interface IProps {
    data: IPromptPost[];
    handleTagClick: (e: React.MouseEvent<HTMLFormElement>) => void;
}

const PromptCardList: React.FC<IProps> = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data?.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post.prompt}
                    image={post.creator.image}
                    username={post.creator.username}
                    email={post.creator.email}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

export default PromptCardList;
