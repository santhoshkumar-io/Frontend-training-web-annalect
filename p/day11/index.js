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
      employee.location != '')
    ) {
      this.employees.push(employee);
      console.log(this.employees);
    } else {
      console.log('Field Empty');
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const logic = new Logic();

  document.querySelector('#add-emp').addEventListener('click', () => {
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const deptId = document.querySelector('#dept-id').value;
    const location = document.querySelector('#location').value;
    logic.addEmployee({ id, name, deptId, location });
  });
});
class UILogic {}
