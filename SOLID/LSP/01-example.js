//h1 ❌ violation of Liskov Substitution Principle as the calculateSalary method in the Employee class is overridden in the FullTimeEmployee and PartTimeEmployee classes
// class Employee {
//   constructor(name, hours) {
//     this.name = name;
//     this.hours = hours;
//   }
//   calculateSalary() {
//     return this.hours * 10;
//   }
// }
// class FullTimeEmployee extends Employee {
//   constructor(name, hours) {
//     super(name, hours);
//   }
//   calculateSalary() {
//     return this.hours * 20;
//   }
// }
// class PartTimeEmployee extends Employee {
//   constructor(name, hours) {
//     super(name, hours);
//   }
//   calculateSalary() {
//     return this.hours * 10;
//   }
// }
//h1 ✅ CORRECT: Refactor the classes to avoid violating the Liskov Substitution Principle
class salaryCalculator {
  calculateSalary() {
    throw new Error("Method 'calculateSalary()' must be implemented.");
  }
}
class Employee extends salaryCalculator {
  constructor(name, hours) {
    super();
    if (new.target === Employee) {
      throw new Error("Employee is an abstract class");
    }
    this.name = name;
    this.hours = hours;
  }
}
class FullTimeEmployee extends Employee {
  calculateSalary(employee) {
    return employee.hours * 20;
  }
}
class PartTimeEmployee extends Employee {
  calculateSalary(employee) {
    return employee.hours * 10;
  }
}
//! Test For LSP
(function testLSP() {
  console.log("=== Testing LSP ===");
  const fullTimeEmployee = new FullTimeEmployee("John Doe", 40);
  const partTimeEmployee = new PartTimeEmployee("Jane Doe", 20);
  const employees = [fullTimeEmployee, partTimeEmployee];
  employees.forEach((employee) => {
    console.log(
      `${employee.name}'s salary: $${employee.calculateSalary(employee)}`
    );
  });
})();
