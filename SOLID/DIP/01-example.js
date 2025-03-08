//h1  ❌ Violates DIP: High-level module depends on low-level module

// ❌ Low-level module (Concrete Database)
class OrderDatabase {
  saveOrder(order) {
    console.log("Order saved to SQL database:", order);
  }
}

// ❌ High-level module depends directly on low-level module
class OrderManagementService {
  constructor() {
    this.database = new OrderDatabase(); // ❌ Direct dependency
  }

  placeOrder(order) {
    console.log("Processing order:", order);
    this.database.saveOrder(order); // ❌ Tight coupling
  }
}

// ✅ Usage
const orderService = new OrderManagementService();
orderService.placeOrder({ id: 1, item: "Laptop", quantity: 1 });
//h2 ✅ Respects DIP: Both depend on abstraction
// ✅ Step 1: Create an abstraction (interface)
class IOrderDatabase {
  saveOrder(order) {
    throw new Error("saveOrder() must be implemented");
  }
}

// ✅ Step 2: Implement concrete database classes
class SqlOrderDatabase extends IOrderDatabase {
  saveOrder(order) {
    console.log("Order saved to SQL database:", order);
  }
}

class MongoOrderDatabase extends IOrderDatabase {
  saveOrder(order) {
    console.log("Order saved to MongoDB:", order);
  }
}

// ✅ Step 3: OrderManagementService depends on abstraction, not concrete class
class OrderManagementService {
  constructor(database) {
    this.database = database; // ✅ No direct dependency on a specific database
  }

  placeOrder(order) {
    console.log("Processing order:", order);
    this.database.saveOrder(order); // ✅ Works with any database
  }
}

// ✅ Usage: Easily switch between databases
const sqlService = new OrderManagementService(new SqlOrderDatabase());
sqlService.placeOrder({ id: 1, item: "Laptop", quantity: 1 });

const mongoService = new OrderManagementService(new MongoOrderDatabase());
mongoService.placeOrder({ id: 2, item: "Phone", quantity: 2 });
