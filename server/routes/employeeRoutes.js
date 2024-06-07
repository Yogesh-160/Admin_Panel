const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.js');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    employee_id: req.body.employee_id,
    name: req.body.name,
    position: req.body.position,
    salary: req.body.salary,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get an employee by ID
router.get('/:id', getEmployee, (req, res) => {
  res.json(res.employee);
});

// Update an employee
router.patch('/:id', getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }
  if (req.body.position != null) {
    res.employee.position = req.body.position;
  }
  if (req.body.salary != null) {
    res.employee.salary = req.body.salary;
  }
  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an employee
router.delete('/:id', getEmployee, async (req, res) => {
    try {
      await res.employee.remove();
      res.json({ message: 'Employee deleted' });
    } catch (err) {
      console.error(err); // Log the error to the console for debugging
      res.status(500).json({ message: 'An error occurred while deleting the employee' });
    }
  });

// Middleware to get employee by ID
async function getEmployee(req, res, next) {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.employee = employee;
  next();
}

module.exports = router;
