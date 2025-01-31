const express = require('express');
const {
  createFirstAdminHandler,
  createAdminHandler,
  loginAdminHandler,
  getAllUserHandler,
  getUserHandler,
  deleteUserHandler
} = require('../../controllers/v1/adminController');
const router = express.Router();
const adminValidateToken = require('../../middleware/authAdmin');

router.post('/first', createFirstAdminHandler)
router.post('', adminValidateToken, createAdminHandler);
router.post('/login', loginAdminHandler);
router.get('', adminValidateToken, getAllUserHandler);
router.get('/:id', adminValidateToken, getUserHandler);
router.delete('/:id', adminValidateToken, deleteUserHandler);

module.exports = router;