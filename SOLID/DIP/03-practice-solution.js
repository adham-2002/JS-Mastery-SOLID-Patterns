class IPaymentProcessor {
  processPayment(amount) {
    throw new Error("processPayment() must be implemented");
  }
}
class StripeAPI extends IPaymentProcessor {
  processPayment(amount) {
    console.log(`Processing $${amount} payment through Stripe.`);
  }
}
class PayPalAPI extends IPaymentProcessor {
  processPayment(amount) {
    console.log(`Processing $${amount} payment through PayPal.`);
  }
}
class PaymentService {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  makePayment(amount) {
    this.paymentProcessor.processPayment(amount);
  }
}
// ✅ Usage: Easily switch between payment processors
const stripeService = new PaymentService(new StripeAPI());
stripeService.makePayment(100);

const paypalService = new PaymentService(new PayPalAPI());
paypalService.makePayment(200);
