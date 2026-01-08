import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployees } from '../contexts/EmployeeContext';
import type { EmployeeFormData } from '../types/employee';
import { indianStates } from '../utils/states';

export const EmployeeForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addEmployee, updateEmployee, getEmployeeById } = useEmployees();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<EmployeeFormData>({
    fullName: '',
    gender: 'Male',
    dateOfBirth: '',
    profileImage: '',
    state: '',
    isActive: true,
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      const employee = getEmployeeById(id);
      if (employee) {
        setFormData({
          fullName: employee.fullName,
          gender: employee.gender,
          dateOfBirth: employee.dateOfBirth,
          profileImage: employee.profileImage,
          state: employee.state,
          isActive: employee.isActive,
        });
        setImagePreview(employee.profileImage);
      }
    }
  }, [id, isEditMode, getEmployeeById]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18 || age > 100) {
        newErrors.dateOfBirth = 'Employee must be between 18 and 100 years old';
      }
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profileImage: 'Image size should be less than 5MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, profileImage: result });
        setErrors({ ...errors, profileImage: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditMode && id) {
      updateEmployee(id, formData);
    } else {
      addEmployee(formData);
    }

    navigate('/dashboard');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData({ ...formData, [name]: newValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-app py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-bg-card border border-border rounded-lg shadow-card p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-text-primary">{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h1>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="bg-secondary border-2 border-secondary-border text-secondary-border hover:bg-secondary-hover px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-bg-card border border-border rounded-lg shadow-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-text-primary mb-2">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-all duration-200 bg-bg-card placeholder:text-text-muted text-text-primary"
              />
              {errors.fullName && <span className="text-danger text-sm mt-1 block">{errors.fullName}</span>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-text-primary mb-2">
                Gender <span className="text-danger">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus bg-bg-card transition-all duration-200 text-text-primary"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-text-primary mb-2">
                Date of Birth <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-all duration-200 bg-bg-card"
              />
              {errors.dateOfBirth && <span className="text-danger text-sm mt-1 block">{errors.dateOfBirth}</span>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-text-primary mb-2">
                State <span className="text-danger">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus bg-bg-card transition-all duration-200 text-text-primary"
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <span className="text-danger text-sm mt-1 block">{errors.state}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Status <span className="text-danger">*</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="relative inline-block w-12 h-6 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <span className="absolute inset-0 bg-inactive-track rounded-full transition-colors duration-200 peer-checked:bg-active opacity-100"></span>
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-6 shadow-sm opacity-100"></span>
                </label>
                <span className="text-sm font-medium text-text-primary">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="profileImage" className="block text-sm font-semibold text-text-primary mb-2">
                Profile Image <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary-hover transition-all duration-200"
              />
              {errors.profileImage && <span className="text-danger text-sm mt-1 block">{errors.profileImage}</span>}
              
              {imagePreview && (
                <div className="mt-4 flex justify-center">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-lg object-cover border-2 border-border" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-8">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')} 
              className="px-6 py-2.5 border-2 border-input text-text-secondary hover:border-text-secondary hover:bg-table-hover rounded-lg font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isEditMode ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
