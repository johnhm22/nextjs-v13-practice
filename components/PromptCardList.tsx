import React from 'react';
import PromptCard from './PromptCard';
import { IPromptPost } from '@utils/interfaces';

interface IProps {
    data?: IPromptPost[];
    handleTagClick: (arg0: string) => void;
}

const PromptCardList: React.FC<IProps> = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data?.map((post: IPromptPost) => (
                <PromptCard
                    key={post._id}
                    post={post}                
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

export default PromptCardList;
