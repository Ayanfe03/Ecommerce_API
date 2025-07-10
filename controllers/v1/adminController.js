const bcrypt = require('bcrypt');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


// @desc POST Creates an Admin
// @route POST /v1/admin
// @access Private
const createFirstAdminHandler = async (req, res) => {
  try {
    let { name, email, password, } = req.body;

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

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters'
      });
    }

    const existingAdmin = await User.findOne({
      where: {
        email,
      }
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: 'Email is already in use'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      role: 'admin',
      password: hashedPassword,
    });

    res.status(201).json({
      message: "First Admin successfully created",
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    })
    
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}


// @desc POST Creates an Admin
// @route POST /v1/admin
// @access Private
const createAdminHandler = async (req, res) => {
  try {
    let { name, email, password, } = req.body;

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

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters'
      });
    }

    const existingAdmin = await User.findOne({
      where: {
        email,
      }
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: 'Email is already in use'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      role: 'admin',
      password: hashedPassword,
    });

    res.status(201).json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    })
    
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

// @desc POST Login a User
// @route POST /v1/admin/login
// @access Public
const loginAdminHandler = async (req, res) => {
  let { email, password } = req.body;

  const admin = await User.findOne({
    where: {
      email,
      role: 'admin'
    }
  });

  if (!admin) {
    return res.status(401).json({
      message: 'Email is invalid',
    });
  }  

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Password is invalid',
    });
  }

  const payload = {
    id: admin.id,
    email: admin.email,
  };

  const adminToken = jwt.sign(payload, config.adminJwtSecret, { expiresIn: '3h' } );

  res.status(200).json({
    adminToken,
  });
};


// @desc GET Retrieves all Users
// @route GET /v1/admin
// @access Private
const getAllUserHandler = async (req, res) => {
  try {
    const user = await User.findAll({});

     const formattedUsers = user.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    res.status(200).json({
      message: 'All Users retrieved successfully',
      users: formattedUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

// @desc GET Retrieves a User
// @route GET /v1/admin/:id
// @access Private
const getUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({
        message: 'Id must be a string'
      })
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc DELETE Deletes a User
// @route DELETE /v1/admin/:id
// @access Private
const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({
        message: 'Id must be a string',
      });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    await user.destroy();
    res.status(204).json();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}


module.exports = {
  createFirstAdminHandler,
  createAdminHandler,
  loginAdminHandler,
  getAllUserHandler,
  getUserHandler,
  deleteUserHandler,
}
