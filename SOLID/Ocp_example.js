/**
 * File: ocp_example.js
 * Run with: node ocp_example.js
 */

// ❌ WRONG: Needs modification for new discount types
// class DiscountCalculator {
//   applyDiscount(price, type) {
//     switch(type) {
//       case 'SUMMER': return price * 0.9;
//       case 'BLACKFRIDAY': return price * 0.7;
//       default: return price;
//     }
//   }
// }

// ✅ CORRECT: Open for extension, closed for modification
class DiscountStrategy {
  apply(price) {
    throw new Error("Method not implemented");
  }
}

class SummerDiscount extends DiscountStrategy {
  apply(price) {
    return price * 0.9;
  }
}

class BlackFridayDiscount extends DiscountStrategy {
  apply(price) {
    return price * 0.7;
  }
}

class DiscountCalculator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  applyDiscount(price) {
    return this.strategy.apply(price);
  }
}

// Test for OCP
(function testOCP() {
  console.log("\n=== Testing OCP ===");
  const price = 100;

  const summerDiscountCalc = new DiscountCalculator(new SummerDiscount());
  const blackFridayDiscountCalc = new DiscountCalculator(
    new BlackFridayDiscount()
  );
  const noDiscountCalc = new DiscountCalculator(
    new (class extends DiscountStrategy {
      apply(price) {
        return price;
      }
    })()
  );

  console.log(`Original price: $${price}`);
  console.log(`Summer Discount: $${summerDiscountCalc.applyDiscount(price)}`);
  console.log(
    `Black Friday Discount: $${blackFridayDiscountCalc.applyDiscount(price)}`
  );
  console.log(`No Discount: $${noDiscountCalc.applyDiscount(price)}`);
})();
