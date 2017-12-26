import mongoose from 'mongoose';

const _marvelSchema = {
  character: {
    name:{type:String},
    thumbnail: {
      path: {
        type: String
      },
      extentions: {
        type: String
      }
    },
    wiki: {
      type: Object
    },
    description: {
      type: String
    }
  }
}

export default mongoose.Schema(_marvelSchema);
