const { User } = require('../models/user.model');
const { Transfer } = require('../models/transfer.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const min = 100000;
    const max = 999999;
    const accountNumber = Math.floor(Math.random() * (max - min + 1) + min);

    const newuser = await User.create({
      name,
      password,
      accountNumber,
    });

    res.status(201).json({
      newuser,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const userLogin = await User.findAll({
      where: {
        accountNumber,
        password,
      },
    });

    if (userLogin.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Recipient account number not found. ',
      });
    } else {
      res.status(201).json({
        status: 'success',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const historyById = async (req, res) => {
  try {
    const { user } = req;

    const transfers = await Transfer.findAll({
      where: { senderUserId: user.accountNumber },
    });

    res.status(200).json({
      transfers,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  historyById,
};
