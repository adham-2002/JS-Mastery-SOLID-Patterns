// //h1 ❌ Violates ISP: Unnecessarily large interface
// class TaskManager {
//   createTask() {}
//   completeTask() {}
//   assignTask(user) {}
//   generateReport() {}
//   sendNotification(user) {}
// }

// // A simple task manager doesn't need assignTask or generateReport
// class SimpleTaskManager extends TaskManager {
//   assignTask(user) {
//     throw new Error("SimpleTaskManager does not support task assignment");
//   }

//   generateReport() {
//     throw new Error("SimpleTaskManager does not support report generation");
//   }
// }

//h2 ✅ Respects ISP: Smaller interfaces
// ✅ Core functionality
class TaskOperations {
  createTask() {
    console.log("Task created");
  }

  completeTask() {
    console.log("Task completed");
  }
}

// ✅ Additional features as separate classes
class Assignable {
  assignTask(user) {
    console.log(`Task assigned to ${user}`);
  }
}

class Reportable {
  generateReport() {
    console.log("Generating report...");
  }
}
class SendNotification {
  sendNotification(user) {
    console.log(`Notification sent to ${user}`);
  }
}

// ✅ Different managers only take what they need
class SimpleTaskManager extends TaskOperations {}

class TeamTaskManager extends TaskOperations {
  constructor() {
    super();
    this.assignable = new Assignable();
  }

  assignTask(user) {
    this.assignable.assignTask(user);
  }
}

class EnterpriseTaskManager extends TaskOperations {
  constructor() {
    super();
    this.assignable = new Assignable();
    this.reportable = new Reportable();
  }

  assignTask(user) {
    this.assignable.assignTask(user);
  }

  generateReport() {
    this.reportable.generateReport();
  }
}

// ✅ Usage
const simpleManager = new SimpleTaskManager();
simpleManager.createTask(); // ✅ Task created

const teamManager = new TeamTaskManager();
teamManager.assignTask("Alice"); // ✅ Task assigned to Alice

const enterpriseManager = new EnterpriseTaskManager();
enterpriseManager.generateReport(); // ✅ Generating report...
enterpriseManager.assignTask("Bob"); // ✅ Task assigned to Bob
