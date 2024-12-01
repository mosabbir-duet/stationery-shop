# Stationery Shop :pencil:

- [Live Server](https://stationery-shop-server-chi.vercel.app)

This project is to develop a robust backend API for managing a Stationery Shop using `Express` and `TypeScript`, integrated with `MongoDB` via `Mongoose` for seamless CRUD operations. The API ensures data integrity with `Mongoose` schema validation and employs Zod for validating incoming API requests to maintain high-quality data inputs. It includes comprehensive error handling to deliver reliable and secure operations.

## Project Highlights

- **Product and Order Management:** Streamlined endpoints for adding, viewing,updating,deleting, and searching stationery products, along with managing customer orders and automated computation of total revenue generated from completed order.
- **Centralized Error Management:** Consistent and reliable error handling through a UnifiedError class, managing issues related to `schema validation`, `database operations`, and other potential failures.

---

## Features

### Stationery Product Management

- Create, read, update, and delete stationery product.
- Search stationery prodct by `name`, `brand`, or `category`.
- Supports categories such as Writing, Office Supplies, Art Supplies, Educational, Technology.

### Order Management

- Place orders with customer `email` and product (stationery) `id`.
- Automatically adjust stock quantities and availability based on orders.
- Prevent orders if the number of quantity is greater than product quantity.

### Revenue Insights

- Calculate total revenue from all orders using MongoDB aggregation.

### Error Handling

- Unified error responses for `validation` (mostly `zod` and `MongoDB`), `email duplication`, `casting` (MongoDB `ObjectId`), `parsing`, `insufficient`, `not found` and almost every possible types of errors.

- Clear and structured error messages to facilitate debugging.

---

## Technologies (Packages) Used

- `TypeScript`
- `Node.js`
- `Express.js`
- `Mongoose`
- `cors`
- `dotenv`

## Run the Server Locally

### Prerequisites

- Node.js (v20+)
- `pnpm` package manager
- if you prefer `npm` or `yarn`, delete `pnpm-lock.yaml` file and follow the following steps

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mosabbir-duet/stationery-shop.git
   cd stationery-shop
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   for `npm`:

   ```bash
   npm install
   ```

   for `yarn`:

   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following fields:

   ```env
   PORT=5000
   MONGO_URI=your_mongo_db_uri
   ```

4. Start the server:

   ```bash
   pnpm start
   ```

   for `npm`:

   ```bash
   npm start
   ```

   for `yarn`:

   ```bash
   yarn start
   ```

5. Access the API at:

   ```bash
   http://localhost:5000
   ```

---

### **1. Create a Stationery Product**

- **Endpoint:** **`/api/products`**
- **Method:** `POST`
- **Request Body:**

```json
{
  "name": "Notebook",
  "brand": "Moleskine",
  "price": 15,
  "category": "Office Supplies",
  "description": "A high-quality notebook for professionals.",
  "quantity": 200,
  "inStock": true
}
```

- **Response:**

```json
{
  "message": "Product created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

---

### **2. Get All Stationery Products**

- **Endpoint:** **`/api/products`**
- **Method:** `GET`
- **Query Perameter:** `searchTerm`
- **Query Example:** `/api/products?searchTerm=value of field` (`searchTerm` can be any partial value of `name`, `brand`, `category`)

- **Response:**

```json
{
  "message": "Products retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Notebook",
      "brand": "Moleskine",
      "price": 15,
      "category": "Office Supplies",
      "description": "A high-quality notebook for professionals.",
      "quantity": 200,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```

---

### **3. Get a Specific Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `GET`
- **Response:**

```json
{
  "message": "Product retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

---

### **4. Update a Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `PUT`
- **Request Body:** (contains field to update)

```json
{
  "price": 18,
  "quantity": 180
}
```

- **Response:**

```json
{
  "message": "Product updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 18, // Price updated
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 180, // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z" // Updated timestamp
  }
}
```

---

### **5. Delete a Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `DELETE`
- **Response:**

```json
{
  "message": "Product deleted successfully",
  "status": true,
  "data": {}
}
```

---

### **6. Order a Stationery Product**

- **Endpoint:** **`/api/orders`**
- **Method:** `POST`
- **Request Body:**

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 36
}
```

- **Response:**

```json
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 36,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z"
  }
}
```

---

### **7. Calculate Revenue from Orders (Aggregation)**

- **Endpoint:** **`/api/orders/revenue`**
- **Method:** `GET`
- **Response:** The total revenue from all orders.

```json
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 720
  }
}
```
