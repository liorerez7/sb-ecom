# E-Commerce Web Application (Spring Boot Backend)

This is a backend system for an e-commerce application built with **Java**, **Spring Boot**, **Spring Security (JWT)**, **JPA (Hibernate)**, and **MySQL**.

> ⚠️ **Note**: The frontend (React) part of this application is not yet implemented. Current focus was on backend development and architecture.

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
  - Multiple entity relationships: `@OneToMany`, `@ManyToOne`, `@ManyToMany`
  - Validation and data integrity via Hibernate annotations
  - Pagination and sorting

- **Business Logic**
  - Product and category management
  - Shopping cart with quantity/price logic
  - Address management per user
  - Order preparation and payment structure

- **Lombok Integration**
  - Boilerplate reduction with `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`, etc.

- **Custom Exception Handling**
  - Unified and clear API error responses

---

## 🔐 Security Architecture

- Token-based login with `Authorization: Bearer <JWT>`
- `AuthTokenFilter` extracts and verifies token
- Roles-based endpoint protection
- Stateless design for scalability
- JWT expiration and error handling implemented

---

## 🛠️ Technologies Used

- Spring Boot 3
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- MySQL 
- Lombok
- Maven
  
---

## 📌 Current Status

✅ Backend: **Mostly Complete**  
🟡 Frontend: **Not Started Yet**

The backend is functional and tested using Postman.  
Once the project is completed, a public deployment link will be added here.

---

## 🔮 What's Next

- Full implementation of the **React frontend** with modern UI components
- State management with **Redux**
- Styling using **Tailwind CSS**
- User dashboards and admin panels
- Order history and payments interface
- **Deployment to AWS** 
