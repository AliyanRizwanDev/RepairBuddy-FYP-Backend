import { Router } from 'express';
import { createChat, getChatHistory, addMessage, getAllChats, deleteChat } from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.post('/', createChat);
chatRouter.get('/', getAllChats);
chatRouter.get('/:id', getChatHistory);
chatRouter.post('/:id/messages', addMessage);
chatRouter.delete('/:id', deleteChat);

export default chatRouter;
