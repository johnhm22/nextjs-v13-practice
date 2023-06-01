import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', //reference to the user creating prompt. This will be a 1 to many relationship
    },
    prompt: {
        type: String,
        required: [true, 'A prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'A tag is required'],
    },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
