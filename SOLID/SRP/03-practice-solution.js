// ✅ Service responsible for order-related operations
class OrderService {
  validate(order) {
    if (!order.items.length) throw new Error("No items in order");
    console.log("Order is valid");
  }

  calculateTotal(order) {
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    console.log(`Total amount for order ${order.id}: $${total}`);
    return total;
  }

  saveToDatabase(order) {
    console.log(`Saving order ${order.id} to database...`);
    console.log(`Order ${order.id} saved successfully`);
  }
}

// ✅ Service responsible for payments and refunds
class PaymentProcessor {
  processPayment(order, total) {
    console.log(
      `Processing payment of $${total} via ${order.paymentMethod}...`
    );
    console.log(`Payment successful for order ${order.id}`);
  }

  refundPayment(order, total) {
    console.log(`Refunding payment of $${total} for order ${order.id}...`);
    console.log(`Refund successful for order ${order.id}`);
  }
}

// ✅ Service responsible for sending notifications
class NotificationService {
  sendConfirmationEmail(order) {
    console.log(`Sending confirmation email for order ${order.id}...`);
    console.log(`Email sent successfully`);
  }
}

// ✅ Coordinator class that connects all services
class OrderProcessor {
  constructor() {
    this.orderService = new OrderService();
    this.paymentProcessor = new PaymentProcessor();
    this.notificationService = new NotificationService();
  }

  processOrder(order) {
    this.orderService.validate(order);
    const total = this.orderService.calculateTotal(order);
    this.paymentProcessor.processPayment(order, total);
    this.orderService.saveToDatabase(order);
    this.notificationService.sendConfirmationEmail(order);
  }

  cancelOrder(order) {
    console.log(`Cancelling order ${order.id}...`);
    const total = this.orderService.calculateTotal(order);
    this.paymentProcessor.refundPayment(order, total);
    console.log(`Order ${order.id} has been cancelled.`);
  }
}

// 🛠️ Testing the improved system
const order = {
  id: 1,
  items: [
    { name: "Book", price: 20 },
    { name: "Pen", price: 5 },
  ],
  paymentMethod: "Credit Card",
};

const processor = new OrderProcessor();
processor.processOrder(order); // ✅ Process order
processor.cancelOrder(order); // ✅ Refund payment
