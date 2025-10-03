# Path2Wellness Frontend

A comprehensive React frontend for the Path2Wellness healthcare management system, designed for managing ENT and Obstetrics patient care plans.

## Features

### 🏥 Patient Dashboard
- **Stacked Layout**: ENT and Obstetrics sections vertically arranged
- **View-Only Access**: Patients can view their care plans but cannot modify them
- **Real-time Data**: Live updates from the backend API
- **Professional UI**: Clean, medical-appropriate design with cards and tables
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 👨‍⚕️ Admin Portal (Doctor Access)
- **Full CRUD Operations**: Create, Read, Update, Delete care plans
- **Advanced Search & Filtering**: Find patients and care plans quickly
- **Statistics Dashboard**: Overview of all care plans and patient metrics
- **Comprehensive Forms**: Detailed forms for both ENT and Obstetrics care plans
- **Patient Management**: Manage multiple patients and their care plans

### 🔐 Authentication System
- **Dual Login**: Separate login portals for patients and doctors
- **Role-Based Access**: Different permissions for patients vs. admins
- **Secure Authentication**: JWT-based authentication with protected routes
- **Demo Credentials**: Built-in demo accounts for testing

### 📱 Key Components

#### ENT Care Plan Management
- **Pre/Post Operation Care**: Manage care plans for both phases
- **Pain Level Tracking**: 0-10 scale pain monitoring
- **Medication Management**: Track medications, dosages, and side effects
- **Healing Progress**: Monitor wound condition and recovery
- **Breathing & Throat Issues**: Track respiratory and throat symptoms

#### Obstetrics Care Plan Management
- **Prenatal Care**: Manage pregnancy journey and symptoms
- **Postnatal Recovery**: Track post-delivery recovery and healing
- **Delivery Preparation**: Specialized care plans for delivery prep
- **Trimester Symptoms**: Monitor nausea, cramps, mood, and fatigue
- **Baby Movement Tracking**: Record and monitor fetal movements
- **Sleep & Nutrition**: Track sleep patterns and dietary information
- **Breastfeeding Logs**: Detailed feeding session tracking
- **Vital Signs Monitoring**: Blood pressure, weight, temperature, heart rate

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Router Dom** - Client-side routing and navigation
- **React Hook Form** - Efficient form handling and validation
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **Date-fns** - Date manipulation and formatting
- **CSS3** - Custom CSS with CSS variables and modern layouts

## Project Structure

```
FRONTEND/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── AdminEntSection.js
│   │   │   ├── AdminObstetricsSection.js
│   │   │   ├── CreateCarePlanModal.js
│   │   │   ├── EditEntCarePlanModal.js
│   │   │   └── EditObstetricsCarePlanModal.js
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── AdminLogin.js
│   │   ├── common/
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── Modal.js
│   │   │   └── LoadingSpinner.js
│   │   └── patient/
│   │       ├── PatientDashboard.js
│   │       ├── EntSection.js
│   │       └── ObstetricsSection.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── entService.js
│   │   └── obstetricsService.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Installation & Setup

1. **Navigate to frontend directory**:
   ```bash
   cd FRONTEND
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Environment Configuration

The frontend is configured to work with the backend API. Update the API URL in `src/services/api.js` if needed:

```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  // ...
});
```

## Demo Credentials

### Patient Login
- **Email**: `patient@demo.com`
- **Password**: `demo123`

### Doctor/Admin Login
- **Email**: `doctor@demo.com`
- **Password**: `admin123`

## Key Features in Detail

### 🎨 Professional Healthcare UI
- **Medical Color Palette**: Professional blues and teals
- **Accessibility**: High contrast ratios and keyboard navigation
- **Responsive Grid**: Adapts to all screen sizes
- **Modern Cards**: Clean card-based layouts for data display
- **Interactive Tables**: Sortable and filterable data tables

### 📊 Dashboard Analytics
- **Quick Statistics**: Total plans, active cases, urgent priorities
- **Visual Indicators**: Color-coded priority levels and status badges
- **Real-time Updates**: Live data synchronization with backend
- **Search & Filter**: Advanced filtering by status, priority, patient, doctor

### 🔄 State Management
- **React Context**: Centralized authentication state
- **Local Storage**: Persistent login sessions
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Smooth loading indicators throughout the app

### 📱 Mobile Responsiveness
- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly**: Large buttons and touch targets
- **Responsive Navigation**: Collapsible navigation for small screens
- **Adaptive Layouts**: Flexible grid systems that work on any device

## API Integration

The frontend integrates seamlessly with the Path2Wellness backend:

- **Authentication**: JWT-based authentication with automatic token refresh
- **CRUD Operations**: Full create, read, update, delete functionality
- **Real-time Data**: Live updates and synchronization
- **Error Handling**: Graceful error handling with user-friendly messages
- **Validation**: Client-side validation that matches backend requirements

## Development Guidelines

### Component Architecture
- **Functional Components**: Modern React hooks-based components
- **Reusable Components**: Modular design for maximum reusability
- **Props Validation**: Comprehensive prop types and validation
- **Clean Code**: Well-documented and maintainable code structure

### Styling Approach
- **CSS Variables**: Consistent theming with CSS custom properties
- **BEM Methodology**: Block, Element, Modifier naming convention
- **Mobile-First**: Responsive design starting from mobile
- **Accessibility**: WCAG 2.1 compliant design patterns

### Performance Optimization
- **Code Splitting**: Lazy loading for optimal performance
- **Memoization**: React.memo and useMemo for expensive operations
- **Optimized Images**: Proper image optimization and lazy loading
- **Bundle Analysis**: Regular bundle size monitoring

## Testing

Run the test suite:
```bash
npm test
```

## Deployment

### Development
```bash
npm start
```
Runs on `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates optimized production build in `build/` directory

## Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile**: iOS Safari, Chrome Mobile

## Contributing

1. Follow the existing code style and patterns
2. Write comprehensive tests for new features
3. Ensure responsive design for all new components
4. Update documentation for any new features
5. Test thoroughly on multiple devices and browsers

## Security Considerations

- **Authentication**: Secure JWT token handling
- **Authorization**: Role-based access control
- **Input Validation**: Client-side validation with server-side verification
- **XSS Protection**: Proper input sanitization and output encoding
- **HTTPS**: Secure communication in production

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Future Enhancements

- **Real-time Notifications**: WebSocket integration for live updates
- **Offline Support**: Progressive Web App capabilities
- **Advanced Analytics**: Detailed reporting and analytics dashboard
- **Multi-language Support**: Internationalization (i18n)
- **Dark Mode**: Theme switching capabilities

## Support

For technical support or questions about the frontend implementation, please refer to the main project documentation or contact the development team.

---

**Path2Wellness Frontend** - Professional healthcare management interface built with modern React and best practices.
