/**
 * ! single responsibility principle
 * A class should have only one reason to change, meaning that a class should have only one job.
 * If a class has more than one responsibility, it becomes coupled and fragile.
 * A change to one responsibility results in modification of the other responsibility.
 */
//h1 ❌ WRONG: One class handling multiple responsibilities

// class OrderProcessor {
//   validate(order) {
//     if (!order.items.length) throw new Error("No items in order");
//   }
//   calculateTotal(order) {
//     return order.items.reduce((sum, item) => sum + item.price, 0);
//   }
//   saveToDatabase(order) {
//     console.log(`Order ${order.id} saved to database`);
//   }
//   sendConfirmationEmail(order) {
//     console.log(`Confirmation email sent for order ${order.id}`);
//   }
// }

//h1 ✅ CORRECT: Split responsibilities into separate classes
class OrderValidator {
  validate(order) {
    if (!order.items.length) throw new Error("No items in order");
  }
}
class OrderCalculator {
  calculateTotal(order) {
    return order.items.reduce((sum, item) => sum + item.price, 0);
  }
}
class OrderSaver {
  saveToDatabase(order) {
    console.log(`Order ${order.id} saved to database`);
  }
}
class EmailSender {
  sendConfirmationEmail(order) {
    console.log(`Confirmation email sent for order ${order.id}`);
  }
}
//! Test For SRP
(function testSRP() {
  console.log("=== Testing SRP ===");
  const order = {
    id: 1,
    items: [
      { name: "Book", price: 20 },
      { name: "Pen", price: 5 },
    ],
  };
  const validator = new OrderValidator();
  const calculator = new OrderCalculator();
  const repository = new OrderSaver();
  const notifier = new EmailSender();
  try {
    validator.validate(order);
    const total = calculator.calculateTotal(order);
    console.log(`Total amount for order ${order.id}: $${total}`);

    repository.saveToDatabase(order);
    notifier.sendConfirmationEmail(order);
  } catch (e) {
    console.error("Error processing order:", e.message);
  }
})();
