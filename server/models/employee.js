const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employee_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
