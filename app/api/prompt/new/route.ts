import { NextRequest, NextResponse } from 'next/server';

import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req: NextRequest, res: NextResponse) => {
    let { tag, userId, prompt } = await req.json();

    if (tag[0] !== '#') {
        tag = '#' + tag;
    }

    try {
        await connectToDB(); //we connect to the db and then create a new prompt
        //here we need to call the model for the prompt which we still need to create
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 });
    }
};
