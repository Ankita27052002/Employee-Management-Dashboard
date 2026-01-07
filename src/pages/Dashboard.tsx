import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../contexts/EmployeeContext';
import { useAuth } from '../contexts/AuthContext';
import type { Employee } from '../types/employee';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  const { employees, deleteEmployee, updateEmployee } = useEmployees();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = genderFilter === 'All' || emp.gender === genderFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && emp.isActive) ||
        (statusFilter === 'Inactive' && !emp.isActive);
      
      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchTerm, genderFilter, statusFilter]);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.isActive).length;
  const inactiveEmployees = employees.filter((emp) => !emp.isActive).length;

  const handleToggleStatus = (emp: Employee) => {
    updateEmployee(emp.id, { ...emp, isActive: !emp.isActive });
  };

  const handleDeleteClick = (id: string) => {
    setEmployeeToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete);
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header no-print">
        <div className="header-content">
          <h1>Employee Management Dashboard</h1>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-container no-print">
          <div className="stat-card">
            <div className="stat-value">{totalEmployees}</div>
            <div className="stat-label">Total Employees</div>
          </div>
          <div className="stat-card active">
            <div className="stat-value">{activeEmployees}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card inactive">
            <div className="stat-value">{inactiveEmployees}</div>
            <div className="stat-label">Inactive</div>
          </div>
        </div>

        <div className="controls-container no-print">
          <div className="search-filter-group">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="action-buttons">
            <button onClick={handlePrint} className="print-button">
              Print List
            </button>
            <button onClick={() => navigate('/employee/add')} className="add-button">
              Add Employee
            </button>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="empty-state">
            <p>No employees found</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Profile</th>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>State</th>
                  <th>Status</th>
                  <th className="no-print">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>
                      <img
                        src={emp.profileImage}
                        alt={emp.fullName}
                        className="profile-image"
                      />
                    </td>
                    <td>{emp.fullName}</td>
                    <td>{emp.gender}</td>
                    <td>{formatDate(emp.dateOfBirth)}</td>
                    <td>{emp.state}</td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={emp.isActive}
                          onChange={() => handleToggleStatus(emp)}
                        />
                        <span className="slider"></span>
                      </label>
                      <span className={`status-badge ${emp.isActive ? 'active' : 'inactive'}`}>
                        {emp.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="no-print">
                      <div className="action-buttons-cell">
                        <button
                          onClick={() => navigate(`/employee/edit/${emp.id}`)}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(emp.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay no-print">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="cancel-button">
                Cancel
              </button>
              <button onClick={confirmDelete} className="confirm-delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
