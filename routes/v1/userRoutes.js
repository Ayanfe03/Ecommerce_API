const express = require('express');
const router = express.Router();
const { createUserHandler } = require('../../controllers/v1/userController');
const { getUserHandler } = require('../../controllers/v1/userController');
const { getAllUserHandler } = require('../../controllers/v1/userController');
const { loginUserHandler } = require('../../controllers/v1/userController');
const { updatedUserHandler } = require('../../controllers/v1/userController');
const { deleteUserHandler } = require('../../controllers/v1/userController');
const validateToken = require('../../middleware/auth');

router.post('', createUserHandler);
router.get('/:id', getUserHandler);
router.get('', getAllUserHandler);
router.post('/login', loginUserHandler);
router.put('/:id', updatedUserHandler);
router.delete('/:id', validateToken, deleteUserHandler);

module.exports = router;