function initListeners() {
  $("#submit").on("click", function (e) {
    e.preventdefault;
    // console.log(e);
    console.log("Submit Button Clicked");

    // Form values
    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let age = $("#studentAge").val();
    let phone = $("#phoneNumber").val();
    let email = $("#studentEmail").val();
    let cls = $("#classes").val(); // "cls" stands  for "Classes"

    // Test with Console log
    // console.log(fn + " " + ln + " " + age + " " + phone + +" " + email);

    let newArrayOfClasses = cls.split(",").map((item) => item.trim());

    let studentInfo = {
      fName: fn,
      lName: ln,
      age: age,
      pNumber: phone,
      eMail: email,
      classes: newArrayOfClasses,
    };

    console.log("Student Information:", studentInfo);

    addStudent(studentInfo);
  });

  $("#showListBTN").on("click", function () {
    // console.log("Button Clicked");
    getStudent();
  });
}

function getStudent() {
  $(".studentList").empty(); // Empty Student List container
  let studentList = JSON.parse(localStorage.getItem("students"));

  let studentListInfo = ""; // Opening Div
  $.each(studentList, function (index, student) {
    studentListInfo += `<div class="studentInfo">
          <h2>Student Info</h2>
      <p>Name: ${student.fName} ${student.lName}</p>
      <p>Age: ${student.age}</p>
      <p>Phone: ${student.pNumber}</p>
      <p>Email: ${student.eMail}</p>
      <p>
      ${$.each(student.classes, function (i, cls) {
        studentListInfo += ` <li>${cls} </li>`;
      })}
      </p>
      </div>`;
  });

  $(".studentList").html(studentListInfo);
  // studentListInfo += "</div>"; // Closing
}

function addStudent(student) {
  let studentList = JSON.parse(localStorage.getItem("students")); // Get Our Student list JSON

  studentList.push(student);

  localStorage.setItem("students", JSON.stringify(studentList));
}

function connectToLocalStorage() {
  if (localStorage) {
    let students = localStorage.getItem("students");
    if (students) {
      console.log("Students found in database.");
    } else {
      localStorage.setItem("students", JSON.stringify([]));
    }
  } else {
    console.log("Local Storage not supported");
  }
}

$(document).ready(function () {
  connectToLocalStorage();
  initListeners();
});
