import Chat from '../models/chatModel.js';

export const createChat = async (req, res) => {
  const { chatName, chatDescription } = req.body;
  try {
    const newChat = new Chat({ chatName, chatDescription, messages: [] });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMessage = async (req, res) => {
  const { id } = req.params;
  const { sender, text } = req.body;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    chat.messages.push({ sender, text });
    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChat = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findByIdAndDelete(id);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
