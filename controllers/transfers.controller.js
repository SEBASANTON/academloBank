const { Transfer } = require('../models/transfer.model');
const { User } = require('../models/user.model');
const { Op } = require('sequelize');

const transferPeticion = async (req, res) => {
  try {
    const { amount, senderUserId, receiverUserId } = req.body;

    const userReceiver = await User.findAll({
      where: { accountNumber: receiverUserId },
    });

    const userSender = await User.findAll({
      where: {
        accountNumber: senderUserId,
        amount: {
          [Op.gte]: amount,
        },
      },
    });

    if (userReceiver.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Recipient account number not found. ',
      });
    } else if (userSender.length === 0) {
      res.status(404).json({
        status: 'error',
        message:
          "The sender's account number cannot be found or does not have a sufficient balance",
      });
    } else {
      const newTransfer = await Transfer.create({
        amount,
        senderUserId,
        receiverUserId,
      });

      const userReceiverObject = await User.findOne({
        where: { accountNumber: receiverUserId },
      });

      const userSenderObject = await User.findOne({
        where: {
          accountNumber: senderUserId,
          amount: {
            [Op.gte]: amount,
          },
        },
      });

      await userReceiverObject.increment('amount', { by: amount });
      await userSenderObject.decrement('amount', { by: amount });

      res.status(201).json({
        newTransfer,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  transferPeticion,
};
