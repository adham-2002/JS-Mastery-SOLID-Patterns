//h1 ❌ Wrong Implementation: Violates OCP by modifying existing class
// class DiscountCalculator {
//   calculateDiscount(price, productType) {
//     if (productType === "electronics") {
//       console.log("Applying 10% discount on electronics");
//       return price * 0.1;
//     } else if (productType === "clothing") {
//       console.log("Applying 20% discount on clothing");
//       return price * 0.2;
//     } else if (productType === "furniture") {
//       console.log("Applying 30% discount on furniture");
//       return price * 0.3;
//     } else {
//       console.log("No discount applied");
//       return price;
//     }
//   }
// }
//h1 ✅ CORRECT: Open for extension closed for modification by adding new class
//h2 note we don't have interface in js so we use abstract class
class DiscountStrategy {
  calculateDiscount(price) {
    throw new Error("Method 'calculateDiscount()' must be implemented.");
  }
}
class ElectronicsDiscount extends DiscountStrategy {
  applyDiscount(price) {
    console.log("Applying 10% discount on electronics");
    return price * 0.9;
  }
}
class ClothingDiscount extends DiscountStrategy {
  applyDiscount(price) {
    console.log("Applying 20% discount on clothing");
    return price * 0.8;
  }
}
class FurnitureDiscount extends DiscountStrategy {
  applyDiscount(price) {
    console.log("Applying 30% discount on furniture");
    return price * 0.7;
  }
}
class NoDiscount extends DiscountStrategy {
  applyDiscount(price) {
    console.log("No discount applied");
    return price;
  }
}
//! Test For OCP
(function testDiscounts() {
  const productPrices = {
    electronics: 100,
    clothing: 100,
    furniture: 100,
    other: 100,
  };
  const electronicsDiscount = new ElectronicsDiscount();
  const clothingDiscount = new ClothingDiscount();
  const furnitureDiscount = new FurnitureDiscount();
  const noDiscount = new NoDiscount();
  console.log("=== Testing OCP ===");
  console.log(
    `Price after discount: $${electronicsDiscount.applyDiscount(
      productPrices.electronics
    )}`
  );
  console.log(
    `Price after discount: $${clothingDiscount.applyDiscount(
      productPrices.clothing
    )}`
  );
  console.log(
    `Price after discount: $${furnitureDiscount.applyDiscount(
      productPrices.furniture
    )}`
  );
  console.log(
    `Price after discount: $${noDiscount.applyDiscount(productPrices.other)}`
  );
})();
