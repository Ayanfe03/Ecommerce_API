const bcrypt = require('bcrypt');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// @desc POST Creates a Buyer
// @route POST /v1/users/buyer
// @access Public
const createBuyerHandler = async (req, res) => {  
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      })
    }

    if (typeof name !== 'string') {
      return res.status(400).json({
        message: 'Name must be a string',
      });
    }

    if (typeof email !== 'string') {
      return res.status(400).json({
        message: 'Email must be a string',
      });
    }

    if (typeof password !== 'string') {
      return res.status(400).json({
        message: 'Password must be a string',
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
        'Password must be at least 8 characters long and include at least one number and one special character',
    });
  }

    const existingUser = await User.findOne({
      where: {
        email,
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email is already in use'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role: 'buyer',
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
    
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

// @desc POST Creates a Seller
// @route POST /v1/users/seller
// @access Public
const createSellerHandler = async (req, res) => {
  try {
    let { name, email, businessName, password, } = req.body;

    if (!name || !email || !businessName || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      })
    }

    if (typeof name !== 'string') {
      return res.status(400).json({
        message: 'Name must be a string',
      });
    }

    if (typeof email !== 'string') {
      return res.status(400).json({
        message: 'Email must be a string',
      });
    }

    if (typeof businessName !== 'string') {
      return res.status(400).json({
        message: 'Business Name must be a string',
      });
    }

    if (typeof password !== 'string') {
      return res.status(400).json({
        message: 'Password must be a string',
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
      'Password must be at least 8 characters long and include at least one number and one special character',
  });
}

    const existingUser = await User.findOne({
      where: {
        email,
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email is already in use'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      businessName,
      role: 'seller',
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      businessName: user.businessName,
      role: user.role,
    })
    
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

// @desc PUT Update a user
// @route PUT /v1/users/:id
// @access Private
const updatedUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email } = req.body;

    if (typeof name !== 'string') {
      return res.status(400).json({
        message: 'Name must be a string',
      });
    }

    if (typeof email !== 'string') {
      return res.status(400).json({
        message: 'Email must be a string',
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    user.name = name,
    user.email = email,

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message, 
    });
  }
}

// @desc POST Login a User
// @route POST /v1/users/login
// @access Public
const loginUserHandler = async (req, res) => {
  let { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    }
  });

  if (!user) {
    return res.status(401).json({
      message: 'Email is invalid',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Password is invalid',
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' } );

  res.status(200).json({
    token,
  });
};

const resetPasswordHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Both current password and new password are required',
      });
    }

    const user = await User.findByPk(id);
    if (!user){
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Current password is invalid',
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: 'New password cannot be the same as the current password',
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
        'New Password must be at least 8 characters long and include at least one number and one special character',
    });
  }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: 'Password updated successfully',
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  createBuyerHandler,
  createSellerHandler,
  updatedUserHandler,
  loginUserHandler,
  resetPasswordHandler
}