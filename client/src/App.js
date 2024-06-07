import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Employee Admin Panel
            </Typography>
            <Button color="inherit" component={Link} to="/">Add Employee</Button>
            <Button color="inherit" component={Link} to="/list">Employee List</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<AddEmployee />} />
          <Route path="/list" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
