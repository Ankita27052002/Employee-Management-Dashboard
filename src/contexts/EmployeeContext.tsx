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
    profileImage: 'https://ui-avatars.com/api/?name=John+Doe&background=6B8E23&color=fff&size=150',
    state: 'Maharashtra',
    isActive: true,
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    gender: 'Female',
    dateOfBirth: '1992-08-22',
    profileImage: 'https://ui-avatars.com/api/?name=Jane+Smith&background=7A7965&color=fff&size=150',
    state: 'Karnataka',
    isActive: false,
  },
  {
    id: '3',
    fullName: 'Mike Johnson',
    gender: 'Male',
    dateOfBirth: '1988-03-10',
    profileImage: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=6B8E23&color=fff&size=150',
    state: 'Delhi',
    isActive: true,
  },
  {
    id: '4',
    fullName: 'Sarah Williams',
    gender: 'Female',
    dateOfBirth: '1995-12-03',
    profileImage: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=B0483E&color=fff&size=150',
    state: 'Tamil Nadu',
    isActive: true,
  },
  {
    id: '5',
    fullName: 'Robert Brown',
    gender: 'Male',
    dateOfBirth: '1985-07-18',
    profileImage: 'https://ui-avatars.com/api/?name=Robert+Brown&background=545333&color=fff&size=150',
    state: 'Gujarat',
    isActive: true,
  },
  {
    id: '6',
    fullName: 'Emily Davis',
    gender: 'Female',
    dateOfBirth: '1993-11-25',
    profileImage: 'https://ui-avatars.com/api/?name=Emily+Davis&background=7A7965&color=fff&size=150',
    state: 'West Bengal',
    isActive: false,
  },
  {
    id: '7',
    fullName: 'David Wilson',
    gender: 'Male',
    dateOfBirth: '1987-04-09',
    profileImage: 'https://ui-avatars.com/api/?name=David+Wilson&background=6B8E23&color=fff&size=150',
    state: 'Rajasthan',
    isActive: true,
  },
  {
    id: '8',
    fullName: 'Lisa Anderson',
    gender: 'Female',
    dateOfBirth: '1991-09-14',
    profileImage: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=B0483E&color=fff&size=150',
    state: 'Uttar Pradesh',
    isActive: true,
  },
  {
    id: '9',
    fullName: 'James Taylor',
    gender: 'Male',
    dateOfBirth: '1989-02-27',
    profileImage: 'https://ui-avatars.com/api/?name=James+Taylor&background=545333&color=fff&size=150',
    state: 'Punjab',
    isActive: false,
  },
  {
    id: '10',
    fullName: 'Maria Garcia',
    gender: 'Female',
    dateOfBirth: '1994-06-30',
    profileImage: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=7A7965&color=fff&size=150',
    state: 'Madhya Pradesh',
    isActive: true,
  },
  {
    id: '11',
    fullName: 'Christopher Martinez',
    gender: 'Male',
    dateOfBirth: '1986-10-12',
    profileImage: 'https://ui-avatars.com/api/?name=Christopher+Martinez&background=6B8E23&color=fff&size=150',
    state: 'Haryana',
    isActive: true,
  },
  {
    id: '12',
    fullName: 'Patricia Rodriguez',
    gender: 'Female',
    dateOfBirth: '1990-01-19',
    profileImage: 'https://ui-avatars.com/api/?name=Patricia+Rodriguez&background=B0483E&color=fff&size=150',
    state: 'Bihar',
    isActive: false,
  },
  {
    id: '13',
    fullName: 'Daniel Lopez',
    gender: 'Male',
    dateOfBirth: '1992-05-08',
    profileImage: 'https://ui-avatars.com/api/?name=Daniel+Lopez&background=545333&color=fff&size=150',
    state: 'Odisha',
    isActive: true,
  },
  {
    id: '14',
    fullName: 'Jennifer Lee',
    gender: 'Female',
    dateOfBirth: '1988-08-21',
    profileImage: 'https://ui-avatars.com/api/?name=Jennifer+Lee&background=7A7965&color=fff&size=150',
    state: 'Kerala',
    isActive: true,
  },
  {
    id: '15',
    fullName: 'Matthew Gonzalez',
    gender: 'Male',
    dateOfBirth: '1991-12-17',
    profileImage: 'https://ui-avatars.com/api/?name=Matthew+Gonzalez&background=6B8E23&color=fff&size=150',
    state: 'Telangana',
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
