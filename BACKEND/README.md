# Path2Wellness Backend API

A comprehensive backend API for managing ENT and Obstetrics patient care plans with MongoDB Atlas integration.

## Features

- **ENT Patient Care Management**: Pre and post-operation care plans
- **Obstetrics Patient Care Management**: Prenatal, postnatal, and delivery preparation care plans
- **CRUD Operations**: Create, Read, Update, Delete for all care plans
- **Data Validation**: Comprehensive input validation using express-validator
- **MongoDB Integration**: Secure connection to MongoDB Atlas
- **Error Handling**: Robust error handling and logging
- **Pagination**: Built-in pagination for large datasets

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## Installation

1. Navigate to the backend directory:
```bash
cd BACKEND
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - The `.env` file is already configured with your MongoDB Atlas connection
   - Update `JWT_SECRET` for production use

4. Start the development server:
```bash
npm run dev
```

5. For production:
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if the API is running

### ENT Care Plans

#### Base URL: `/api/ent`

- **POST** `/care-plans` - Create a new ENT care plan
- **GET** `/care-plans` - Get all ENT care plans (with filtering and pagination)
- **GET** `/care-plans/:id` - Get a specific ENT care plan
- **PUT** `/care-plans/:id` - Update an ENT care plan
- **DELETE** `/care-plans/:id` - Delete an ENT care plan
- **GET** `/patients/:patientId/care-plans` - Get all care plans for a specific patient

#### Query Parameters for GET `/care-plans`:
- `patientId` - Filter by patient ID
- `doctorId` - Filter by doctor ID
- `operationType` - Filter by operation type (pre-operation, post-operation)
- `status` - Filter by status (active, completed, cancelled)
- `priority` - Filter by priority (low, medium, high, urgent)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order (asc, desc - default: desc)

### Obstetrics Care Plans

#### Base URL: `/api/obstetrics`

- **POST** `/care-plans` - Create a new Obstetrics care plan
- **GET** `/care-plans` - Get all Obstetrics care plans (with filtering and pagination)
- **GET** `/care-plans/:id` - Get a specific Obstetrics care plan
- **PUT** `/care-plans/:id` - Update an Obstetrics care plan
- **DELETE** `/care-plans/:id` - Delete an Obstetrics care plan
- **GET** `/patients/:patientId/care-plans` - Get all care plans for a specific patient
- **POST** `/care-plans/:id/breastfeeding-log` - Add a breastfeeding log entry

#### Query Parameters for GET `/care-plans`:
- `patientId` - Filter by patient ID
- `doctorId` - Filter by doctor ID
- `careType` - Filter by care type (prenatal, postnatal, delivery-prep)
- `status` - Filter by status (active, completed, cancelled)
- `priority` - Filter by priority (low, medium, high, urgent)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order (asc, desc - default: desc)

## Sample API Requests

### Create ENT Care Plan
```json
POST /api/ent/care-plans
{
  "patientId": "ENT001",
  "patientName": "John Doe",
  "doctorId": "DR001",
  "doctorName": "Dr. Smith",
  "operationType": "post-operation",
  "surgeryType": "Tonsillectomy",
  "careDetails": {
    "painLevel": 5,
    "breathingIssues": "mild",
    "throatDiscomfort": "moderate",
    "medicationIntake": [{
      "medicationName": "Ibuprofen",
      "dosage": "400mg",
      "frequency": "Every 6 hours",
      "sideEffects": "none"
    }],
    "healingProgress": {
      "woundCondition": "good",
      "swelling": "mild",
      "notes": "Healing well, minimal bleeding"
    }
  },
  "symptoms": "Sore throat, difficulty swallowing",
  "instructions": "Take medications as prescribed, avoid hard foods, rest voice",
  "nextAppointment": "2024-01-15T10:00:00.000Z",
  "priority": "medium"
}
```

### Create Obstetrics Care Plan
```json
POST /api/obstetrics/care-plans
{
  "patientId": "OBS001",
  "patientName": "Jane Smith",
  "doctorId": "DR002",
  "doctorName": "Dr. Johnson",
  "careType": "prenatal",
  "gestationalWeek": 28,
  "careDetails": {
    "trimesterSymptoms": {
      "nausea": "mild",
      "cramps": "none",
      "mood": "stable",
      "fatigue": "moderate"
    },
    "babyMovement": {
      "frequency": "normal",
      "lastMovement": "2024-01-10T14:30:00.000Z",
      "notes": "Active movements felt regularly"
    },
    "sleepNutrition": {
      "sleepHours": 7,
      "sleepQuality": "fair",
      "dietNotes": "Balanced diet with prenatal vitamins",
      "waterIntake": 2.5,
      "supplements": [{
        "name": "Folic Acid",
        "dosage": "400mcg",
        "frequency": "Daily"
      }]
    }
  },
  "vitalSigns": {
    "bloodPressure": {
      "systolic": 120,
      "diastolic": 80
    },
    "weight": 65,
    "temperature": 36.5,
    "heartRate": 75
  },
  "instructions": "Continue prenatal vitamins, monitor baby movements, attend regular checkups",
  "nextAppointment": "2024-01-20T09:00:00.000Z",
  "priority": "medium"
}
```

## Testing the API

1. **Start the server**:
```bash
npm run dev
```

2. **Test health endpoint**:
```bash
curl http://localhost:5000/api/health
```

3. **Use Postman or similar tools** to test the CRUD operations with the sample JSON data above.

4. **Check MongoDB Atlas** to verify data is being stored correctly.

## Database Schema

### ENT Care Plan Schema
- Patient and doctor information
- Operation type (pre/post-operation)
- Care details (pain level, breathing issues, medications, healing progress)
- Instructions and appointments
- Status and priority tracking

### Obstetrics Care Plan Schema
- Patient and doctor information
- Care type (prenatal, postnatal, delivery-prep)
- Gestational week tracking
- Comprehensive care details (symptoms, baby movement, nutrition, postnatal recovery)
- Vital signs monitoring
- Breastfeeding logs for postnatal care

## Security Notes

- **Production Deployment**: Add authentication middleware
- **Environment Variables**: Update JWT_SECRET and other sensitive data
- **CORS**: Configure CORS for specific domains in production
- **Rate Limiting**: Consider adding rate limiting middleware
- **Input Sanitization**: Already implemented with express-validator

## Error Handling

The API includes comprehensive error handling:
- Validation errors return 400 status with detailed error messages
- Not found resources return 404 status
- Server errors return 500 status with appropriate error messages
- All errors are logged for debugging

## Development

- **Development mode**: `npm run dev` (uses nodemon for auto-restart)
- **Production mode**: `npm start`
- **Testing**: `npm test` (Jest framework ready for unit tests)

## Support

For any issues or questions, please check the error logs and ensure:
1. MongoDB Atlas connection is working
2. All required fields are provided in API requests
3. Data types match the schema requirements
