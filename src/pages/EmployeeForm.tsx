import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployees } from '../contexts/EmployeeContext';
import type { EmployeeFormData } from '../types/employee';
import { indianStates } from '../utils/states';
import '../styles/EmployeeForm.css';

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
    <div className="form-container">
      <div className="form-header">
        <h1>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h1>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">
              Gender <span className="required">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">
              Date of Birth <span className="required">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="state">
              State <span className="required">*</span>
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <span className="error">{errors.state}</span>}
          </div>

          <div className="form-group">
            <label>
              Status <span className="required">*</span>
            </label>
            <div className="status-toggle">
              <label className="toggle-container">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className="status-label">
                {formData.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="profileImage">
              Profile Image <span className="required">*</span>
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.profileImage && <span className="error">{errors.profileImage}</span>}
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/dashboard')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {isEditMode ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};
