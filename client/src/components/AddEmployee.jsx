import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import employeeService from '../services/employeeService';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    employee_id: '',
    name: '',
    position: '',
    salary: ''
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await employeeService.addEmployee(employee);
    alert('Employee added successfully');
    setEmployee({ employee_id: '', name: '', position: '', salary: '' });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID"
            type="number"
            name="employee_id"
            value={employee.employee_id}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Position"
            name="position"
            value={employee.position}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Salary"
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Employee
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddEmployee;
