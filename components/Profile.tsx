import { IPromptPost } from '@utils/interfaces';
import PromptCard from './PromptCard';

interface IProps {
    name: string;
    desc: string;
    data?: IPromptPost[];
    handleEdit?: (id: string) => void;
    handleDelete?: (id: string) => void;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: IProps) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">Profile page for {name}</span>
            </h1>
            <p className="desc text-left">{desc}</p>

            <div className="mt-10 prompt_layout">
                {data?.map((post: IPromptPost) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post._id)}
                        handleDelete={() =>
                            handleDelete && handleDelete(post._id)
                        }
                    />
                ))}
            </div>
        </section>
    );
};

export default Profile;
