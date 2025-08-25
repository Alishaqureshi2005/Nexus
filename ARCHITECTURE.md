# 🏗️ Business Nexus Architecture Documentation

## 📱 Application Overview

Business Nexus is a React-based B2B networking platform connecting entrepreneurs and investors, built with:
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** React Context API
- **UI Components:** Custom component library

---

## 🛣️ Routing Architecture

```
App.tsx (Root Router)
├── AuthProvider (Context Wrapper)
├── Authentication Routes
│   ├── /login → LoginPage
│   └── /register → RegisterPage
│
├── Protected Routes (DashboardLayout Wrapper)
│   ├── Dashboard Routes
│   │   ├── /dashboard/entrepreneur → EntrepreneurDashboard
│   │   └── /dashboard/investor → InvestorDashboard
│   │
│   ├── Profile Routes
│   │   ├── /profile/entrepreneur/:id → EntrepreneurProfile
│   │   └── /profile/investor/:id → InvestorProfile
│   │
│   ├── Feature Routes
│   │   ├── /investors → InvestorsPage
│   │   ├── /entrepreneurs → EntrepreneursPage
│   │   ├── /messages → MessagesPage
│   │   ├── /notifications → NotificationsPage
│   │   ├── /documents → DocumentsPage
│   │   ├── /settings → SettingsPage
│   │   ├── /help → HelpPage
│   │   └── /deals → DealsPage
│   │
│   └── Chat Routes
│       ├── /chat → ChatPage
│       └── /chat/:userId → ChatPage
│
└── Fallback Routes
    ├── / → Redirect to /login
    └── * → Redirect to /login
```

### Route Protection Strategy
- All routes except `/login` and `/register` are protected
- `DashboardLayout` component handles authentication checks
- Unauthenticated users are redirected to login
- Role-based navigation in sidebar

---

## 🎯 State Management

### AuthContext (Global State)
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Authentication Methods
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<User>) => Promise<void>;
}
```

### State Flow
```
1. App Load → Check localStorage for existing user
2. Unauthenticated → Redirect to /login
3. Login/Register → Update AuthContext + localStorage
4. Protected Routes → DashboardLayout checks authentication
5. Role-based Navigation → Sidebar adapts to user role
6. Logout → Clear context + localStorage + redirect to login
```

### Local Storage Keys
- `USER_STORAGE_KEY`: Stores authenticated user data
- `RESET_TOKEN_KEY`: Stores password reset tokens

---

## 🧩 Component Hierarchy

```
App.tsx
├── AuthProvider
│   └── Router
│       └── Routes
│           ├── Auth Pages (Standalone)
│           │   ├── LoginPage
│           │   └── RegisterPage
│           │
│           └── Protected Pages (DashboardLayout)
│               ├── Navbar
│               ├── Sidebar (Role-based Navigation)
│               └── Main Content (Outlet)
│                   ├── Dashboard Pages
│                   │   ├── EntrepreneurDashboard
│                   │   └── InvestorDashboard
│                   │
│                   ├── Profile Pages
│                   │   ├── EntrepreneurProfile
│                   │   └── InvestorProfile
│                   │
│                   ├── Feature Pages
│                   │   ├── InvestorsPage
│                   │   ├── EntrepreneursPage
│                   │   ├── MessagesPage
│                   │   ├── NotificationsPage
│                   │   ├── DocumentsPage
│                   │   ├── SettingsPage
│                   │   ├── HelpPage
│                   │   └── DealsPage
│                   │
│                   └── Chat Pages
│                       └── ChatPage
```

---

## 🎨 UI Component Library

### Layout Components
```
src/components/layout/
├── DashboardLayout.tsx (Main Layout Wrapper)
│   ├── Authentication guard
│   ├── Loading states
│   └── Layout structure
├── Navbar.tsx (Top Navigation)
│   ├── User profile
│   ├── Notifications
│   └── Logout functionality
└── Sidebar.tsx (Role-based Side Navigation)
    ├── Entrepreneur navigation items
    ├── Investor navigation items
    └── Common settings items
```

### Reusable UI Components
```
src/components/ui/
├── Avatar.tsx (User avatars with fallbacks)
├── Badge.tsx (Status and category badges)
├── Button.tsx (Primary, secondary, and ghost buttons)
├── Card.tsx (Content containers)
└── Input.tsx (Form inputs with validation)
```

### Feature-Specific Components
```
src/components/
├── chat/
│   ├── ChatMessage.tsx (Individual message display)
│   └── ChatUserList.tsx (User conversation list)
├── collaboration/
│   └── CollaborationRequestCard.tsx (Connection requests)
├── entrepreneur/
│   └── EntrepreneurCard.tsx (Startup profile cards)
└── investor/
    └── InvestorCard.tsx (Investor profile cards)
```

---

## 📊 Data Layer

### Mock Data Structure
```
src/data/
├── users.ts (User profiles & authentication)
│   ├── Entrepreneurs with startup details
│   ├── Investors with portfolio information
│   └── Mock authentication logic
├── messages.ts (Chat conversations)
│   ├── Message history
│   ├── Conversation threads
│   └── Read/unread status
└── collaborationRequests.ts (Connection requests)
    ├── Pending requests
    ├── Accepted connections
    └── Request status tracking
