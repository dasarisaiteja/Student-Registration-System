// checking student info correct or not
function checkStudentInfo(student) {
    let errorMsg = "";
    // name check 
    if (student.name.trim() === "" || !/^[a-zA-Z ]+$/.test(student.name)) {
        errorMsg = "Name: Only letters and spaces allowed.";
    }
    // id check 
    else if (!/^[0-9]+$/.test(student.id)) {
        errorMsg = "ID: Only numbers allowed.";
    }
    // email check 
    else if (!/^\S+@\S+\.\S+$/.test(student.email)) {
        errorMsg = "Email: Invalid format.";
    }
    // contact check if correct and length only 10 digits
    else if (!/^\d{10}$/.test(student.contact)) {
        errorMsg = "Contact: At least 10 digits and only numbers allowed.";
    }
    return errorMsg;
}

// Get students from local storage
function getStudents() {
    var stored = localStorage.getItem("students");
    if (stored) {
        return JSON.parse(stored);
    }
    return [];
}

// Save students info to local storage
function setStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}

// keeping scroll bar
function toggleScrollbar() {
    const tableContainer = document.querySelector('.table-container');
    const rowCount = document.querySelectorAll('#students-table tbody tr').length;

    // when the students are above 5 then only scroll bar
    if (rowCount > 5) { 
        tableContainer.classList.add('scroll-active');
    } else {
        tableContainer.classList.remove('scroll-active');
    }
}

// Put students in table
function showStudents() {
    var tbody = document.querySelector("#students-table tbody");
    var students = getStudents();
    tbody.innerHTML = "";
    for (var i = 0; i < students.length; i++) {
        var stu = students[i];
        var tr = document.createElement("tr");
        tr.innerHTML =
            "<td data-label='Name'>" + stu.name + "</td>" +
            "<td data-label='ID'>" + stu.id + "</td>" +
            "<td data-label='Email'>" + stu.email + "</td>" +
            "<td data-label='Contact'>" + stu.contact + "</td>" +
            "<td class='actions' data-label='Actions'>" +
            // edit button
            "<button class='edit-btn' onclick='editStu(" + i + ")' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>" +
            // delete button
            "<button class='delete-btn' onclick='removeStu(" + i + ")' title='Delete'><i class='fa-solid fa-trash-can'></i></button>" 
            "</td>";
        tbody.appendChild(tr);
    }
    // check to show scrollbar or not
    toggleScrollbar();
}

// Add a student to the list 
function addStu(stu) {
    var students = getStudents();
    students.push(stu);
    setStudents(students);
    showStudents();
}

// add or edit student
// tells which index of student is being edited
var editNum = -1;

// When form is submitted
document.getElementById("student-form").onsubmit = function(e) {
    e.preventDefault();
    var student = {
        name: document.getElementById("studentName").value,
        id: document.getElementById("studentID").value,
        email: document.getElementById("email").value,
        contact: document.getElementById("contact").value
    };
    var errorMsg = checkStudentInfo(student);
    if (errorMsg !== "") {
        document.getElementById("form-error").textContent = errorMsg;
        return;
    }
    document.getElementById("form-error").textContent = "";
    if (editNum > -1) {
        updateStu(editNum, student);
        editNum = -1;
        this.querySelector("button[type=submit]").textContent = "Add Student";
    } else {
        addStu(student);
    }
    this.reset();
};

// Edit a student
function editStu(num) {
    var students = getStudents();
    var stu = students[num];
    document.getElementById("studentName").value = stu.name;
    document.getElementById("studentID").value = stu.id;
    document.getElementById("email").value = stu.email;
    document.getElementById("contact").value = stu.contact;
    editNum = num;
    document.getElementById("student-form").querySelector("button[type=submit]").textContent = "Update Student";
}

// Update student info
function updateStu(num, stu) {
    var students = getStudents();
    students[num] = stu;
    setStudents(students);
    showStudents();
}

// Delete a student
function removeStu(num) {
    if (confirm("Are you sure you want to delete this student?") === false) return;
    var students = getStudents();
    students.splice(num, 1);
    setStudents(students);
    showStudents();
}

// Show students when page loads
window.onload = function() {
    showStudents();
};
