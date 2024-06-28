import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  const { userId, vendorId, issueMessage, visitPrice, timeInHours, userAddress } = req.body;
  try {
    const order = await Order.create({
      user: userId,
      vendor: vendorId,
      issueMessage,
      visitPrice,
      timeInHours,
      userAddress
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user vendor");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, rating } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status, rating }, { new: true });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
