//! what is the changes ?
/**
 * 1. we need to add new method for refunding the order
 * 2. need to edit the confirmation email to send different messages for refunds
 * 3. need to edit the payment processing to handle both payments and refunds
 */
//! i will ask you what happen if we add new payment what changes we need to do ?
class OrderProcessor {
  processOrder(order) {
    this.validate(order);
    const total = this.calculateTotal(order);
    this.processPayment(order, total, "payment");
    this.saveToDatabase(order);
    this.sendConfirmationEmail(order, "orderConfirmed");
  }

  refundOrder(order) {
    console.log(`Cancelling order ${order.id}...`);
    const total = this.calculateTotal(order);
    this.processPayment(order, total, "refund");
    this.sendConfirmationEmail(order, "orderRefunded");
  }

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

  calculateTotal(order) {
    return order.items.reduce((total, item) => total + item.price, 0);
  }

  validate(order) {
    if (!order || !order.items || order.items.length === 0) {
      throw new Error("Invalid order: Order must contain items.");
    }
  }

  saveToDatabase(order) {
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
const processor = new OrderProcessor();
processor.processOrder(order);
processor.refundOrder(order);
