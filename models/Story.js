const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const StoryPageSchema  = new Schema({
  storyid: {
    type:  Schema.Types.ObjectId,
    ref: 'storySchema'
  },
  pagename: {
    type: String,
    required: true
  }, 
  storymedia: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


const StorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('storyMasterPage', StoryPageSchema);
mongoose.model('storySchema', StorySchema);
