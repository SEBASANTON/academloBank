const { User } = require('../models/user.model');

const userExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
    });
    if (!User) {
      return res.status(404).json({
        status: 'error',
        message: 'The account does not exist',
      });
    }
    req.user = user;
    next();
    
  } catch (error) {
    console.log(error);
  }
};
module.exports = { userExists };
