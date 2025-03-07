/**
 * File: lsp_example.js
 * Run with: node lsp_example.js
 */

// ❌ WRONG: Subclass violates parent contract
// class FileStorage {
//   read(file) {
//     console.log(`Reading ${file}`);
//   }
// }
// class EncryptedFileStorage extends FileStorage {
//   read(file) {
//     throw new Error('Must decrypt first');
//   }
// }

// ✅ CORRECT: Subclass maintains parent behavior
class FileStorage {
  read(file) {
    console.log(`Reading ${file}`);
  }
}

class SecureFileStorage extends FileStorage {
  decrypt(file) {
    console.log(`Decrypting ${file}`);
  }

  read(file) {
    this.decrypt(file);
    super.read(file);
  }
}

// Test for LSP
(function testLSP() {
  console.log("\n=== Testing LSP ===");
  const storage = new SecureFileStorage();
  storage.read("example.txt");
})();
