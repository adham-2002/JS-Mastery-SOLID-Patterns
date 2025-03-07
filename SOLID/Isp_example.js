/**
 * File: isp_example.js
 * Run with: node isp_example.js
 */

// ❌ WRONG: Fat interface
// class PaymentGateway {
//   processCreditCard() {}
//   processPayPal() {}
//   processCrypto() {}
// }

// ✅ CORRECT: Segregated interfaces
class CreditCardProcessor {
  processCreditCard(details) {
    console.log(`Processing credit card payment for $${details.amount}`);
  }
}

class PayPalProcessor {
  processPayPal(details) {
    console.log(`Processing PayPal payment for $${details.amount}`);
  }
}

class CryptoProcessor {
  processCrypto(details) {
    console.log(`Processing crypto payment for $${details.amount}`);
  }
}

// Test for ISP
(function testISP() {
  console.log("\n=== Testing ISP ===");
  const ccProcessor = new CreditCardProcessor();
  const paypalProcessor = new PayPalProcessor();
  const cryptoProcessor = new CryptoProcessor();

  ccProcessor.processCreditCard({ amount: 50 });
  paypalProcessor.processPayPal({ amount: 75 });
  cryptoProcessor.processCrypto({ amount: 100 });
})();
