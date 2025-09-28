# 🛒 Full-Stack E-Commerce Platform

![Java](https://img.shields.io/badge/Java-21-blue?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-24-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-EC2-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

A modern, full-stack e-commerce web application featuring a complete customer journey from browsing to checkout, alongside a powerful seller dashboard for product and sales management.

### [**Live Demo**](#-live-demo) · [**API Documentation**](#-api-documentation)

---

## Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Contact](#-contact)

---

## 📜 About The Project

This project is a comprehensive e-commerce solution built from the ground up. It supports two primary user flows: a seamless shopping experience for **customers** and an intuitive management interface for **sellers**.

Authentication is handled securely using **JWT** stored in an **HttpOnly cookie**, protecting against XSS attacks. The system is designed with role-based access control (USER / SELLER / ADMIN) to ensure users can only access authorized resources.

*(Placeholder for screenshots or a GIF demonstrating the application)*

![Project Screenshot](https://via.placeholder.com/800x450.png?text=Application+Screenshot+Here)

---

## ✨ Key Features

-   ✅ **Product Catalog:** Browse, search, and filter products by category, rating, or price.
-   ✅ **Dynamic Shopping Cart:** Add items, update quantities, and remove products with real-time total calculation.
-   ✅ **Secure Checkout:** Integrated with **Stripe** for reliable and secure payment processing (currently in test mode).
-   ✅ **User Accounts:** Full user authentication, profile management, and order history tracking.
-   ✅ **Seller Dashboard:** A dedicated interface for sellers to add new products, manage inventory, edit listings, and view their sales.
-   ✅ **Admin Panel:** Administrative controls for managing users, roles, and site-wide content.
-   ✅ **Responsive Design:** A fluid user interface that works seamlessly on both desktop and mobile devices.

---

## 🛠️ Tech Stack

This project is built with a modern, scalable technology stack.

| Category                  | Technologies                                                                          |
| :------------------------ | :------------------------------------------------------------------------------------ |
| **Backend & APIs** | Java 21, Spring Boot 3.x, Spring Security + JWT, JPA/Hibernate, OpenAPI (Swagger)       |
| **Frontend & UI** | React.js 18, Vite, Redux Toolkit, Material-UI, Tailwind CSS, Axios                      |
| **Database** | MySQL 8.0                                                                             |
| **DevOps & Infrastructure** | Docker, Docker Compose, AWS EC2, Nginx (Reverse Proxy), GitHub Actions (CI), Playwright (E2E Testing) |

---

## 🏗️ System Architecture

The application is deployed as a multi-container environment on a single AWS EC2 instance, orchestrated using **Docker Compose**. This setup ensures service isolation, scalability, and streamlined management.

The architecture consists of three core services working in tandem:

1.  **`web` (Nginx + React Frontend)**
    -   Serves the static, optimized React build to users on port 80.
    -   Acts as a **reverse proxy**, forwarding all API requests starting with `/api/` to the backend service, avoiding CORS issues.

2.  **`backend` (Spring Boot Application)**
    -   Exposes the RESTful API under the `/api/` path.
    -   Handles all business logic, user authentication, order processing, and server-side integration with Stripe.
    -   Serves static assets like product images from a dedicated volume.

3.  **`database` (MySQL Server)**
    -   Provides persistent storage for all application data, including users, products, and orders.
    -   Runs in its own container and communicates with the backend service over a private Docker network.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Git
-   Docker and Docker Compose

### Installation & Launch

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Create an environment file:**
    Create a `.env` file in the root directory by copying the example file. This is where you'll store your secret keys and database credentials.
    ```sh
    cp .env.example .env
    ```
    *Now, open the `.env` file and fill in your Stripe API keys, database password, and JWT secret.*

3.  **Build and run the application with Docker Compose:**
    This command will build the images for the frontend and backend, pull the MySQL image, and start all three containers in detached mode.
    ```sh
    docker-compose up -d --build
    ```

4.  **Access the application:**
    -   The frontend will be available at `http://localhost:80`.
    -   The backend API can be accessed via `http://localhost:80/api/`.

---

## 📖 API Documentation

The REST API is fully documented using OpenAPI 3. You can explore the interactive documentation via Swagger UI. Once the application is running, navigate to:

`http://localhost:80/swagger-ui/index.html`

---

## 👤 Contact

Your Name – [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/your-username/your-repo-name](https://github.com/your-username/your-repo-name)
