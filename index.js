const employeeForm = document.querySelector("#employeeForm");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const salaryInput = document.querySelector("#salary");
const hireDateInput = document.querySelector("#hireDate");
const employeeTable = document.querySelector("#employeeTable tbody");
const editButton = document.querySelector("#editButton");
const fireButton = document.querySelector("#fireButton");
const fireAllButton = document.querySelector("#fireAllButton");
const modal = document.querySelector("#modal");
const banner = document.querySelector("#banner");
const modalWrapper = document.querySelector("#modalWrapper");
const sort = document.querySelector("sort");

// Получение данных с localStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];

const renderTable = () => {
  employeeTable.innerHTML = "";

  employees.forEach((employee, index) => {
    employeeTable.innerHTML += `<tr>
      <td><input type="checkbox" id="${index}"></td>
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.salary}</td>
      <td>${employee.hireDate}</td><tr>
    `;
  });
};

// Добавление сотрудника
const addEmployee = (event) => {
  event.preventDefault();

  const employee = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    salary: salaryInput.value,
    hireDate: hireDateInput.value,
  };

  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderTable();
  employeeForm.reset();
};

// Редактирование сотрудника
const editEmployee = () => {
  const checkedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  if (checkedCheckboxes.length > 1) {
    alert("Можно редактировать только одного сотрудника!");
    return;
  }

  const index = +checkedCheckboxes[0].id;
  const employee = employees[index];

  modal.innerHTML = `
    <h2>Редактирование сотрудника</h2>
    <form id="editForm">
      <input type="text" id="editFirstName" value="${employee.firstName}" required>
      <input type="text" id="editLastName" value="${employee.lastName}" required>
      <input type="number" id="editSalary" value="${employee.salary}" required>
      <input type="date" id="editHireDate" value="${employee.hireDate}" required>
      <button type="submit">Сохранить</button>
    </form>
  `;
  modalWrapper.style.display = "block";

  const editForm = document.querySelector("#editForm");
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    employee.firstName = document.querySelector("#editFirstName").value;
    employee.lastName = document.querySelector("#editLastName").value;
    employee.salary = document.querySelector("#editSalary").value;
    employee.hireDate = document.querySelector("#editHireDate").value;

    localStorage.setItem("employees", JSON.stringify(employees));
    modalWrapper.style.display = "none";
    renderTable();
  });
};

// Увольнение сотрудников
const fireEmployees = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      employees.splice(checkbox.index, 1);
    }
  });

  localStorage.setItem("employees", JSON.stringify(employees));
  renderTable();
};

// Увольнение всех сотрудников
function fireAllEmployees() {
  employees = [];
  localStorage.removeItem("employees");
  renderTable();
}

employeeForm.addEventListener("submit", addEmployee);
editButton.addEventListener("click", editEmployee);
fireButton.addEventListener("click", fireEmployees);
fireAllButton.addEventListener("click", fireAllEmployees);

//фильтр
let salarySortOrder = 0;
let hireDateSortOrder = 0;
document
  .querySelector("#employeeTable th:nth-child(4) .sort")
  .addEventListener("click", function () {
    if (salarySortOrder === 0) {
      employees.sort(function (a, b) {
        return a.salary - b.salary;
      });
      salarySortOrder = 1;
    } else {
      employees.sort(function (a, b) {
        return b.salary - a.salary;
      });
      salarySortOrder = 0;
    }
    renderTable();
  });
document
  .querySelector("#employeeTable th:nth-child(5) .sort")
  .addEventListener("click", function () {
    if (hireDateSortOrder === 0) {
      employees.sort(function (a, b) {
        return new Date(a.hireDate) - new Date(b.hireDate);
      });
      hireDateSortOrder = 1;
    } else {
      employees.sort(function (a, b) {
        return new Date(b.hireDate) - new Date(a.hireDate);
      });
      hireDateSortOrder = 0;
    }
    renderTable();
  });

//баннер
banner.style.display = "block";
setTimeout(() => {
  banner.style.display = "none";
}, 5000);

renderTable();
