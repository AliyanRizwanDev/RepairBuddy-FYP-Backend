import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
    required: true,
  },
  chatDescription: {
    type: String,
  },
  messages: [messageSchema],
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
