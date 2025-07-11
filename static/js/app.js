let currentPage = 1;
let itemsPerPage = 10;

const container = document.getElementById("employee-list-container");
const search = document.getElementById("search");
const filterDepartment = document.getElementById("filter-department");
const filterRole = document.getElementById("filter-role");
const sortOption = document.getElementById("sort-option");
const paginationControls = document.getElementById("pagination-controls");
const itemsPerPageSelect = document.getElementById("items-per-page");

itemsPerPageSelect.addEventListener("change", () => {
  itemsPerPage = parseInt(itemsPerPageSelect.value);
  currentPage = 1;
  applyFiltersAndRender();
});

function renderEmployees(list) {
  container.innerHTML = "";
  list.forEach(emp => {
    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button class="edit-btn" data-id="${emp.id}">Edit</button>
      <button class="delete-btn" data-id="${emp.id}">Delete</button>
    `;

    div.querySelector(".delete-btn").addEventListener("click", () => {
      const confirmed = confirm("Are you sure?");
      if (confirmed) {
        const index = mockEmployees.findIndex(e => e.id === emp.id);
        if (index !== -1) {
          mockEmployees.splice(index, 1);
          applyFiltersAndRender();
        }
      }
    });

    div.querySelector(".edit-btn").addEventListener("click", () => {
      document.getElementById("employee-form-container").style.display = "block";
      document.getElementById("employee-id").value = emp.id;
      document.getElementById("first-name").value = emp.firstName;
      document.getElementById("last-name").value = emp.lastName;
      document.getElementById("email").value = emp.email;
      document.getElementById("department").value = emp.department;
      document.getElementById("role").value = emp.role;
    });

    container.appendChild(div);
  });
}

function applyFiltersAndRender() {
  let filtered = [...mockEmployees];

  const keyword = search.value.toLowerCase();
  if (keyword) {
    filtered = filtered.filter(emp =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(keyword)
    );
  }

  const dept = filterDepartment.value;
  if (dept) {
    filtered = filtered.filter(emp => emp.department === dept);
  }

  const role = filterRole.value;
  if (role) {
    filtered = filtered.filter(emp => emp.role === role);
  }

  const sortBy = sortOption.value;
  if (sortBy === "name") {
    filtered.sort((a, b) =>
      (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName)
    );
  } else if (sortBy === "department") {
    filtered.sort((a, b) => a.department.localeCompare(b.department));
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  renderEmployees(paginated);
  renderPaginationControls(filtered.length);
}

function renderPaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationControls.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.style.marginRight = "4px";

    if (i === currentPage) {
      btn.disabled = true;
      btn.style.backgroundColor = "#ddd";
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      applyFiltersAndRender();
    });

    paginationControls.appendChild(btn);
  }
}

document.getElementById("add-employee-btn").addEventListener("click", () => {
  document.getElementById("employee-id").value = "";
  document.getElementById("first-name").value = "";
  document.getElementById("last-name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("department").value = "";
  document.getElementById("role").value = "";
  document.getElementById("employee-form-container").style.display = "block";
});

document.getElementById("employee-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const idField = document.getElementById("employee-id");
  const id = idField.value ? parseInt(idField.value) : Date.now();

  const newEmp = {
    id,
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    role: document.getElementById("role").value.trim(),
  };

  const index = mockEmployees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    mockEmployees[index] = newEmp;
  } else {
    mockEmployees.push(newEmp);
  }

  document.getElementById("employee-form").reset();
  document.getElementById("employee-form-container").style.display = "none";
  applyFiltersAndRender();
});

document.getElementById("cancel-btn").addEventListener("click", () => {
  document.getElementById("employee-form").reset();
  document.getElementById("employee-form-container").style.display = "none";
});

search.addEventListener("input", applyFiltersAndRender);
filterDepartment.addEventListener("change", applyFiltersAndRender);
filterRole.addEventListener("change", applyFiltersAndRender);
sortOption.addEventListener("change", applyFiltersAndRender);

// Initial render
applyFiltersAndRender();
