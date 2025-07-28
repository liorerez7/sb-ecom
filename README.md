# E-Commerce Web Application (Spring Boot Backend)

This is a production-grade backend system for an e-commerce application built with **Java**, **Spring Boot**, **Spring Security (JWT)**, **JPA (Hibernate)**, and **MySQL/PostgreSQL**.

> ⚠️ **Note**: The frontend (React) part of this application is not yet implemented. Current focus is solely on backend development and architecture.

---

## ✅ Main Features Implemented (Backend)

- **User Authentication & Authorization**
  - Custom login (`/signin`) using **JWT (JSON Web Tokens)**
  - Secure access to roles (`USER`, `ADMIN`)
  - Stateless session management with custom `AuthTokenFilter`, `JwtUtils`, `AuthEntryPointJwt`

- **Spring Security Configuration**
  - Role-based access control
  - Exception handling for unauthorized requests
  - Token parsing and validation filter chain

- **Database & JPA Layer**
  - **JPA/Hibernate** for ORM and database interaction
  - Multiple entity relationships implemented: `@OneToMany`, `@ManyToOne`, `@ManyToMany`
  - Data persistence and validation with Hibernate annotations
  - Pagination and sorting

- **Business Logic**
  - Product and Category management
  - Shopping cart implementation with price and quantity tracking
  - Address management per user
  - Order placement and preparation for payment logic

- **Lombok Integration**
  - Boilerplate reduction using `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`, etc.

- **Custom Exceptions**
  - Unified exception handling with detailed API error responses

- **PostgreSQL and MySQL Support**
  - Easily switch between database providers using Spring Profiles

---

## 📁 Folder Structure (Backend)

src/
├── config/ # Security and Web configuration
├── controller/ # REST controllers for API endpoints
├── dto/ # Data Transfer Objects (DTOs)
├── model/ # JPA entity classes
├── repository/ # Spring Data JPA Repositories
├── security/ # JWT filters and utilities
├── service/ # Business logic layer
└── util/ # Helper classes (e.g., AuthUtil)

---

## 🔐 Security Architecture

- Token is generated upon login and sent as `Authorization: Bearer <token>`
- Filter intercepts requests and sets authentication context
- Endpoints are restricted via role-based access (e.g., `/admin/**`, `/user/**`)
- JWT expiration and invalidation supported

---

## 🛠️ Technologies Used

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA (Hibernate)
- MySQL / PostgreSQL
- Lombok
- JWT (jjwt)
- H2 (for testing)
- IntelliJ IDEA

---

## 📌 Current Status

✅ Backend: **Mostly Complete**  
🟡 Frontend (React): **Not Started Yet**

The backend is functional and ready to be integrated with a frontend client or tested using Postman/Swagger.

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Maven
- MySQL/PostgreSQL or H2 for local testing

### Run Locally

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
mvn spring-boot:run
