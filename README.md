# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.










# FinTrack - Personal Finance Dashboard

A modern, interactive personal finance dashboard built with React, Tailwind CSS, and Recharts. Track your income, expenses, and financial patterns with an intuitive interface featuring role-based access control, dark mode, and comprehensive analytics.

## 🎯 Overview

FinTrack is a frontend-focused finance dashboard that demonstrates solid UI/UX design principles, state management, and component architecture. It provides users with a clear view of their financial activity through interactive charts, transaction management, and actionable insights.

**Live Features:**
- Real-time financial summaries with trend indicators
- Interactive charts for balance trends and spending patterns
- Complete transaction management with filtering and sorting
- Role-based UI (Viewer vs Admin)
- Dark mode support
- Data persistence with localStorage
- Responsive design for all devices
- Financial insights and analysis

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.jsx                 # Main application component
├── main.jsx               # Entry point
├── index.css              # Global styles
├── contexts/
│   └── FinanceContext.jsx # Global state management using Context API
├── components/
│   ├── Header.jsx         # Top navigation with role switcher & dark mode
│   ├── SummaryCards.jsx   # Financial overview cards
│   ├── Charts.jsx         # Chart visualizations (Balance, Spending, Monthly)
│   ├── Transactions.jsx   # Transaction list with filters & sorting
│   ├── TransactionModal.jsx # Add/Edit transaction modal
│   └── Insights.jsx       # Financial insights and analysis
└── data/
    └── mockData.js        # Mock financial data

public/
├── index.html             # HTML entry point
└── vite.svg

