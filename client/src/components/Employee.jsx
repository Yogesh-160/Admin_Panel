import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

const Employee = ({ employee, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{employee.employee_id}</TableCell>
      <TableCell>{employee.name}</TableCell>
      <TableCell>{employee.position}</TableCell>
      <TableCell>{employee.salary}</TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => onDelete(employee.employee_id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Employee;
