import React from 'react';
import PromptCard from './PromptCard';
import { IPromptPost } from '@utils/interfaces';

interface IProps {
    data: IPromptPost[];
    handleTagClick: (e: React.MouseEvent<HTMLFormElement>) => void;
}

const PromptCardList: React.FC<IProps> = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data?.map((post: IPromptPost) => (
                <PromptCard
                    key={post._id}
                    prompt={post.prompt}
                    tag={post.tag}
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
