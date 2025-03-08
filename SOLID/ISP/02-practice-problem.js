// ❌ Violates ISP: Forces all user types to have subscription methods
class UserManager {
  registerUser(name, email) {
    console.log(`User registered: ${name} (${email})`);
  }

  deleteUser(userId) {
    console.log(`User with ID ${userId} deleted`);
  }

  subscribeUser(userId) {
    console.log(`User with ID ${userId} subscribed`);
  }

  cancelSubscription(userId) {
    console.log(`Subscription canceled for user ID ${userId}`);
  }
}

// ❌ Even admins inherit subscription-related methods (which they don't need)
class AdminUser extends UserManager {}

// ❌ Regular users inherit all methods, even if they don’t use subscriptions
class RegularUser extends UserManager {}

// ❌ Subscribers also inherit user management features, which might not be necessary
class SubscriberUser extends UserManager {}

// ✅ Usage
const admin = new AdminUser();
admin.registerUser("Alice", "alice@example.com"); // ✅ Okay
admin.subscribeUser(1); // ❌ Admins don't need subscription features!
