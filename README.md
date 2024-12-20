# Project Setup and Configuration Guide


## **1. Prerequisites**

- **Node.js**: Ensure you have Node.js installed on your system.
- **Yarn**: This project uses Yarn as the package manager. Install Yarn globally if you haven’t already:
  ```bash
  npm install -g yarn
  ```
- **PostgreSQL**: The project connects to a PostgreSQL database. Make sure you have access to a database or use the default configuration provided.

---

## **2. Configure the Project**

### **a. Configuring `config.yml`**

- Navigate to the `config` folder in the project directory.
- Open the `config.yml` file.
- Modify the database settings as required if you plan to use your own database configuration. Example:
  ```yaml
  database:
    host: "your-database-host"
    port: 5432
    user: "your-database-user"
    password: "your-database-password"
    dbname: "your-database-name"
  ```

### **b. Setting Up the `.env` File**

- Create a `.env` file in the root directory of the project.
- Add the following environment variable to the file:
  ```env
  DATABASE_URL="postgresql://neondb_owner:ZiA3wBbfVz0g@ep-spring-math-a21ukg78-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
  ```
  > *Note*: Replace this with your own database URL if needed.

---

## **3. Install Dependencies**

- Run the following command to install all required dependencies:
  ```bash
  yarn install
  ```

---

## **3.1 Create Db Migration**
- Run the following commands to create a migration and setup your empty database:
  ```bash
  npx prisma generate
  ```

---

## **4. Start the Development Server**

- To start the development server, use the following command:
  ```bash
  yarn start:dev
  ```
- The server will start in development mode. You can now access the application at the specified local or configured URL.

---






# FeedbackPosts API Documentation

This documentation provides a comprehensive guide on interacting with the FeedbackPosts API. The API enables users to create, read, update, delete, and vote on feedback posts.

---

## **Base URL**

```
http://localhost:8000/api/v1
```

---

# **Endpoints Overview**

## **FeedbackPost**

### **1. Get All Feedback Posts**

Retrieve a list of feedback posts.

**Method:** `GET`

**Endpoint:** `/feedbackPost/getAll`

#### **Query Parameters:**
- `category_name` *(optional)*: Filter posts by category name.
- `status` *(optional)*: Filter posts by status (`IDEA`, `PLANNED`, `IN_PROGRESS`, `COMPLETED`, `REJECTED`).
- `skip` *(optional)*: Number of items to skip (for pagination).
- `take` *(optional)*: Number of items to return.
- `sort_by` *(optional)*: Sort results by:
  - `DateAsc`
  - `DateDesc`
  - `UpvoteAsc`
  - `UpvoteDesc`

#### **Sample Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "created_at": "string",
    "updated_at": "string"
  }
]
```

---

### **2. Get Feedback Post by ID**

Retrieve a specific feedback post using its unique ID.

**Method:** `GET`

**Endpoint:** `/feedbackPost/getPost/{post_id}`

#### **Path Parameters:**
- `post_id` *(required)*: Unique identifier of the feedback post.

#### **Sample Response:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category_name": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

---

### **3. Create a Feedback Post**

Create a new feedback post with a title, description, and category.

**Requires** **authorization**
send Bearer token in headers

**Method:** `POST`

**Endpoint:** `/feedbackPost/create`

#### **Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "category_name": "string"
}
```

#### **Responses:**
- **201 Created:**
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "category_name": "string"
  }
  ```
- **400 Bad Request:** Missing or invalid parameters.
- **500 Internal Server Error:** Server error during creation.

---

### **4. Delete a Feedback Post**

Delete a feedback post by its ID.

**Method:** `DELETE`

**Endpoint:** `/feedbackPost/delete/{post_id}`

#### **Path Parameters:**

- `post_id` *(required)*: Unique identifier of the feedback post.

#### **Responses:**

- **200 OK:**
  ```json
  {
    "message": "Feedback post deleted successfully."
  }
  ```
- **404 Not Found:** Feedback post not found.
- **500 Internal Server Error:** Server error during deletion.

---

### **5. Update a Feedback Post**

Update a feedback post by providing its ID and the fields to update (title, description, category, and status).

**Method:** `PATCH`

**Endpoint:** `/feedbackPost/update/{post_id}`

#### **Path Parameters:**

- `post_id` *(required)*: Unique identifier of the feedback post.

#### **Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "category_name": "string",
  "status": "IDEA | PLANNED | IN_PROGRESS | COMPLETED | REJECTED"
}
```

#### **Responses:**

- **200 OK:**
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "category": {
      "id": "string",
      "name": "string"
    },
    "status": "IDEA | PLANNED | IN_PROGRESS | COMPLETED | REJECTED"
  }
  ```
- **400 Bad Request:** Invalid input data or missing fields.
- **404 Not Found:** Feedback post not found.
- **500 Internal Server Error:** Server error while updating the feedback post.

---

## **Feedback Post Upvote**
### **1. Toggle Upvote**

Toggle the upvote status for a feedback post. Requires authorization.

**Requires** **authorization**
send Bearer token in headers

**Method:** `GET`

**Endpoint:** `/feedbackPostUpvote/toggleUpvote/{post_id}`

#### **Path Parameters:**
- `post_id` *(required)*: Unique identifier of the feedback post.

#### **Responses:**
- **200 OK:** Upvote toggled successfully.
  ```json
  {
    "post_id": "string",
    "upvotes": "number",
    "status": "upvoted/unvoted"
  }
  ```
- **401 Unauthorized:** User not authorized.
- **404 Not Found:** Feedback post not found.

---

## **FeedbackPostCategory**
### **1. getAll**

## **Endpoint: Get All Feedback Post Categories**

Retrieve all available feedback post categories, including their IDs and names.

### **Method:** `GET`

### **Endpoint:** `/FeedbackPostCategory/getAll`

#### **Responses:**

- **200 OK:** Successfully retrieved all feedback post categories.
  
  ```json
  [
    {
      "id": "string",
      "name": "string"
    }
  ]
  ```

- **404 Not Found:** No categories found.

- **500 Internal Server Error:** Server error while retrieving categories.

