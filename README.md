# Book Library – Library Management System

> A Java-based library management system with a web frontend, mock API, and backend for business logic.

---

## 📊 Overview

The **Book Library** project is designed to manage a library's resources and user interactions. It supports:

* **Book Management** (CRUD)
* **Borrow & Return Transactions**
* **User (Reader) Management**

This was developed as a university/school project to apply Java + Spring Boot for backend, with a TypeScript-based frontend, and a mock API for testing.

---

## 🛠️ Project Structure

```
book-library/
├── client/       # Frontend (TypeScript, CSS)
├── mockApi/      # Mock API endpoints for testing frontend
├── server/       # Backend (Java, Spring Boot)
└── database/     # SQL schema and sample data
```

---

## 💡 Technologies Used

* **Frontend**: TypeScript (possibly React/Angular) + CSS
* **Mock API**: Node.js or JSON Server
* **Backend**: Java Spring Boot (Spring MVC, Spring Data JPA)
* **Database**: MySQL or H2
* **Build Tools**: Maven or Gradle

---

## 🗓 Setup & Run

### 1. Database Setup

* Import `database/schema.sql` if sample data is provided.
* Configure `application.properties` or `application.yml` in `server/src/main/resources`.

### 2. Run Mock API

```bash
cd mockApi
npm install
npm run start
```

### 3. Run Frontend

```bash
cd client
npm install
npm run start
```

The frontend runs on `http://localhost:3000` and calls either mock or backend APIs.

### 4. Run Backend

```bash
cd server
mvn spring-boot:run    # or `./mvnw spring-boot:run`
```

The backend runs on `http://localhost:8080`.

---

## 🚀 Example API Endpoints

### Book Management

| Method | URL               | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/api/books`      | Get all books       |
| GET    | `/api/books/{id}` | Get a specific book |
| POST   | `/api/books`      | Add a new book      |
| PUT    | `/api/books/{id}` | Update book details |
| DELETE | `/api/books/{id}` | Delete a book       |

Similar endpoints exist for **users** and **borrowings**.

---

## 💪 How to Use

1. Start all services (mock API, frontend, backend).
2. Access the frontend via browser.
3. Manage books, users, and borrow/return transactions.

---

## 🌐 Contribution

We welcome issues and pull requests! If you'd like to enhance endpoints, database configuration, or add authentication/authorization, feel free to open an issue.

---

## 📝 License

Developed for educational purposes. Contact the author for permissions if you want to use it in other projects.

open-source, just project in university
