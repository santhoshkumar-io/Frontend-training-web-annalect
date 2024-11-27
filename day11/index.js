class Employee {
  constructor(id, name, deptId, location) {
    this.id = id;
    this.name = name;
    this.deptId = deptId;
    this.location = location;
  }
}
class Logic {
  constructor() {
    this.employees = [];
  }
  addEmployee(employee) {
    if (
      (employee.id != '',
      employee.name != '',
      employee.deptId != '',
      employee.location != '') &&
      this.employees.find(e => e.id == employee.id)
    ) {
      this.employees.push(employee);
      console.log(this.employees);
    } else {
      console.log('Field Empty');
    }
  }
  updateEmployee(updatedEmployee) {
    const employeeToUpdate = this.employees.find(
      element => (element.id = updatedEmployee).id
    );
    if (employeeToUpdate) {
      employeeToUpdate.name = updatedEmployee.name;
      employeeToUpdate.deptId = updatedEmployee.deptId;
      employeeToUpdate.location = updatedEmployee.location;
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const logic = new Logic();
  const uiLogic = new UIController(logic);

  document.querySelector('#add-emp').addEventListener('click', () => {
    uiLogic.tryAddingEmployee();
  });
});
class UIController {
  constructor(empLogic) {
    this.empLogic = empLogic;
  }
  tryAddingEmployee() {
    const employee = this.getEmployeeDetails();
    this.empLogic.addEmployee(employee);
  }
  tryUpdateingEmployee() {
    const employee = this.getEmployeeDetails();
    this.empLogic.updateEmployee(employee);
  }
  getEmployeeDetails() {
    return new Employee(
      document.querySelector('#id').value,
      document.querySelector('#name').value,
      document.querySelector('#dept-id').value,
      document.querySelector('#location').value
    );
  }
  resetInputVal() {
    (document.querySelector('#id').value = ''),
      (document.querySelector('#name').value = ''),
      (document.querySelector('#dept-id').value = ''),
      (document.querySelector('#location').value = '');
  }
  displayEmployeeDetails() {
    const empList = document.querySelector('#emp-list');
    empList.textContent = '';
    this.empLogic.employees.forEach(element => {
      const listItem = document.createElement('li');
      listItem.textContent = `${element.name} (${element.id}) is working in ${element.deptId} department at ${element.location}`;
      empList.appendChild(listItem);
    });
  }
}
