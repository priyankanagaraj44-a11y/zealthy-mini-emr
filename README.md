# Zealthy Mini EMR + Patient Portal

## Overview

It simulates a simplified Electronic Medical Record (EMR) system for providers and a Patient Portal for patients.

The system allows providers to manage patients, appointments, and prescriptions while allowing patients to view their medical information.

The frontend is built using **React Native with Expo** (supports Web, iOS, and Android).  
The backend is built using **Node.js, Express, and SQLite**.

---

# Application Access

## Admin (Mini EMR)

Admin panel is accessible at:

```
/admin
```

Admin credentials:

```
Email: admin@test.com
Password: 123
```

Admin capabilities:

• Create new patients  
• View all patients  
• Edit patient details  
• Create appointments  
• Delete appointments  
• Create prescriptions  
• Delete prescriptions  
• View patient appointments  
• View patient prescriptions  

---

# Patient Portal

Accessible at:

```
/
```

Patients can log in to view their medical information.

Example patient login credentials:

```
Email: mark@some-email-provider.net
Password: Password123!
```

```
Email: lisa@some-email-provider.net
Password: Password123!
```

Patient capabilities:

• Login with email and password  
• View upcoming appointments  
• View prescriptions  
• View medication refill alerts  
• View full appointment schedule  
• View full prescription history  

Patients have **read-only access** to their medical data.

---

# Patient Portal Dashboard

After login, the patient sees a dashboard with:

### Upcoming Appointments
Appointments scheduled within the next **7 days**.

### Prescription Summary
Current medications prescribed.

### Refill Alerts
Medications with refill dates within the next **7 days**.

Patients can also view:

• Full appointment schedule  
• Full prescription history  

Up to **3 months of upcoming data**.

---

# Seed Data

The database is seeded using the JSON file provided in the assignment.

Seed data includes:

• Users  
• Appointments  
• Prescriptions  
• Medications  
• Dosages  

Medication and dosage dropdowns in the prescription form are populated from this seed data.

---

# Tech Stack

Frontend

• React Native  
• Expo  
• React Native Picker  

Backend

• Node.js  
• Express  
• SQLite  

---

## Project Structure

```
zealthyemr
│
├── backend
│   │
│   ├── node_modules
│   │
│   ├── appointmentController.ts      # Handles appointment logic
│   ├── appointmentRoutes.ts          # Appointment API routes
│   │
│   ├── authController.ts             # Login authentication logic
│   ├── authRoutes.ts                 # Authentication routes
│   │
│   ├── patientController.ts          # Patient CRUD logic
│   ├── patientRoutes.ts              # Patient API routes
│   │
│   ├── prescriptionController.ts     # Prescription CRUD logic
│   ├── prescriptionRoutes.ts         # Prescription API routes
│   │
│   ├── medicationRoutes.ts           # Medication + dosage routes
│   │
│   ├── db.ts                         # SQLite database connection
│   ├── seed.ts                       # Seeds database using data.json
│   │
│   ├── data.json                     # Medication and dosage seed data
│   ├── database.sqlite               # SQLite database file
│   ├── zealthy.db                    # Generated application database
│   │
│   ├── server.ts                     # Express server entry point
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── frontend
│   │
│   ├── .expo
│   ├── assets
│   ├── node_modules
│   │
│   ├── AdminHome.tsx                 # Admin dashboard (/admin)
│   ├── PatientDetail.tsx             # Admin patient management screen
│   │
│   ├── LoginScreen.tsx               # Patient login screen
│   ├── PortalScreen.tsx              # Patient portal dashboard
│   │
│   ├── api.ts                        # Axios API configuration
│   │
│   ├── App.tsx                       # Root React Native application
│   ├── index.ts                      # Expo entry point
│   │
│   ├── app.json
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

# Setup Instructions

## Clone Repository

```
git clone https://github.com/YOUR_USERNAME/zealthy-mini-emr.git
cd zealthy-mini-emr
```

---

# Install Dependencies

### Backend

```
cd backend
npm install
```

### Frontend

```
cd frontend
npm install
```

---

# Seed the Database

Run:

```
cd backend
npm run seed
```

This loads the JSON seed data into SQLite.

---

# Start Backend Server

```
cd backend
npm run dev
```

Backend runs at:

```
http://localhost:4002
```

---

# Start Frontend

Open a new terminal and run:

```
cd frontend
npx expo start
```

---

# Running the Application

Expo allows running the app on multiple platforms.

---

## Web

Press:

```
w
```

or open:

```
http://localhost:8081
```

---

## iOS

Press:

```
i
```

Requires:

• Xcode installed  
• iOS Simulator installed  

---

## Android

Press:

```
a
```

Requires Android Studio emulator.

---

# Application Routes

## Patient Portal

```
/
```

Login using seeded patient credentials.

---

## Admin EMR

```
/admin
```

Admin interface allows:

• Patient management  
• Appointment scheduling  
• Prescription management  

---

# API Endpoints

### Patients

```
GET /patients
POST /patients
PUT /patients/:id
```

### Appointments

```
GET /appointments/:patientId
POST /appointments
DELETE /appointments/:id
```

### Prescriptions

```
GET /prescriptions/:patientId
POST /prescriptions
DELETE /prescriptions/:id
GET /prescriptions/refills/:patientId
```

### Medications

```
GET /medications
GET /medications/dosages
```

---


---

# Author

Priyanka Nagaraj  
Zealthy Mobile Engineering Exercise
