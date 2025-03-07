/**
 * File: dip_example.js
 * Run with: node dip_example.js
 */

// ❌ WRONG: High-level module depends on low-level module
// class MySQLDatabase {
//   saveUser(user) {
//     console.log(`Saving ${user.name} to MySQL`);
//   }
// }
// class UserService {
//   constructor() {
//     this.database = new MySQLDatabase();
//   }
//   createUser(user) {
//     this.database.saveUser(user);
//   }
// }

// ✅ CORRECT: Both depend on abstraction
class Database {
  saveUser(user) {
    throw new Error("Method not implemented");
  }
}

class MySQLDatabase extends Database {
  saveUser(user) {
    console.log(`Saving ${user.name} to MySQL`);
  }
}

class UserService {
  constructor(database) {
    this.database = database;
  }

  createUser(user) {
    this.database.saveUser(user);
  }
}

// Test for DIP
(function testDIP() {
  console.log("\n=== Testing DIP ===");
  const database = new MySQLDatabase();
  const userService = new UserService(database);
  userService.createUser({ name: "John Doe" });
})();
