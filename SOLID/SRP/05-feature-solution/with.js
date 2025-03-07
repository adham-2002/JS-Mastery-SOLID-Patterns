class OrderProcessor {
  constructor(paymentService, emailService, orderRepository) {
    this.paymentService = paymentService;
    this.emailService = emailService;
    this.orderRepository = orderRepository;
  }

  processOrder(order) {
    OrderValidator.validate(order);
    const total = OrderCalculator.calculateTotal(order);
    this.paymentService.processPayment(order, total, "payment");
    this.orderRepository.save(order);
    this.emailService.sendConfirmationEmail(order, "orderConfirmed");
  }

  refundOrder(order) {
    console.log(`Cancelling order ${order.id}...`);
    const total = OrderCalculator.calculateTotal(order);
    this.paymentService.processPayment(order, total, "refund");
    this.emailService.sendConfirmationEmail(order, "orderRefunded");
  }
}

class PaymentService {
  processPayment(order, total, type) {
    switch (type) {
      case "payment":
        console.log(
          `Processing payment of $${total} via ${order.paymentMethod}...`
        );
        console.log(`Payment successful for order ${order.id}`);
        break;
      case "refund":
        console.log(
          `Refunding payment of $${total} via ${order.paymentMethod}...`
        );
        console.log(`Refund successful for order ${order.id}`);
        break;
      default:
        console.log(`Unknown payment operation: ${type}`);
    }
  }
}

class EmailService {
  sendConfirmationEmail(order, type) {
    switch (type) {
      case "orderConfirmed":
        console.log(`Sending confirmation email for order ${order.id}...`);
        break;
      case "orderRefunded":
        console.log(
          `Sending refund confirmation email for order ${order.id}...`
        );
        break;
      default:
        console.log(`Unknown email type: ${type}`);
    }
  }
}

class OrderCalculator {
  static calculateTotal(order) {
    return order.items.reduce((total, item) => total + item.price, 0);
  }
}

class OrderValidator {
  static validate(order) {
    if (!order || !order.items || order.items.length === 0) {
      throw new Error("Invalid order: Order must contain items.");
    }
  }
}

class OrderRepository {
  save(order) {
    console.log(`Saving order ${order.id} to database...`);
  }
}

// 🛠️ Testing the system
const order = {
  id: 1,
  items: [
    { name: "Book", price: 20 },
    { name: "Pen", price: 5 },
  ],
  paymentMethod: "Credit Card",
};

const paymentService = new PaymentService();
const emailService = new EmailService();
const orderRepository = new OrderRepository();

const processor = new OrderProcessor(
  paymentService,
  emailService,
  orderRepository
);
processor.processOrder(order);
processor.refundOrder(order);
// !👍 Now, each class has a single responsibility, and the OrderProcessor class coordinates the services to process orders and refunds.
