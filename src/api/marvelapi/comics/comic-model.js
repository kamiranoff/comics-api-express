import mongoose from 'mongoose';

const _comicsSchema = {};

export default mongoose.Schema(_comicsSchema).index({dates:1});
