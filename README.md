# PROG7312 POE - PART 1 - Smart-X Telemetry Gateway

## 1. System Overview 📄

The Smart-X Telemetry Gateway is an advanced IoT ingestion and monitoring platform built to handle high-throughput sensor data. The system acts as the core gateway infrastructure, featuring a containerized architecture that processes telemetry streams and provides an interactive interface for diagnostics.

### Intended Users 👥

Smart-X serves two primary technical user roles:

* **Network Engineers:** Users who register sensor deployment nodes, upload encrypted hardware logs and validate recursive network topologies.
* **System Administrators:** Users who monitor real-time data aggregation and utilize the Historical Data Replay engine to investigate system anomalies.

---

## 2. System Architecture & Backend Structure 🏗️

The application strictly utilizes a decoupled architecture, operating a React frontend client and an ASP.NET Core Minimal API backend within isolated, bridged Docker containers.

### **Running Web App**
https://youtu.be/gG30gjrvfFQ?si=7KcMcA7tkYcFsCT3

### **Web-App Screenshots:**

* **Dashboard & Engagement Widget:**
<img width="1901" height="1046" alt="image" src="https://github.com/user-attachments/assets/7cda5b57-78a4-4baa-bf90-2c69d553dbc7" />

* **Sensor Registration & Encrypted Upload:**
<img width="1917" height="1047" alt="image" src="https://github.com/user-attachments/assets/34010a74-fe48-42b9-89f5-7eaaf57956da" />


### Request Flow & Data Ingestion 🔁

1. **Client Request:** The React client initiates a request (e.g., node registration, file upload, or telemetry fetch) to the API gateway.
2. **Minimal API Server:** The ASP.NET Core server receives the traffic on Port 8080 inside the Docker network.
3. **Data Processing:** Payloads are parsed using advanced Object-Oriented concepts (Operator Overloading for data aggregation, Recursive Algorithms for deployment tree validation).
4. **In-Memory Collections:** Telemetry batches are managed and tracked using a custom generic data structure (TelemetryCollection) instead of standard lists.
5. **Secure Storage:** Multipart file uploads are streamed directly through a cryptographic service before writing to the local volume.

---

## 3. Advanced OOP & Security Implementation 🪪🪛

Performance and security are prioritized to ensure optimal operation on resource-constrained gateway devices.

### Generics & Custom Collections 🧬

To handle disparate incoming data structures, the API utilizes a reusable generic wrapper class, TelemetryPacket. This avoids expensive boxing/unboxing operations when passing floats for temperature or booleans for actuator states. These packets are managed inside a custom TelemetryCollection that implements IEnumerable for optimized memory allocation and seamless JSON serialization (Microsoft, 2026a).

### Operator Overloading & Recursion 🧮

* **Overloading:** Operators (+, -) are overloaded on sensor data structures to allow direct aggregation of sensor values in code (e.g., aggregating the load of two smart meters seamlessly).
* **Recursion:** A recursive validation algorithm parses nested device deployment trees to ensure nodes are safely configured within their respective hierarchical tiers (e.g., Sub-Zone -> Zone -> Facility).

### AES-256 File Encryption 🔐

Hardware logs and configuration files attached during sensor registration are never stored as plain text. The API implements System.Security.Cryptography.Aes to handle multipart streams. Incoming files are streamed directly into a CryptoStream and encrypted bit by bit as .enc files. This ensures full encryption of sensitive deployment data without degrading backend RAM performance (Microsoft, 2026b).

### Dynamic Dashboard Engagement 📊

To prevent cognitive overload during high-throughput data surges, the UI integrates a **Historical Data Replay** widget which allows operators to pause realime streams and use a timeline scrubber to rewind and investigate telemetry spikes or sensor drops frame by frame (React, 2026).

---

## 4. Setup & Deployment Instructions ⚙️

### Quick Start (Docker Deployment - Recommended)

The most efficient way to compile and boot the entire application stack is through Docker Compose (Docker, 2026).

**1. Clone the repository:**

> git clone [https://github.com/yourusername/SmartX_POE.git](https://www.google.com/search?q=https://github.com/yourusername/SmartX_POE.git)
> cd SmartX_POE

**2. Build and boot the containers:**

> docker-compose up --build

**3. Access the Application:**

* Frontend Client: http://localhost:3000
* Backend API / Swagger: http://localhost:8080/swagger

### 🛠️ Manual Setup Instructions (Local Deployment)

**Booting the .NET Backend API:**

> cd BackendAPI
> dotnet restore
> dotnet build
> dotnet run

*Note: A local Uploads directory for AES-encrypted files will be generated upon the first submission.*

**Deploying the React Frontend Client:**

> cd FrontendClient
> npm install
> npm run build
> npm run dev

---

## 5. Reference List 📜

* **Docker**. 2026. *Docker Compose Overview*. [online] Available at: [https://docs.docker.com/compose/](https://docs.docker.com/compose/) [Accessed 14 September 2026].
* **Microsoft**. 2026a. *IEnumerable Interface*. [online] Available at: [https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1) [Accessed 14 September 2026].
* **Microsoft**. 2026b. *Cryptography in .NET*. [online] Available at: [https://learn.microsoft.com/en-us/dotnet/standard/security/cryptography-model](https://learn.microsoft.com/en-us/dotnet/standard/security/cryptography-model) [Accessed 14 September 2026].
* **React**. 2026. *Synchronizing with Effects*. [online] Available at: [https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects) [Accessed 14 September 2026].
