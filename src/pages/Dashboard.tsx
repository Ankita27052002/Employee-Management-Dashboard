import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../contexts/EmployeeContext';
import { useAuth } from '../contexts/AuthContext';
import type { Employee } from '../types/employee';

export const Dashboard = () => {
  const { employees, deleteEmployee, updateEmployee } = useEmployees();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

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

  const visibleEmployees = useMemo(() => {
    return filteredEmployees.slice(0, visibleCount);
  }, [filteredEmployees, visibleCount]);

  const hasMore = filteredEmployees.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

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
    <div className="min-h-screen bg-page-bg">
      <header className="bg-header-bg text-header-text shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Employee Management Dashboard</h1>
          <button 
            onClick={logout} 
            className="bg-transparent hover:bg-header-logoutHover text-header-text px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:hidden">
          <div className="bg-card-bg border border-card-border rounded-lg p-6 shadow-sm h-full">
            <div className="text-4xl font-bold text-stat-label mb-2">{totalEmployees}</div>
            <div className="text-stat-label text-sm uppercase tracking-wide">Total Employees</div>
          </div>
          <div className="bg-card-bg border border-card-border rounded-lg p-6 shadow-sm border-l-4 border-l-stat-activeBorder h-full">
            <div className="text-4xl font-bold text-stat-activeNumber mb-2">{activeEmployees}</div>
            <div className="text-stat-label text-sm uppercase tracking-wide">Active</div>
          </div>
          <div className="bg-card-bg border border-card-border rounded-lg p-6 shadow-sm h-full">
            <div className="text-4xl font-bold text-stat-label mb-2">{inactiveEmployees}</div>
            <div className="text-stat-label text-sm uppercase tracking-wide">Inactive</div>
          </div>
        </div>

        <div className="bg-card-bg border border-card-border rounded-lg p-6 mb-6 print:hidden">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent bg-input-bg placeholder:text-input-placeholder"
              />
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-4 py-2.5 border border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent bg-input-bg"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent bg-input-bg"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <button 
                onClick={handlePrint} 
                className="flex-1 lg:flex-none bg-card-bg border border-button-secondary text-button-secondary hover:bg-button-secondaryHover px-6 py-2.5 rounded-lg transition-colors duration-200 font-medium"
              >
                Print List
              </button>
              <button 
                onClick={() => navigate('/employee/add')} 
                className="flex-1 lg:flex-none bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg transition-colors duration-200 font-medium"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="bg-card-bg border border-card-border rounded-lg p-12 text-center">
            <p className="text-stat-label text-lg">No employees found</p>
          </div>
        ) : (
          <div className="bg-card-bg border border-card-border rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-table-headerBg border-b border-card-border">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-table-headerText uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-table-headerText uppercase tracking-wider">Profile</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-table-headerText uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-table-headerText uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-table-headerText uppercase tracking-wider">Date of Birth</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-table-headerText uppercase tracking-wider">State</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-table-headerText uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-table-headerText uppercase tracking-wider print:hidden">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  {visibleEmployees.map((emp) => (
                    <tr key={emp.id} className={`${emp.isActive ? 'bg-table-activeBg' : 'bg-card-bg'} hover:bg-table-hover transition-colors duration-150`}>
                      <td className="px-6 py-4 text-sm text-stat-label">{emp.id}</td>
                      <td className="px-6 py-4">
                        <img
                          src={emp.profileImage}
                          alt={emp.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-card-border"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-stat-label">{emp.fullName}</td>
                      <td className="px-6 py-4 text-sm text-stat-label">{emp.gender}</td>
                      <td className="px-6 py-4 text-sm text-stat-label">{formatDate(emp.dateOfBirth)}</td>
                      <td className="px-6 py-4 text-sm text-stat-label">{emp.state}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 min-h-[32px]">
                          <label className="relative inline-block w-12 h-6 cursor-pointer flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={emp.isActive}
                              onChange={() => handleToggleStatus(emp)}
                              className="sr-only peer"
                            />
                            <span className={`absolute inset-0 rounded-full transition-colors duration-200 ${emp.isActive ? 'bg-status-active' : 'bg-status-inactiveTrack'}`}></span>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-6"></span>
                          </label>
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap min-w-[70px] text-center ${emp.isActive ? 'bg-status-activePill text-status-activeText' : 'bg-status-inactivePill text-status-inactiveText'}`}>
                            {emp.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 print:hidden">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/employee/edit/${emp.id}`)}
                            className="bg-button-edit hover:bg-button-editHover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-w-[70px] h-[36px]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(emp.id)}
                            className="bg-button-delete hover:bg-button-deleteHover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-w-[70px] h-[36px]"
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
          </div>
        )}

        {filteredEmployees.length > 0 && hasMore && (
          <div className="flex justify-center mt-6 print:hidden">
            <button
              onClick={handleLoadMore}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              Load More ({filteredEmployees.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-card-bg rounded-lg p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold text-stat-label mb-4">Confirm Delete</h2>
            <p className="text-input-placeholder mb-6">Are you sure you want to delete this employee?</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="px-6 py-2 border border-card-border text-stat-label hover:bg-table-hover rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-6 py-2 bg-button-delete hover:bg-button-deleteHover text-white rounded-lg font-medium transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
