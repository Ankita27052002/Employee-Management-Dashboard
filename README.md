# Employee Management Dashboard

A modern, feature-rich Employee Management Dashboard built with React and TypeScript. This application provides a comprehensive solution for managing employee data with authentication, CRUD operations, search/filter capabilities, and print functionality.

## 🚀 Features

### Authentication
- Secure login page with mock authentication
- Protected routes - dashboard access only after login
- Session persistence using localStorage
- **Default Credentials:** `admin` / `admin123`

### Dashboard
- **Employee Statistics**: Display total, active, and inactive employee counts
- **Employee List**: Interactive table displaying all employee information
- **Real-time Status Toggle**: Quickly activate/deactivate employees
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Employee Management
- **Add Employee**: Create new employee records with comprehensive form
- **Edit Employee**: Update existing employee information
- **Delete Employee**: Remove employees with confirmation dialog
- **Form Validation**: Comprehensive validation for all fields
- **Image Upload**: Profile image upload with instant preview

### Search & Filter
- **Search**: Find employees by name (real-time search)
- **Gender Filter**: Filter by Male, Female, or Other
- **Status Filter**: Filter by Active or Inactive status
- **Combined Filtering**: All filters work together seamlessly

### Print Functionality
- Print employee list with a single click
- Print-optimized layout (removes unnecessary UI elements)
- Professional formatting for printed output

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.x
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **Styling**: Pure CSS with CSS Variables
- **Development**: ESLint for code quality

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EMPDash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Login with: `admin` / `admin123`

## 📁 Project Structure

```
EMPDash/
├── src/
│   ├── components/          # Reusable components
│   │   └── ProtectedRoute.tsx
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── EmployeeContext.tsx
│   ├── pages/               # Main page components
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── EmployeeForm.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── employee.ts
│   ├── utils/               # Utility functions and constants
│   │   └── states.ts
│   ├── styles/              # CSS stylesheets
│   │   ├── Login.css
│   │   ├── Dashboard.css
│   │   └── EmployeeForm.css
│   ├── App.tsx              # Main app component with routing
│   ├── App.css              # Global app styles
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global CSS variables and resets
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 💡 Key Features Implementation

### Form Validation
- Full name: Required, minimum 2 characters
- Date of Birth: Required, age must be between 18-100 years
- State: Required, dropdown selection from Indian states
- Profile Image: Required, max size 5MB
- Gender: Required, dropdown (Male/Female/Other)
- Status: Active/Inactive toggle

### Data Persistence
- All employee data stored in localStorage
- Authentication state persisted across sessions
- Initial seed data with 3 sample employees

### UI/UX Highlights
- Clean, modern interface with professional color scheme
- Smooth transitions and hover effects
- Loading states handled gracefully
- Empty state messaging when no employees found
- Confirmation dialogs for destructive actions
- Print-friendly layout

## 🎨 Design Decisions

1. **Context API over Redux**: Chosen for simplicity and sufficient for this scope
2. **localStorage**: Simple, effective data persistence without backend
3. **CSS Variables**: Consistent theming and easy maintenance
4. **Component Separation**: Clear separation of concerns for maintainability
5. **Type Safety**: Full TypeScript implementation for robust code
6. **Responsive Design**: Mobile-first approach with flexbox/grid

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Tablet: 768px
- Mobile: < 768px

## 🔐 Authentication Flow

1. User navigates to app (redirects to `/login` if not authenticated)
2. Enter credentials (admin / admin123)
3. On success, redirected to `/dashboard`
4. Protected routes check authentication status
5. Logout clears session and returns to login

## 📊 Employee Data Model

```typescript
interface Employee {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  profileImage: string;
  state: string;
  isActive: boolean;
}
```

## 🖨️ Print Functionality

- Uses CSS `@media print` queries
- Hides non-essential elements (buttons, filters, etc.)
- Optimized table layout for printing
- Accessible via "Print List" button in dashboard

## 🔄 State Management

### AuthContext
- Manages authentication state
- Provides login/logout functions
- Persists auth status to localStorage

### EmployeeContext
- Manages employee data
- CRUD operations (Create, Read, Update, Delete)
- Data persistence to localStorage
- Initial seed data for demo

## 🌟 Future Enhancements

- Backend API integration
- Advanced filtering options
- Employee profile details page
- Export to CSV/Excel
- Bulk operations
- Employee activity logs
- Role-based access control

## 🐛 Known Issues

None at the moment. Report issues via GitHub Issues.

## 📝 License

This project is for educational/assignment purposes.

## 👤 Author

Created as part of React.js assignment - Employee Management Dashboard

---

**Note**: This application uses mock authentication and localStorage for data persistence. In a production environment, implement proper backend authentication and database storage.

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
