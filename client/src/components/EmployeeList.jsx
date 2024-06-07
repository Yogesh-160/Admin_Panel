import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box } from '@mui/material';
import employeeService from '../services/employeeService';
import Employee from './Employee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [employees, nameFilter, salaryFilter]);

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
      setError('Error loading employees. Please try again.');
    }
  };

  const filterEmployees = () => {
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      employee.salary.toString().includes(salaryFilter)
    );
    setFilteredEmployees(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await employeeService.deleteEmployee(id);
      setEmployees(employees.filter(employee => employee.employee_id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('You are not authorized to access or delete this task!!');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Employee List
      </Typography>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          margin="normal"
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Filter by salary"
          value={salaryFilter}
          onChange={(e) => setSalaryFilter(e.target.value)}
          margin="normal"
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={filterEmployees} sx={{ height: '100%' }}>
          Filter
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map(employee => (
              <Employee key={employee.employee_id} employee={employee} onDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;
