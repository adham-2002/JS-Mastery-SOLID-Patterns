// ✅ Handles only user management
class UserManager {
  registerUser(name, email) {
    console.log(`User registered: ${name} (${email})`);
  }

  deleteUser(userId) {
    console.log(`User with ID ${userId} deleted`);
  }
}

// ✅ Handles subscription-related features separately
class SubscriptionManager {
  subscribeUser(userId) {
    console.log(`User with ID ${userId} subscribed`);
  }

  cancelSubscription(userId) {
    console.log(`Subscription canceled for user ID ${userId}`);
  }
}

// ✅ AdminUser only needs user management, no subscription
class AdminUser extends UserManager {}

// ✅ RegularUser only needs user management
class RegularUser extends UserManager {}

// ✅ SubscriberUser needs both user management and subscription
class SubscriberUser extends UserManager {
  constructor() {
    super();
    this.subscription = new SubscriptionManager();
  }

  subscribeUser(userId) {
    this.subscription.subscribeUser(userId);
  }

  cancelSubscription(userId) {
    this.subscription.cancelSubscription(userId);
  }
}

// ✅ Usage
const admin = new AdminUser();
admin.registerUser("Alice", "alice@example.com"); // ✅ Works
// admin.subscribeUser(1); ❌ Admins can't subscribe anymore

const regularUser = new RegularUser();
regularUser.registerUser("Bob", "bob@example.com"); // ✅ Works
// regularUser.subscribeUser(2); ❌ Regular users can't subscribe

const subscriber = new SubscriberUser();
subscriber.registerUser("Charlie", "charlie@example.com"); // ✅ Works
subscriber.subscribeUser(3); // ✅ Works
subscriber.cancelSubscription(3); // ✅ Works
