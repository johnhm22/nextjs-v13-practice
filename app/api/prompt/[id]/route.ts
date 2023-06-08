import { connectToDB } from '@utils/database'; //we need to connect to the DB so need this function
import Prompt from '@models/prompt';
import { NextRequest, NextResponse } from 'next/server';

// GET
export const GET = async (req: NextRequest, { params }) => {
    const { id } = params;
    try {
        await connectToDB(); //we connect to the db
        const prompt = await Prompt.findById(id).populate('creator');
        if (!prompt) {
            return new Response('Prompt not found', { status: 400 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to find prompt', { status: 404 });
    }
};

// PATCH

export const PATCH = async (req: NextRequest, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        const existingPrompt = await Prompt.findById(params.id);
        if (!prompt) {
            return new Response('Prompt not found', { status: 400 });
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to update existing prompt', {
            status: 500,
        });
    }
};

// DELETE
export const DELETE = async (req: NextRequest, { params }) => {
    console.log('params in GET route: ', params);
    const { id } = params;
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(id);
        return NextResponse.json('Prompt deleted successfully');
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 });
    }
};
