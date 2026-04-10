import React, { useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from './services/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
        setEditingEmployee(null);
      } else {
        await addEmployee(formData);
      }
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => setEditingEmployee(employee);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      if (editingEmployee && editingEmployee.id === id) {
        setEditingEmployee(null);
      }
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Employee Management System</h1>
        <p>Frontend: ReactJS | Backend: Spring Boot JPA</p>
      </header>
      <div className="content-grid">
        <EmployeeForm onSubmit={handleSubmit} editingEmployee={editingEmployee} onCancel={() => setEditingEmployee(null)} />
        <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
