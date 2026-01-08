# Employee Management Dashboard

A modern, full-featured Employee Management Dashboard built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing employee data with authentication, CRUD operations, advanced search/filter capabilities, pagination, and print functionality.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-cyan)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation--setup)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Design Decisions](#-design-decisions--assumptions)
- [Future Enhancements](#-future-enhancements)

---

## 🎯 Overview

This Employee Management Dashboard is a complete web application designed for managing employee records efficiently. It demonstrates modern React development practices, TypeScript implementation, responsive design principles, and comprehensive state management using Context API.

**Key Highlights:**
- 🔐 Secure authentication with protected routes
- 📊 Real-time employee statistics dashboard
- ✏️ Full CRUD operations (Create, Read, Update, Delete)
- 🔍 Advanced search and multi-filter capabilities
- 📄 Load More pagination for optimal performance
- 🖨️ Print-optimized employee list
- 📱 Fully responsive design
- 💾 Persistent data storage using localStorage

---

## ✨ Features

### 🔐 Authentication
- **Login Page**: Clean, modern login interface
- **Mock Authentication**: Username: `admin` / Password: `admin123`
- **Protected Routes**: Automatic redirect to login for unauthorized access
- **Session Persistence**: Login state saved across browser sessions

### 📊 Dashboard
- **Employee Statistics**: 
  - Total employee count
  - Active employees count with green accent
  - Inactive employees count
- **Employee Table**: Comprehensive table with sortable data
  - Employee ID
  - Profile Image (auto-generated avatars)
  - Full Name
  - Gender
  - Date of Birth (formatted)
  - State (Indian states)
  - Status toggle (Active/Inactive)
  - Action buttons (Edit/Delete)
- **Visual Differentiation**: Active and inactive employees have different row backgrounds

### ➕ Employee Management
- **Add Employee**: 
  - Form with all required fields
  - Image upload with instant preview
  - Comprehensive validation
- **Edit Employee**: 
  - Pre-filled form with existing data
  - Update functionality with validation
- **Delete Employee**: 
  - Confirmation modal to prevent accidental deletion
  - Instant removal from list

### 🔍 Search & Filter
- **Search by Name**: Real-time, case-insensitive search
- **Filter by Gender**: All / Male / Female / Other
- **Filter by Status**: All / Active / Inactive
- **Combined Filtering**: All filters work together seamlessly

### 📄 Additional Features
- **Load More Pagination**: Display 10 employees initially, load 10 more on click
- **Print Functionality**: Print-optimized layout removing UI controls
- **Form Validation**: 
  - Full name: Required, minimum 2 characters
  - DOB: Required, age between 18-100 years
  - State: Required selection
  - Image: Required, maximum 5MB
- **Image Preview**: Live preview before saving
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - Modern UI library with hooks
- **TypeScript** 5.9.3 - Type-safe JavaScript
- **Tailwind CSS** 3.x - Utility-first CSS framework
- **React Router DOM** 7.x - Client-side routing
- **Vite** 7.2.4 - Fast build tool and dev server

### State Management
- **React Context API** - Global state management
- **React Hooks** - useState, useEffect, useMemo, useContext

### Storage
- **localStorage** - Persistent browser storage for employee data and auth state

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Type checking
- **PostCSS** - CSS processing
- **Git** - Version control

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone Repository
```bash
git clone https://github.com/Ankita27052002/Employee-Management-Dashboard.git
cd Employee-Management-Dashboard
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or next available port)

### Step 4: Build for Production
```bash
npm run build
```

### Step 5: Preview Production Build
```bash
npm run preview
```

---

## 📖 Usage

### Login
1. Navigate to the application URL
2. You'll be redirected to the login page
3. Enter credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
4. Click **Sign In**

### Dashboard
- View employee statistics at the top
- Browse employee list in the table
- Use search bar to find employees by name
- Apply filters for gender and status
- Click **Load More** to view additional employees

### Add Employee
1. Click **Add Employee** button
2. Fill in all required fields:
   - Full Name
   - Gender (dropdown)
   - Date of Birth (date picker)
   - State (dropdown)
   - Status (toggle)
   - Profile Image (file upload)
3. Preview uploaded image
4. Click **Add Employee** to save

### Edit Employee
1. Click **Edit** button on any employee row
2. Modify desired fields
3. Click **Update Employee** to save changes

### Delete Employee
1. Click **Delete** button on any employee row
2. Confirm deletion in the modal dialog
3. Employee will be removed permanently

### Search & Filter
- **Search**: Type in the search box to filter by name
- **Gender Filter**: Select from dropdown (All/Male/Female/Other)
- **Status Filter**: Select from dropdown (All/Active/Inactive)
- All filters work simultaneously

### Print
1. Click **Print List** button
2. Browser print dialog will open
3. Choose printer or save as PDF

### Toggle Status
- Click the toggle switch in the Status column
- Employee status updates instantly
- Row background color changes based on status

---

## 📁 Project Structure

```
Employee-Management-Dashboard/
├── src/
│   ├── components/              # Reusable components
│   │   └── ProtectedRoute.tsx   # Route protection HOC
│   │
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── EmployeeContext.tsx  # Employee data management
│   │
│   ├── pages/                   # Page components
│   │   ├── Login.tsx            # Login page
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   └── EmployeeForm.tsx     # Add/Edit employee form
│   │
│   ├── types/                   # TypeScript definitions
│   │   └── employee.ts          # Employee interface
│   │
│   ├── utils/                   # Utility functions
│   │   └── states.ts            # Indian states list
│   │
│   ├── App.tsx                  # Main app component with routes
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
│
├── public/                      # Static assets
├── .vscode/                     # VS Code settings
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind CSS config
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

### Key Files Explained

- **`AuthContext.tsx`**: Manages login/logout state and session persistence
- **`EmployeeContext.tsx`**: Handles CRUD operations and data persistence
- **`ProtectedRoute.tsx`**: Guards routes requiring authentication
- **`Dashboard.tsx`**: Main page with stats, table, search, and filters
- **`EmployeeForm.tsx`**: Reusable form for Add and Edit operations
- **`tailwind.config.js`**: Custom color palette and theme configuration

---

## 🎨 Design Decisions & Assumptions

### Technical Choices

**1. React Context API over Redux**
- Sufficient for application scope
- Simpler setup and maintenance
- No need for additional dependencies
- Perfect for small to medium-scale state management

**2. TypeScript Implementation**
- Full type safety across the application
- Better IDE support and autocomplete
- Catches errors during development
- Improved code documentation

**3. Tailwind CSS Framework**
- Rapid development with utility classes
- Consistent design system
- Built-in responsiveness
- Smaller bundle size than traditional CSS
- Custom color palette for brand identity

**4. localStorage for Data Persistence**
- No backend required for demo
- Instant data access
- Works offline
- Simple implementation
- Ideal for mock data scenario

**5. Vite as Build Tool**
- Lightning-fast hot module replacement (HMR)
- Optimized production builds
- Native ES modules support
- Better developer experience than Webpack

### UI/UX Decisions

**1. Earthy Color Palette**
- **Page Background**: #FDFBD4 (warm cream)
- **Primary Actions**: #6B8E23 (olive green)
- **Header**: #545333 (neutral olive)
- **Cards**: #FFFFFF (white)
- **Borders**: #E3E1C8 (soft beige)

*Rationale*: Warm, professional colors create a welcoming, trustworthy interface. Green used strategically for positive actions (Add, Active status).

**2. Visual Hierarchy**
- Active stat card has green left border for emphasis
- Active employees have subtle background tint (#F8F8EA)
- Inactive employees have white background
- Clear button color coding: Green (Add), Gray (Edit), Red (Delete)

**3. Load More Pagination**
- Shows 10 employees initially
- Prevents performance issues with large datasets
- Better user experience than infinite scroll
- Shows remaining count for transparency

**4. Confirmation Dialogs**
- Delete requires explicit confirmation
- Prevents accidental data loss
- Clear Cancel/Delete options

**5. Form Design**
- Image upload with instant preview
- Real-time validation feedback
- Clear error messages
- Consistent input styling

### Assumptions

1. **Authentication**: Mock authentication is acceptable (admin/admin123 hardcoded)
2. **Geography**: Indian states dropdown as per assignment context
3. **Age Range**: Employees must be 18-100 years old
4. **Image Size**: Profile images limited to 5MB for performance
5. **Browser Support**: Modern browsers with ES6+ and localStorage support
6. **Initial Data**: 15 sample employees provided for demonstration
7. **Network**: Application works completely offline (no API calls)
8. **Session**: Login persists until explicit logout

---

## 📊 Employee Data Model

```typescript
interface Employee {
  id: string;                    // Unique identifier
  fullName: string;              // Employee full name
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;           // ISO date format
  profileImage: string;          // Base64 or URL
  state: string;                 // Indian state
  isActive: boolean;             // Active/Inactive status
}
```

---

## 🔄 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

---

## 🚦 Features Checklist

### Core Features
- ✅ Login page with authentication
- ✅ Protected dashboard route
- ✅ Employee statistics (Total, Active, Inactive)
- ✅ Employee list table with all columns
- ✅ Add employee functionality
- ✅ Edit employee functionality
- ✅ Delete employee with confirmation
- ✅ Search by name
- ✅ Filter by gender
- ✅ Filter by status
- ✅ Combined filtering
- ✅ Print functionality
- ✅ Form validation
- ✅ Image upload with preview
- ✅ Active/Inactive toggle
- ✅ Responsive design

### Bonus Features
- ✅ Load More pagination
- ✅ Row differentiation by status
- ✅ Real-time search
- ✅ Auto-generated avatars
- ✅ Professional color scheme
- ✅ Smooth animations
- ✅ Empty state handling
- ✅ Hover effects
- ✅ TypeScript type safety

---

## 🌟 Future Enhancements

### Backend Integration
- REST API integration
- Database persistence (MongoDB, PostgreSQL)
- JWT-based authentication
- File upload to cloud storage (AWS S3, Cloudinary)

### Advanced Features
- Employee profile detail page
- Advanced analytics dashboard
- Export to CSV/Excel/PDF
- Bulk employee operations
- Employee search by multiple fields
- Sorting by column headers
- Department/role management
- Attendance tracking
- Salary management

### UI/UX Improvements
- Dark mode toggle
- Customizable themes
- Advanced data visualization (charts, graphs)
- Drag-and-drop image upload
- Keyboard shortcuts
- Toast notifications
- Loading skeletons

### Technical Improvements
- Unit testing (Jest, React Testing Library)
- E2E testing (Cypress, Playwright)
- CI/CD pipeline
- Docker containerization
- PWA capabilities
- Internationalization (i18n)
- Accessibility improvements (WCAG compliance)

---

## 🐛 Known Issues

No known issues at this time. If you encounter any bugs, please open an issue on GitHub.

---

## 📝 License

This project was created as part of a React.js assignment for educational purposes.

---

## 👤 Author

**Ankita**
- GitHub: [@Ankita27052002](https://github.com/Ankita27052002)
- Repository: [Employee-Management-Dashboard](https://github.com/Ankita27052002/Employee-Management-Dashboard)

---

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the blazing-fast build tool
- UI Avatars API for avatar generation
- The open-source community

---

## 📧 Support

For questions or support, please open an issue in the GitHub repository.

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**
