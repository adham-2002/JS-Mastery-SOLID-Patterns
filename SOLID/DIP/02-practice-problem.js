// ❌ Low-level module (Concrete Payment API)
class StripeAPI {
  processPayment(amount) {
    console.log(`Processing $${amount} payment through Stripe.`);
  }
}

// ❌ High-level module depends directly on StripeAPI
class PaymentService {
  constructor() {
    this.paymentProcessor = new StripeAPI(); // ❌ Direct dependency
  }

  makePayment(amount) {
    this.paymentProcessor.processPayment(amount); // ❌ Tight coupling
  }
}

// ✅ Usage
const paymentService = new PaymentService();
paymentService.makePayment(100); // ✅ Works, but what if we want to switch to PayPal?
