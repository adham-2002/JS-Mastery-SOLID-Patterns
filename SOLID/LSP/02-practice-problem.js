class Order {
  constructor(items, basePrice) {
    this.items = items;
    this.basePrice = basePrice;
  }

  getTotalPrice() {
    return this.basePrice;
  }
}
//! violation happen here
class DeliveryOrder extends Order {
  constructor(items, basePrice, deliveryFee) {
    super(items, basePrice);
    this.deliveryFee = deliveryFee;
  }

  getTotalPrice() {
    return this.basePrice + this.deliveryFee;
  }
}

class PickupOrder extends Order {
  constructor(items, basePrice) {
    super(items, basePrice);
  }

  getTotalPrice() {
    return this.basePrice;
  }
}

//! اختبار التمرين
(function testLSP() {
  const deliveryOrder = new DeliveryOrder(["Item1", "Item2"], 100, 10);
  const pickupOrder = new PickupOrder(["Item1", "Item2"], 100);

  console.log("Delivery Order Total Price:", deliveryOrder.getTotalPrice()); // 110
  console.log("Pickup Order Total Price:", pickupOrder.getTotalPrice()); // 100
})();
