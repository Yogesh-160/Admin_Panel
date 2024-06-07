import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addEmployee = async (employee) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const employeeService = {
  getEmployees,
  addEmployee,
  deleteEmployee,
};

export default employeeService;