vite.config.js            # Vite configuration
package.json              # Dependencies and scripts
```

## 🏗️ Architecture & Design Decisions

### State Management
**Technology: React Context API**

Global state is managed through `FinanceContext` which provides:
- **transactions**: Array of all transaction objects
- **filters**: Active filters for search, category, type, date range
- **userRole**: Current user role (Viewer or Admin)
- **darkMode**: Theme preference
- **actions**: Dispatch functions for state mutations

**Why Context API?**
- Lightweight for this use case
- No external dependencies needed
- Easy to understand and maintain
- Perfect for medium-complexity state management

### Component Architecture
Components are organized by feature and responsibility:

1. **Header** - Navigation, role switcher, dark mode toggle
2. **SummaryCards** - KPI displays with trend indicators
3. **Charts** - Recharts visualizations (Area, Donut, Bar charts)
4. **Transactions** - Table display with filtering, sorting, pagination
5. **TransactionModal** - Form for adding/editing transactions
6. **Insights** - Analytics and financial observations

Each component is self-contained, receives props, and communicates through context.

### Design Patterns Used

1. **Container/Presentational Pattern**: Separation of data logic and UI
2. **Context Provider Pattern**: Global state distribution
3. **Composition Pattern**: Reusable UI components
4. **Controlled Components**: Form inputs managed by state
5. **Custom Hooks Pattern**: Logic extraction (useFinance context)

## 🎨 UI/UX Features

### Responsive Design
- **Mobile First**: Optimized for small screens first
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Flexbox & Grid**: Flexible layouts that adapt
- **Touch-Friendly**: Adequate padding and clickable areas

### Dark Mode
- Full theme support across all components
- Toggle in header
- Persists to localStorage
- Smooth color transitions
- Accessible color contrasts

### Empty States
- Graceful handling when no transactions exist
- Clear messaging when filters return no results
- Helpful guidance for users

### Visual Feedback
- Hover effects on interactive elements
- Smooth transitions on state changes
- Loading-like states for interactions
- Color coding: Green (income), Red (expenses)
- Icons for visual clarity using Lucide Icons

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast
- Clear focus states

## 📊 Core Features

### 1. Dashboard Overview

#### Summary Cards
- **Total Balance**: Current total with balance change percentage
- **Total Income**: Monthly income with trend indicator
- **Total Expenses**: Monthly expenses with trend indicator
- **Savings Rate**: Percentage of income saved

Each card shows a trend indicator (↑ up, ↓ down) based on comparison with previous period.

#### Visualizations

**Balance Trend (Area Chart)**
- 6-month balance history
- Shows financial progression over time
- Helps identify spending patterns
- Interactive tooltips on hover

**Spending by Category (Donut Chart)**
- Breakdown of expenses by category
- Color-coded for quick identification
- Percentage labels
- Clickable legend

**Monthly Comparison (Bar Chart)**
- Income vs Expenses comparison
- Year-to-date view
- Side-by-side bar visualization
- Quick profitability assessment

### 2. Transactions Management

#### Transaction List
Displays all transactions with:
- **Date**: Transaction date
- **Description**: Transaction description/merchant
- **Category**: Spending category
- **Type**: Income or Expense
- **Amount**: Transaction amount (color-coded)

#### Filtering Options
- **Search**: Search by description (real-time)
- **Category**: Filter by spending category
- **Type**: Show only income, expenses, or all
- **Date Range**: Filter by start and end date
- **Clear Filters**: Reset all filters with one click

#### Sorting
- Click any column header to sort
- Toggle between ascending/descending
- Visual indicator shows active sort column
- Supports sorting by: Date, Description, Category, Amount

#### Pagination
- 10 transactions per page
- Navigate using Previous/Next buttons
- Shows current page and total entries
- Automatic reset to page 1 on filter change

#### Admin Features (When role = Admin)
- **Add Transaction**: Button to create new transactions
- **Edit Transaction**: Click row to edit any transaction
- **Delete Transaction**: Remove transactions from dashboard
- **Form Validation**: Prevents invalid entries

### 3. Role-Based Access Control (RBAC)

#### Viewer Role
- View all data and charts
- Read-only access
- Can filter and search
- Cannot modify data
- Typical for accountants, auditors, or read-only viewers

#### Admin Role
- Full data access
- Can add new transactions
- Can edit existing transactions
- Can delete transactions
- Can manage all aspects of the dashboard

#### Role Switcher
- Dropdown in header for quick role switching
- Shows current active role
- Changes persist to localStorage
- UI updates immediately

### 4. Insights Section

Displays actionable financial observations:

1. **Highest Spending Category**
   - Identifies the category with most expenses
   - Shows amount and percentage of total spending

2. **Monthly Comparison**
   - Current month vs previous month
   - Percentage change for income and expenses
   - Trends help identify spending changes

3. **Quick Stats**
   - Total number of transactions
   - Average transaction amount
   - Spending days per month

4. **Top 3 Spending Categories**
   - Progress bars showing proportional spending
   - Percentage breakdown
   - Easy visual comparison

5. **Financial Tips**
   - Dynamic suggestions based on spending patterns
   - Changes based on data and behavior
   - Helps users make better financial decisions

## 💾 Data Management

### Mock Data Structure

Each transaction object contains:
```javascript
{
  id: 1,
  date: "2024-01-15",
  description: "Grocery Store",
  category: "Food",
  type: "expense",
  amount: 45.50
}
```

### Data Persistence

- **localStorage**: All user data persists between sessions
- **Auto-save**: Changes are immediately saved
- **Keys stored**:
  - `financeTransactions`: Transaction data
  - `financeUserRole`: Selected role
  - `financeDarkMode`: Theme preference
  - `financeFilters`: Current filter state

### Starting Data

Dashboard comes pre-loaded with 30 sample transactions covering:
- Multiple expense categories: Food, Transport, Entertainment, Utilities, Shopping
- Multiple income transactions
- Data spanning 6 months for chart visualization
- Realistic amounts and descriptions

## 🎮 User Interactions

### Adding a Transaction (Admin Only)
1. Click "Add Transaction" button in header
2. Fill in the form:
   - Date: Transaction date
   - Description: Transaction description
   - Category: Select from dropdown
   - Type: Income or Expense
   - Amount: Transaction amount
3. Click "Add" to save
4. Modal closes and transaction appears in list

### Editing a Transaction (Admin Only)
1. Click on any transaction row
2. Modal opens with pre-filled data
3. Modify any field
4. Click "Update" to save changes
5. List updates immediately

### Deleting a Transaction (Admin Only)
1. Click delete icon (trash) in transaction row
2. Transaction is removed immediately
3. Charts and summaries update automatically

### Filtering Transactions
1. Use search box to find by description
2. Select category from dropdown
3. Choose type (Income/Expense/All)
4. Pick date range using date inputs
5. Click "Clear Filters" to reset all

### Sorting Transactions
1. Click any column header
2. First click sorts ascending
3. Second click sorts descending
4. Third click removes sort
5. Visual indicator shows active sort

### Switching Roles
1. Click role dropdown in header
2. Select "Admin" or "Viewer"
3. UI updates based on role
4. All changes persist to localStorage

### Dark Mode
1. Click moon/sun icon in header
2. Theme toggles immediately
3. Preference saved to localStorage
4. Applies to all components

## 🛠️ Technology Stack

### Core
- **React 18**: UI library and component framework
- **JavaScript (ES6+)**: No TypeScript, pure JavaScript
- **Vite**: Build tool and dev server (instant HMR)

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach

### Visualizations
- **Recharts**: React chart library for data visualization
- **Lucide Icons**: Beautiful SVG icons

### State Management
- **React Context API**: Built-in state management solution
- **localStorage API**: Client-side data persistence

## 📦 NPM Packages & Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^18.x | Core React library for building user interfaces |
| **react-dom** | ^18.x | React DOM rendering library |
| **recharts** | ^2.x | Composable charting library built on React components |
| **lucide-react** | ^latest | Beautiful, consistent SVG icons as React components |

#### Package Details:

**react@^18.x**
- Latest version of React framework
- Provides hooks, functional components, and state management
- Used for: Core application architecture, component lifecycle
- [Documentation](https://react.dev)

**react-dom@^18.x**
- React package for working with the DOM
- Enables rendering React components to the browser
- Used for: Mounting React app to index.html (#root element)
- [Documentation](https://react.dev/reference/react-dom)

**recharts@^2.x**
- Professional chart library built on React
- Supports Area, Bar, Donut, Line, and other chart types
- Used for: Balance trend chart, spending distribution, monthly comparison
- Features:
  - Responsive charts
  - Interactive tooltips
  - Legend support
  - Smooth animations
- [Documentation](https://recharts.org)
- Charts in this project:
  - Area Chart: 6-month balance history
  - Donut Chart: Spending breakdown by category
  - Bar Chart: Monthly income vs expenses comparison

**lucide-react@latest**
- Lightweight icon library with 400+ consistent SVG icons
- Built specifically for React
- Used for: Navigation icons, action buttons, visual indicators
- Icons used in this project:
  - `Menu`, `X`: Mobile navigation
  - `Sun`, `Moon`: Dark mode toggle
  - `Plus`, `Edit2`, `Trash2`: Transaction actions
  - `TrendingUp`, `TrendingDown`: Trend indicators
  - `LogOut`: Role switching
  - `AlertCircle`: Error/empty states
- [Documentation](https://lucide.dev)

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **vite** | ^4.x | Modern frontend build tool |
| **@vitejs/plugin-react** | ^4.x | Vite plugin for React |
| **tailwindcss** | ^3.x | Utility-first CSS framework |
| **postcss** | ^8.x | CSS transformation tool (required by Tailwind) |
| **autoprefixer** | ^10.x | PostCSS plugin for vendor prefixes |

#### Development Package Details:

**vite@^4.x**
- Fast build tool and development server
- Provides instant Hot Module Replacement (HMR)
- Used for: Development server (`npm run dev`) and production builds (`npm run build`)
- Configuration: `vite.config.js`
- [Documentation](https://vitejs.dev)

**@vitejs/plugin-react@^4.x**
- Official Vite plugin for React
- Enables JSX support and Fast Refresh
- Automatically detects and transforms React code
- [Documentation](https://github.com/vitejs/vite-plugin-react)

**tailwindcss@^3.x**
- Utility-first CSS framework
- Enables rapid UI development with pre-defined CSS classes
- Used for: All styling in the application
- Features used:
  - Responsive breakpoints (sm, md, lg, xl)
  - Dark mode with `dark:` prefix
  - Flexbox and Grid utilities
  - Color system for theme
  - Hover, focus, and transition utilities
- [Documentation](https://tailwindcss.com)

**postcss@^8.x**
- CSS transformation tool
- Required by Tailwind CSS for processing styles
- Configuration: Part of Tailwind setup
- [Documentation](https://postcss.org)

**autoprefixer@^10.x**
- PostCSS plugin that adds vendor prefixes
- Ensures CSS works across browsers
- Configuration: Included in PostCSS pipeline
- [Documentation](https://github.com/postcss/autoprefixer)

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src"
  }
}
```

