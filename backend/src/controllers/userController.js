const bcrypt = require('bcryptjs');

// In-memory user store (shared with authController - replace with database)
const users = [];

exports.getProfile = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  });
};

exports.updateProfile = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { username } = req.body;
  if (username) {
    user.username = username;
  }

  res.json({
    message: 'Profile updated successfully',
    user: { id: user.id, email: user.email, username: user.username },
  });
};

exports.changePassword = async (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }

  const isValidPassword = await bcrypt.compare(currentPassword, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  user.password = await bcrypt.hash(newPassword, 10);

  res.json({ message: 'Password changed successfully' });
};

exports.deleteAccount = (req, res) => {
  const index = users.findIndex(u => u.id === req.user.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.json({ message: 'Account deleted successfully' });
};
