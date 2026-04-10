import React, { useEffect, useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  department: ''
};

function EmployeeForm({ onSubmit, editingEmployee, onCancel }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name || '',
        email: editingEmployee.email || '',
        department: editingEmployee.department || ''
      });
    } else {
      setForm(initialForm);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    if (!editingEmployee) {
      setForm(initialForm);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{editingEmployee ? 'Update Employee' : 'Add Employee'}</h2>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter employee name" required />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter employee email" required />
      <input type="text" name="department" value={form.department} onChange={handleChange} placeholder="Enter department" required />
      <div className="button-row">
        <button type="submit">{editingEmployee ? 'Update' : 'Add'}</button>
        {editingEmployee && (
          <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
