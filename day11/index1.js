class Employee {
  constructor(id, name, depId, location) {
    this.id = id;
    this.name = name;
    this.depId = depId;
    this.location = location;
  }
}

class EmployeeController {
  constructor() {
    this.employees = [
      { id: 1, name: 'santhosh', depId: '20', location: 'CJB' },
    ];
  }

  addEmployee(employee) {
    if (this.employees.find(e => e.id == employee.id)) {
      return false;
    }
    this.employees.push(employee);
    return true;
  }

  updateEmployee(updatedEmployee) {
    const employeeToUpdate = this.employees.find(
      e => e.id == updatedEmployee.id
    );

    if (employeeToUpdate) {
      employeeToUpdate.name = updatedEmployee.name;
      employeeToUpdate.depId = updatedEmployee.depId;
      employeeToUpdate.location = updatedEmployee.location;
      console.log(employeeToUpdate);
      return true;
    }

    return false;
  }

  findExistingEmployee(id) {
    return this.employees.find(e => e.id == id);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const empLogic = new EmployeeController();
  const uiLogic = new UIController(empLogic);
  const empId = document.getElementById('empNo');
  const button = document.getElementById('addOrUpd');

  uiLogic.displayEmployeeList();

  empId.addEventListener('change', () => {
    if (empLogic.findExistingEmployee(empId.value)) {
      button.textContent = 'Update';
      uiLogic.updateInputValues(empId.value);
    }
    button.textContent = 'Add';
  });

  button.addEventListener('click', () => {
    if (button.textContent == 'Update') {
      uiLogic.tryUpdatingEmployee();
      uiLogic.displayEmployeeList();
      uiLogic.resetInputs();
    }
    if (button.textContent == 'Add') {
      uiLogic.tryAddingEmployee();
      uiLogic.displayEmployeeList();
      uiLogic.resetInputs();
    }
  });
});

class UIController {
  constructor(emplogic) {
    this.empLogic = emplogic;
  }
  updateInputValues(id) {
    const employee = this.empLogic.findExistingEmployee(id);

    document.getElementById('empName').value = employee.name;
    document.getElementById('deptId').value = employee.depId;
    document.getElementById('location').value = employee.location;
  }

  tryUpdatingEmployee() {
    const employee = this.getEmployeeDetails();

    this.empLogic.updateEmployee(employee);
  }

  tryAddingEmployee() {
    const employee = this.getEmployeeDetails();
    this.empLogic.addEmployee(employee);
  }

  getEmployeeDetails() {
    return new Employee(
      document.getElementById('empNo').value,
      document.getElementById('empName').value,
      document.getElementById('deptId').value,
      document.getElementById('location').value
    );
  }

  resetInputs() {
    document.getElementById('empNo').value = '';
    document.getElementById('empName').value = '';
    document.getElementById('deptId').value = '';
    document.getElementById('location').value = '';
  }
  displayEmployeeList() {
    const empList = document.getElementById('empList');
    empList.textContent = '';

    this.empLogic.employees.forEach(element => {
      const listItem = document.createElement('li');
      listItem.textContent = `${element.name} - ${element.id} - ${element.depId} -${element.location}`;
      empList.appendChild(listItem);
    });
  }
}