**Script Descriptions:**

| Command | Purpose |
|---------|---------|
| `npm run dev` | Starts development server at http://localhost:5173 with hot reload |
| `npm run build` | Creates optimized production build in `dist/` folder |
| `npm run preview` | Preview production build locally before deployment |

### Installation Instructions

**Step 1: Install all dependencies**
```bash
npm install
```

This will install:
- React and React DOM from npm registry
- Recharts for chart visualizations
- Lucide React for icons
- Vite and plugins for build tooling
- Tailwind CSS and related packages

**Step 2: Verify Installation**
```bash
npm ls
```

Expected output should show:
```
├── react@18.x.x
├── react-dom@18.x.x
├── recharts@2.x.x
├── lucide-react@x.x.x
├── vite@4.x.x
├── @vitejs/plugin-react@4.x.x
├── tailwindcss@3.x.x
├── postcss@8.x.x
└── autoprefixer@10.x.x
```

### Dependency Tree & Relationships

```
FinTrack Dashboard
├── React 18 (Core)
│   ├── React DOM (Rendering)
│   ├── Recharts (Visualizations)
│   │   └── Depends on React
│   └── Lucide React (Icons)
│       └── Depends on React
├── Tailwind CSS (Styling)
│   ├── PostCSS (CSS Processing)
│   └── Autoprefixer (Browser Support)
└── Vite (Build Tool)
    ├── @vitejs/plugin-react (React Support)
    └── Vite Core
```

