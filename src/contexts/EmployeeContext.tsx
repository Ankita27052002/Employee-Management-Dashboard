import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Employee, EmployeeFormData } from '../types/employee';

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: EmployeeFormData) => void;
  updateEmployee: (id: string, employee: EmployeeFormData) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const STORAGE_KEY = 'employees_data';

const initialEmployees: Employee[] = [
  {
    id: '1',
    fullName: 'John Doe',
    gender: 'Male',
    dateOfBirth: '1990-05-15',
    profileImage: 'https://via.placeholder.com/100',
    state: 'Maharashtra',
    isActive: true,
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    gender: 'Female',
    dateOfBirth: '1992-08-22',
    profileImage: 'https://via.placeholder.com/100',
    state: 'Karnataka',
    isActive: true,
  },
  {
    id: '3',
    fullName: 'Mike Johnson',
    gender: 'Male',
    dateOfBirth: '1988-03-10',
    profileImage: 'https://via.placeholder.com/100',
    state: 'Delhi',
    isActive: false,
  },
];

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialEmployees;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employeeData: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, employeeData: EmployeeFormData) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...employeeData, id } : emp
      )
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const getEmployeeById = (id: string) => {
    return employees.find((emp) => emp.id === id);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider');
  }
  return context;
};
