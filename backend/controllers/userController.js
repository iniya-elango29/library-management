const User = require('../models/User');

exports.getStudents = (req, res) => {
  User.getStudents((err, students) => {
    res.render('students', { students });
  });
};

exports.deleteStudent = (req, res) => {
  const { id } = req.body;
  User.deleteStudent(id, (err) => {
    if (err) return res.redirect('/students?notif=Error deleting student&notif_type=error');
    res.redirect('/students?notif=Student deleted successfully');
  });
};
