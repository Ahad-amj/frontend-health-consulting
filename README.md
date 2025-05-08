# 🏥 Health Consulting App (DocLink) – Frontend
## 🌐 Project Description

The **DocLink** is Health Consulting App which is a full-stack web platform that enables seamless interaction between **doctors** and **patients** for online medical consultations. Developed using **React** (frontend) and **Django REST Framework** (backend), the app delivers a user-friendly interface with secure data handling and a role-specific experience.

### 👨‍⚕️ For Doctors:
- View and manage comments received from patients
- View ratings and feedback
- Prescribe medicines

### 🧑‍💼 For Patients:
- Search and view doctors' profiles
- Leave comments and ratings for doctors
- Edit or delete own comments

This platform aims to improve healthcare access by connecting users to trusted professionals, making communication, consultation, and prescriptions more efficient and digital-first.

## 📦 Repository Description
This repository contains the **frontend** of the Health Consulting App built with **React.js**.  
It provides a user-friendly interface for both **doctors** and **patients** to interact, rate, message, and manage prescriptions.

---

## 🛠 Tech Stack

- React
- JavaScript
- CSS 
- html
- Docker
- VS Code
- GitHub


---

## 🔗 Backend Repository
[Health Consulting App – Backend](https://github.com/Ahad-amj/backend-health-consulting)

---

## 🌐 Link to Deployed Site
[Live App](http://localhost:5173/)

---

### Frontend Installation (Docker) 🖥️

```bash
1. **Clone the Repository**  
   git clone <your-repository-url>  
   cd <your-project-folder>

2. **Build the Docker Image for Frontend**  
   docker build -t frontend .

3. **Run the Docker Container for Frontend**  
   docker-compose up -d

4. **Access the Frontend**  
   The React frontend should now be running on localhost:3000.

5. **Stopping the Docker Containers**  
   docker-compose down
```

## ❄️ IceBox Features

- Integrate a payment gateway to allow patients to **purchase medicines** directly from the app.
- Implement a **map-based hospital selector** using Google Maps API or Leaflet to help patients choose the **nearest hospital**.
- Add loading animations and toasts for better user feedback.
- Add pagination or infinite scroll to Doctors and Medicines lists.
- Add multilingual support for broader accessibility.
- Responsive design enhancements for mobile and tablet views.
- Add a feature that allows **doctors to reply to patient messages** within the app for personalized communication.
