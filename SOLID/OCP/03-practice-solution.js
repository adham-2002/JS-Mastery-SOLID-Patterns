class PaymentProcessor {
  processPayment(order, amount) {
    throw new Error("Method 'processPayment()' must be implemented.");
  }
}
class creditCardPayment extends PaymentProcessor {
  processPayment(order, amount) {
    console.log(`Processing credit card payment of amount ${amount}`);
  }
}
class PaypalPayment extends PaymentProcessor {
  processPayment(order, amount) {
    console.log(`Processing PayPal payment of amount ${amount}`);
  }
}

class BitcoinPayment extends PaymentProcessor {
  processPayment(order, amount) {
    console.log(`Processing Bitcoin payment of amount ${amount}`);
  }
}

class InvalidPayment extends PaymentProcessor {
  processPayment(order, amount) {
    throw new Error("Invalid payment method");
  }
}
//! Test For OCP

(function testPaymentProcessor() {
  const order = { paymentMethod: "CREDIT_CARD" };
  const amount = 100;
  const creditCard = new creditCardPayment();
  creditCard.processPayment(order, amount);
})();