### Why These Packages?

**Chosen for:**
- ✅ **Lightweight**: Minimal bundle size, fast performance
- ✅ **React-First**: All packages are optimized for React
- ✅ **Active Maintenance**: Well-maintained by large communities
- ✅ **Documentation**: Excellent documentation available
- ✅ **Popular**: Industry-standard choices
- ✅ **No Complex Dependencies**: Clean dependency graph

### File Size Impact

Approximate bundle sizes (minified + gzipped):
- React: ~42KB
- Recharts: ~65KB
- Lucide React: ~5KB
- Tailwind CSS: ~20KB (with purging)
- **Total estimated**: ~132KB

### Updating Packages

To update all packages to latest versions:
```bash
npm update
```

To update a specific package:
```bash
npm install recharts@latest
```

To check for outdated packages:
```bash
npm outdated
```

### Compatibility Notes

- **Node.js**: Requires v14 or higher (v16+ recommended)
- **npm**: v6 or higher
- **Browsers**: Works on all modern browsers (ES6 support required)
- **React**: Application uses React 18 features

## 📱 Responsive Breakpoints

| Device | Width | Adjustments |
|--------|-------|-------------|
| Mobile | < 640px | Single column, stacked cards, full-width modals |
| Tablet | 640px - 1024px | Two columns, adjusted chart sizes |
| Desktop | > 1024px | Three+ columns, full layouts |

## 🔍 Features Walkthrough

### Dashboard View
1. Open the application
2. See summary cards at the top with current financial metrics
3. Below are three charts showing balance trends, spending distribution, and monthly comparison
4. Transactions list shows all your financial activity
5. Right sidebar displays insights and analysis

### Admin Workflow
1. Switch role to "Admin" using header dropdown
2. Click "Add Transaction" to enter new data
3. Click on a transaction to edit details
4. Click delete icon to remove transactions
5. Watch charts and summaries update in real-time
6. View insights for financial patterns

### Viewer Workflow
1. Keep role as "Viewer" (default)
2. Explore transactions using filters
3. Sort by different columns
4. Navigate through pages
5. Study visualizations and insights
6. No modification options available

## 🎨 Color Scheme

