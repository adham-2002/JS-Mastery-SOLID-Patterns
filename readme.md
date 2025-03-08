# SOLID Principles and Design Patterns Repository

A comprehensive collection of examples and practice problems to master SOLID principles and design patterns in software development.

## 📂 Repository Structure

```yaml
design-patterns/ # (To be populated with design patterns examples)
solid/
├── SRP/ # Single Responsibility Principle
│ ├── example.js
│ ├── practice-problem.js
│ └── practice-solution.js
├── OCP/ # Open/Closed Principle
│ ├── example.js
│ ├── practice-problem.js
│ └── practice-solution.js
├── LSP/ # Liskov Substitution Principle
│ ├── example.js
│ ├── practice-problem.js
│ └── practice-solution.js
├── ISP/ # Interface Segregation Principle
│ ├── example.js
│ ├── practice-problem.js
│ └── practice-solution.js
└── DIP/ # Dependency Inversion Principle
├── example.js
├── practice-problem.js
└── practice-solution.js
```

## 🧠 S-O-L-I-D Principles Explained

### 1. SRP (Single Responsibility Principle)

**Principle**: A class should have only one reason to change  
**❌ Violation**:

```javascript
class OrderProcessor {
  processOrder(order) {
    this.validate(order);
    const total = this.calculateTotal(order);
    this.processPayment(order, total);
    this.saveToDatabase(order);
    this.sendConfirmationEmail(order);
  }

  // 5 responsibilities in one class
  validate(order) {
    /* validation logic */
  }
  calculateTotal(order) {
    /* calculation logic */
  }
  processPayment(order) {
    /* payment processing */
  }
  saveToDatabase(order) {
    /* database operations */
  }
  sendConfirmationEmail(order) {
    /* email notifications */
  }
}
```

**Problem**: Single class handles order validation, calculations, payments, persistence, and notifications.

**✅ Solution**:

```javascript
class OrderService {
  validate(order) {
    /* validation logic */
  }
  calculateTotal(order) {
    /* calculation logic */
  }
  saveToDatabase(order) {
    /* database operations */
  }
}

class PaymentProcessor {
  processPayment(order) {
    /* payment processing */
  }
  refundPayment(order) {
    /* refund logic */
  }
}

class NotificationService {
  sendConfirmationEmail(order) {
    /* email notifications */
  }
}
```

**Fix**: Split into 3 specialized classes each handling one responsibility.

---

### 2. OCP (Open/Closed Principle)

**Principle**: Open for extension, closed for modification  
**❌ Violation**:

```javascript
class DiscountCalculator {
  calculateDiscount(productType, price) {
    if (productType === "electronics") return price * 0.1;
    if (productType === "clothing") return price * 0.2;
    // Requires modification for new product types
  }
}
```

**Problem**: Adding new discount types requires changing existing class.

**✅ Solution**:

```javascript
class DiscountStrategy {
  applyDiscount(price) {
    throw new Error("Must implement applyDiscount()");
  }
}

class ElectronicsDiscount extends DiscountStrategy {
  applyDiscount(price) {
    return price * 0.9;
  }
}

class FurnitureDiscount extends DiscountStrategy {
  applyDiscount(price) {
    return price * 0.7;
  }
}
```

**Fix**: New discounts extend base class without modifying existing code.

---

### 3. LSP (Liskov Substitution Principle)

**Principle**: Subtypes must be substitutable for base types  
**❌ Violation**:

```javascript
class Employee {
  constructor(hours) {
    this.hours = hours;
  }
  calculateSalary() {
    return this.hours * 10;
  }
}

class FullTimeEmployee extends Employee {
  calculateSalary() {
    return this.hours * 20;
  } // Different calculation
}
```

**Problem**: Subclass changes salary calculation formula unexpectedly.

**✅ Solution**:

```javascript
class SalaryCalculator {
  calculateSalary() {
    throw new Error("Implement calculateSalary()");
  }
}

class FullTimeCalculator extends SalaryCalculator {
  calculateSalary(hours) {
    return hours * 20;
  }
}

class PartTimeCalculator extends SalaryCalculator {
  calculateSalary(hours) {
    return hours * 10;
  }
}
```

**Fix**: Salary calculation delegated to separate hierarchy.

---

### 4. ISP (Interface Segregation Principle)

**Principle**: Clients shouldn't depend on unused interfaces  
**❌ Violation**:

```javascript
class UserManager {
  registerUser() {}
  deleteUser() {}
  subscribeUser() {} // Not needed by all users
  cancelSubscription() {}
}
```

**Problem**: Admin users inherit unnecessary subscription methods.

**✅ Solution**:

```javascript
class UserOperations {
  registerUser() {}
  deleteUser() {}
}

class SubscriptionManager {
  subscribeUser() {}
  cancelSubscription() {}
}
```

**Fix**: Split into granular interfaces based on client needs.

---

### 5. DIP (Dependency Inversion Principle)

**Principle**: Depend on abstractions, not concretions  
**❌ Violation**:

```javascript
class OrderDatabase {
  saveOrder(order) {
    console.log("Saved to SQL");
  }
}

class OrderManagementService {
  constructor() {
    this.database = new OrderDatabase(); // Direct dependency
  }
}
```

**Problem**: High-level service tightly coupled to SQL implementation.

**✅ Solution**:

```javascript
class IOrderDatabase {
  saveOrder(order) {
    throw new Error("Implement saveOrder()");
  }
}

class MongoOrderDatabase extends IOrderDatabase {
  saveOrder(order) {
    console.log("Saved to MongoDB");
  }
}

class OrderManagementService {
  constructor(database) {
    // Abstraction dependency
    this.database = database;
  }
}
```

**Fix**: Service depends on database interface, not concrete implementation.

## 🚀 How to Use This Repository

1. **Study Examples**: Each principle has an `example.js` demonstrating both violation and solution.
2. **Solve Practice Problems**: Try the `practice-problem.js` files to fix violations.
3. **Check Solutions**: Compare your work with `practice-solution.js` files.

## 📚 Prerequisites

- Basic JavaScript knowledge
- Understanding of object-oriented programming
- Familiarity with software design concepts

## 🎯 Conclusion

Master these principles to:

- Write more maintainable code
- Create flexible architectures
- Reduce code coupling
- Improve testability
- Handle changing requirements effectively

**Happy Coding!** 🚀
