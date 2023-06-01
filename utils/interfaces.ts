export interface IPost {
    prompt: string;
    tag: string;
}

interface ICreator {
    email: string;
    image: string;
    username: string;
    __v: number;
    _id: string;
}

export interface IPromptPost {
    prompt: string;
    tag: string;
    _v: number;
    _id: string;
    creator: ICreator;
}
