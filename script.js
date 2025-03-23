document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.getElementById("studentTableBody");

    // Load students from localStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    function displayStudents() {
        studentTableBody.innerHTML = "";

        students.forEach((student, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;

            // Attach event listeners dynamically
            const editButton = row.querySelector(".edit");
            const deleteButton = row.querySelector(".delete");

            editButton.addEventListener("click", () => editStudent(index));
            deleteButton.addEventListener("click", () => deleteStudent(index));

            studentTableBody.appendChild(row);
        });
    }

    function addStudent(event) {
        event.preventDefault();

        let name = document.getElementById("studentName").value.trim();
        let id = document.getElementById("studentID").value.trim();
        let email = document.getElementById("email").value.trim();
        let contact = document.getElementById("contact").value.trim();

        if (!name || !id || !email || !contact) {
            alert("All fields are required.");
            return;
        }

        if (!/^[A-Za-z ]+$/.test(name)) {
            alert("Name should only contain alphabets.");
            return;
        }

        if (!/^\d+$/.test(id)) {
            alert("Student ID should contain only numbers.");
            return;
        }

        if (!/^\d{10}$/.test(contact)) {
            alert("Contact number should be exactly 10 digits.");
            return;
        }

        students.push({ name, id, email, contact });
        saveToLocalStorage();
        displayStudents();

        studentForm.reset();
    }

    function editStudent(index) {
        let student = students[index];

        document.getElementById("studentName").value = student.name;
        document.getElementById("studentID").value = student.id;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1);
        saveToLocalStorage();
        displayStudents();
    }

    function deleteStudent(index) {
        if (confirm("Are you sure you want to delete this record?")) {
            students.splice(index, 1);
            saveToLocalStorage();
            displayStudents();
        }
    }

    studentForm.addEventListener("submit", addStudent);
    displayStudents();
});