### Light Mode
- Background: White (#FFFFFF)
- Cards: Light Gray (#F9FAFB)
- Text: Dark Gray (#1F2937)
- Accents: Blue (#3B82F6), Green (#10B981), Red (#EF4444)

### Dark Mode
- Background: Dark Gray (#111827)
- Cards: Darker Gray (#1F2937)
- Text: Light Gray (#F3F4F6)
- Accents: Blue (#60A5FA), Green (#34D399), Red (#F87171)

## 📈 Sample Data Highlights

The dashboard comes with realistic sample data:
- **6 months of history**: Jan - June 2024
- **~30 transactions**: Mix of income and expenses
- **5 categories**: Food, Transport, Entertainment, Utilities, Shopping
- **Varied amounts**: $15 - $500+ for realistic distribution
- **Different descriptions**: Realistic merchant names

## 🚀 Performance Optimizations

1. **Memoization**: Components prevent unnecessary re-renders
2. **Efficient Filtering**: Real-time filtering without performance issues
3. **Lazy Rendering**: Charts only render when data changes
4. **localStorage Caching**: Instant state restoration
5. **CSS Optimization**: Tailwind purges unused styles in production

## 🐛 Error Handling

- **Form Validation**: Required fields are validated
- **Empty States**: Graceful handling when no data matches filters
- **Invalid Dates**: Date inputs prevent invalid entries
- **Amount Validation**: Only numeric amounts accepted
- **Duplicate Prevention**: IDs are unique

## 📚 Code Quality

### Best Practices Implemented
- Component reusability and single responsibility
- Meaningful variable and function names
- Consistent code formatting
- Organized folder structure
- Clear separation of concerns
- DRY (Don't Repeat Yourself) principle
- Proper use of React hooks

### No External Dependencies Issues
- All dependencies are well-maintained and popular
- Tailwind CSS works seamlessly with React
- Recharts is optimized for React applications
- Lucide Icons are lightweight SVGs

## 🔐 Security Considerations

Note: This is a frontend-only application for demonstration purposes.

For production:
- Never store sensitive financial data in localStorage
- Implement proper backend authentication
- Use HTTPS for all communication
- Validate all data on the backend
- Implement proper authorization checks
- Hash sensitive information
- Use secure tokens for API calls

## 🤝 Contributing & Extension Points

The application is designed to be easily extensible:

### Easy Enhancements
1. **Budget Planning**: Add budget limits by category
2. **Recurring Transactions**: Mark transactions as recurring
3. **Tags**: Add custom tags to transactions
4. **Notes**: Add detailed notes to transactions
5. **Receipt Upload**: Attach images to transactions
6. **Export**: Generate CSV/PDF reports

### Advanced Features
1. **Backend Integration**: Connect to REST API
2. **Real Accounts**: Integrate with real financial APIs
3. **Investment Tracking**: Add investment portfolio
4. **Loan Management**: Track loans and payments
5. **Multi-Currency**: Support multiple currencies
6. **Budgeting**: Compare spending to budgets

## 📞 Support & Questions

This is a demonstration project created for evaluation purposes. For questions about implementation or features, refer to the code comments in individual files.

## 📄 License

This project is provided as-is for evaluation purposes.

## 🎓 Learning Outcomes

Building this dashboard demonstrates proficiency in:

✅ **React Fundamentals**
- Functional components and hooks
- Component composition
- State management with Context API
- Event handling

✅ **Frontend Design**
- Responsive layout design
- UI/UX best practices
- Accessibility considerations
- User interaction patterns

✅ **Styling**
- Tailwind CSS utility classes
- Dark mode implementation
- Responsive design
- Animation and transitions

✅ **Data Visualization**
- Chart integration
- Data transformation
- Interactive visualizations
- Data-driven UI

✅ **State Management**
- Global state with Context
- Reducer patterns
- localStorage integration
- State persistence

✅ **User Experience**
- Form handling and validation
- Filtering and searching
- Pagination
- Role-based access control

## 🙏 Acknowledgments

Built with:
- React community best practices
- Tailwind CSS documentation
- Recharts examples
- Lucide Icons library

---

**Last Updated**: January 2024
**Status**: Complete and Production-Ready (Frontend)
**Version**: 1.0.0
