function openFeature() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let allElemsBack = document.querySelectorAll(".fullElem .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", function () {
      let id = elem.id;

      fullElemPage[id].style.display = "block";
    });
  });

  allElemsBack.forEach(function (back) {
    back.addEventListener("click", function () {
      document.querySelectorAll(".fullElem")[back.id].style.display = "none";
    });
  });
}
openFeature();

function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form .task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckBox = document.querySelector(".addTask form .mark-imp input");
  let allTask = document.querySelector(".allTask");
  let currentTask = [];

  function localstorage() {
    if (localStorage.getItem("currentTask")) {
      currentTask = JSON.parse(localStorage.getItem("currentTask"));
    } else {
      console.log("task is empty");
    }
  }
  localstorage();

  function renderTask() {
    let sum = ``;

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
                        <h1>${elem.task}
                        <span class=${elem.imp}>imp</span>
                        </h1>
                        <details>
                        <summary>Tap for details...</summary>
                        ${elem.details}
                        </details>
                        <button id=${idx}>Completed</button>
                    </div>`;
    });

    allTask.innerHTML = sum;

    let markCompletedBtn = document.querySelectorAll(".task button");

    markCompletedBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });

    localStorage.setItem("currentTask", JSON.stringify(currentTask));
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckBox.checked,
    });

    renderTask();

    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckBox.checked = false;
  });
}
todoList();

function dailyPlanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let today = new Date().toISOString().split("T")[0];
  let dayPlanner = document.querySelector(".day-planner");

  if (dayPlanData.date && dayPlanData.date !== today) {
    dayPlanData = { date: today };
    localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
  }

  let hours = Array.from({ length: 18 }, function (elem, idx) {
    return `${6 + idx}:00  -  ${7 + idx}:00`;
  });

  var wholeDaySum = ``;
  hours.forEach(function (elem, idx) {
    var saveData = dayPlanData[idx] || ``;
    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
              <p>${elem}</p>
              <input id=${idx} type="text" placeholder="..." value=${saveData} >
  
            </div>
            `;
  });
  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      dayPlanData.date = today;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();
