// 🔹 واجهة لحساب السعر
class PriceCalculable {
  getTotalPrice(basePrice) {
    throw new Error("Method 'getTotalPrice()' must be implemented.");
  }
}

// 🔹 الحساب العادي بدون رسوم إضافية
class StandardPricing extends PriceCalculable {
  getTotalPrice(basePrice) {
    return basePrice;
  }
}

// 🔹 الحساب مع رسوم التوصيل
class DeliveryPricing extends PriceCalculable {
  constructor(deliveryFee) {
    super();
    this.deliveryFee = deliveryFee;
  }

  getTotalPrice(basePrice) {
    return basePrice + this.deliveryFee;
  }
}

// 🔹 الطلب الأساسي بدون أي تغييرات على منطق السعر
class Order {
  constructor(items, basePrice, pricingStrategy) {
    this.items = items;
    this.basePrice = basePrice;
    this.pricingStrategy = pricingStrategy; // استراتيجية التسعير
  }

  getTotalPrice() {
    return this.pricingStrategy.getTotalPrice(this.basePrice);
  }
}

//! ✅ اختبار الحل النهائي
(function testLSP() {
  const deliveryOrder = new Order(
    ["Item1", "Item2"],
    100,
    new DeliveryPricing(10)
  );
  const pickupOrder = new Order(["Item1", "Item2"], 100, new StandardPricing());

  console.log("Delivery Order Total Price:", deliveryOrder.getTotalPrice()); // 110 ✅
  console.log("Pickup Order Total Price:", pickupOrder.getTotalPrice()); // 100 ✅
})();