```

### Type Definitions
```typescript
// Core User Types
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  bio: string;
  isOnline?: boolean;
  createdAt: string;
}

interface Entrepreneur extends User {
  role: 'entrepreneur';
  startupName: string;
  pitchSummary: string;
  fundingNeeded: string;
  industry: string;
  location: string;
  foundedYear: number;
  teamSize: number;
}

interface Investor extends User {
  role: 'investor';
  investmentInterests: string[];
  investmentStage: string[];
  portfolioCompanies: string[];
  totalInvestments: number;
  minimumInvestment: string;
  maximumInvestment: string;
}

// Communication Types
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface ChatConversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

// Business Logic Types
interface CollaborationRequest {
  id: string;
  investorId: string;
  entrepreneurId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  url: string;
  ownerId: string;
}
```

---

## 🔐 Security & Authentication Flow

### Authentication Process
1. **Initial Load**
   - Check localStorage for existing user session
   - Set loading state while checking
   - Redirect to login if no valid session

2. **Login Process**
   - Validate credentials against mock data
   - Store user in AuthContext and localStorage
   - Redirect to role-appropriate dashboard

3. **Route Protection**
   - `DashboardLayout` checks authentication on every route
   - Unauthenticated users redirected to login
   - Role-based access control in sidebar navigation

4. **Session Management**
   - User data persisted in localStorage
   - Automatic logout on session expiry
   - Secure token handling for password resets

---

## 🎯 Key Features by User Role

### Entrepreneur Features
- **Dashboard:** Startup metrics, recent activity, investor interest
- **Profile Management:** Startup details, pitch deck, funding needs
- **Investor Discovery:** Browse and filter potential investors
- **Document Management:** Upload and share business documents
- **Messaging:** Direct communication with investors
- **Notifications:** Connection requests, messages, updates

### Investor Features
- **Dashboard:** Portfolio overview, recent deals, startup pipeline
- **Profile Management:** Investment criteria, portfolio companies
- **Startup Discovery:** Browse and filter investment opportunities
- **Deal Management:** Track potential investments and due diligence
- **Messaging:** Direct communication with entrepreneurs
- **Notifications:** New startups, connection requests, updates

### Common Features
- **Real-time Messaging:** Chat system with read receipts
- **Notification System:** In-app notifications for all activities
- **Profile Management:** Edit personal and business information
- **Settings:** Account preferences, privacy settings, notifications
- **Help & Support:** Documentation and support contact

---

## 🔄 State Flow Patterns

### 1. Authentication Flow
```
User Action → AuthContext Method → API Call → Update State → localStorage → Route Change
```

### 2. Role-based UI Rendering
```
User Role → Conditional Logic → Different Components → Role-specific Navigation
```

### 3. Data Management
```
Mock Data → Context Provider → Component Props → UI Rendering → User Interaction
```

### 4. Protected Routing
```
Route Access → Authentication Check → Role Validation → Component Rendering
```

---

## 🚀 Development Patterns

### Component Structure
- **Functional Components:** All components use React hooks
- **TypeScript:** Strict typing for all props and state
- **Custom Hooks:** Reusable logic extraction (e.g., `useAuth`)
- **Context Providers:** Global state management

### Styling Approach
- **Tailwind CSS:** Utility-first styling
- **Component Variants:** Consistent design system
- **Responsive Design:** Mobile-first approach
- **Dark Mode Ready:** CSS custom properties for theming

### Code Organization
- **Feature-based Structure:** Components grouped by functionality
- **Shared Components:** Reusable UI components in `/ui`
- **Type Definitions:** Centralized in `/types`
- **Mock Data:** Organized by domain in `/data`

---

## 🔧 Technical Stack

### Core Dependencies
- **React 18:** Component library with hooks
- **TypeScript:** Type-safe JavaScript
- **Vite:** Fast build tool and dev server
- **React Router v6:** Client-side routing
- **Tailwind CSS:** Utility-first CSS framework

### Development Tools
- **ESLint:** Code linting and formatting
- **PostCSS:** CSS processing
- **Vercel:** Deployment platform

### UI Libraries
- **Lucide React:** Icon library
- **React Hot Toast:** Notification system

---

## 📈 Scalability Considerations

### Current Architecture Benefits
- **Modular Components:** Easy to extend and maintain
- **Type Safety:** Reduces runtime errors
- **Context API:** Simple state management for current scale
- **Mock Data:** Easy to replace with real APIs

### Future Scalability
- **State Management:** Consider Redux/Zustand for complex state
- **API Integration:** Replace mock data with real backend
- **Real-time Features:** WebSocket integration for live updates
- **Performance:** Code splitting and lazy loading
- **Testing:** Unit and integration test coverage

---

## 🎯 Next Steps

1. **Backend Integration:** Replace mock data with real API calls
2. **Real-time Features:** Implement WebSocket for live messaging
3. **File Upload:** Add document upload functionality
4. **Search & Filtering:** Advanced search capabilities
5. **Analytics:** User behavior tracking and insights
6. **Mobile App:** React Native or PWA implementation
7. **Testing:** Comprehensive test suite
8. **Performance:** Optimization and monitoring

---

*This architecture provides a solid foundation for a scalable B2B networking platform with clean separation of concerns, type safety, and modern React patterns.*
