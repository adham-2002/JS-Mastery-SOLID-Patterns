//! this class violate the open-closed principle if you want to add a new payment method you have to modify the class
class PaymentProcessor {
  processPayment(order, amount) {
    if (order.paymentMethod === "CREDIT_CARD") {
      console.log(`Processing credit card payment of amount ${amount}`);
    } else if (order.paymentMethod === "PAYPAL") {
      console.log(`Processing PayPal payment of amount ${amount}`);
    } else if (order.paymentMethod === "BITCOIN") {
      console.log(`Processing Bitcoin payment of amount ${amount}`);
    } else {
      throw new Error("Invalid payment method");
    }
  }
}
//! Refactor the class to follow the open-closed principle =>
