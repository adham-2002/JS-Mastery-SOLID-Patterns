class OrderProcessor {
  processOrder(order) {
    this.validate(order);
    const total = this.calculateTotal(order);
    this.processPayment(order, total);
    this.saveToDatabase(order);
    this.sendConfirmationEmail(order);
  }
  //1 validate order
  validate(order) {
    if (!order.items.length) throw new Error("No items in order");
    console.log("Order is valid");
  }
  //2 calculate total
  calculateTotal(order) {
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    console.log(`Total amount for order ${order.id}: $${total}`);
    return total;
  }
  //3 process payment
  processPayment(order, total) {
    console.log(
      `Processing payment of $${total} via ${order.paymentMethod}...`
    );
    console.log(`Payment successful for order ${order.id}`);
  }
  //4 save to database
  saveToDatabase(order) {
    console.log(`Saving order ${order.id} to database...`);
    console.log(`Order ${order.id} saved successfully`);
  }
  //5 send confirmation email
  sendConfirmationEmail(order) {
    console.log(`Sending confirmation email for order ${order.id}...`);
    console.log(`Email sent successfully`);
  }
}
// ❌ Testing the wrong implementation
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
//! one class responsible for everything (validation, calculation, payment, saving, and notification)
