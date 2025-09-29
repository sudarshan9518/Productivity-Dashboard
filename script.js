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

function dailyQuotes() {
  let wrapper = document.querySelector(".motivational-wrapper");

  async function fetchQuote() {
    let response = await fetch(
      "https://api.realinspire.live/v1//quotes/random"
    );
    let data = await response.json();

    let inner = `  <img src="./content/icons8-quote-100.png" alt="">
              <div class="motivation-1">
                <h2>Quote Of The Day...</h2>
              </div>
              <div class="motivation-2">
                <h1>${data[0].content}</h1>
              </div>
              <div class="motivation-3">
                <h2>~ ${data[0].author}</h2>
              </div>`;

    wrapper.innerHTML = inner;
  }
  fetchQuote();
}
dailyQuotes();

function pomodoro() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .timer-start");
  let pausetBtn = document.querySelector(".pomo-timer .timer-pause");
  let resetBtn = document.querySelector(".pomo-timer .timer-reset");

  let totalSecound = 25 * 60;
  let timerInterval = null;
  let isComplete = false;
  function upDateTime() {
    let minutes = Math.floor(totalSecound / 60);
    let secounds = totalSecound % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      secounds
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    if (!isComplete) {
      clearInterval(timerInterval);

      timerInterval = setInterval(() => {
        if (totalSecound > 0) {
          totalSecound--;
          upDateTime();
        } else {
          pauseTimer();
          isComplete = true;
          let a = document.querySelector(".pomodoro-fullPage .session");
          a.innerHTML = "Take A Break";

          document.querySelector(".pomo-timer h1").innerHTML = "05:00";
          totalSecound = 5 * 60;
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (totalSecound > 0) {
          totalSecound--;
          upDateTime();
        } else {
          pauseTimer();
          isComplete = false;
          let a = document.querySelector(".pomodoro-fullPage .session");
          a.innerHTML = "work session";

          document.querySelector(".pomo-timer h1").innerHTML = "25:00";
          totalSecound = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    totalSecound = 25 * 60;
    clearInterval(timerInterval);
    upDateTime();
  }

  startBtn.addEventListener("click", startTimer);
  pausetBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoro();

function goalsList() {
  let formm = document.querySelector(".goal-container .addTask form");
  let goalsinput = document.querySelector(
    " .goal-container .addTask form .task-input"
  );
  let goalsdetail = document.querySelector(
    " .goal-container .addTask form textarea"
  );
  let taskcheck = document.querySelector(
    " .goal-container .addTask form .mark-imp input"
  );
  let allTask = document.querySelector(".goal-container .allTask");
  let today = new Date().toISOString().split("T")[0];
  let currentgoals = [];

  if (currentgoals.date && currentgoals.date !== today) {
    currentgoals = { date: today };
    localStorage.setItem("currentgoals", JSON.stringify(currentgoals));
  }

  function localstorage() {
    if (localStorage.getItem("currentgoals")) {
      currentgoals = JSON.parse(localStorage.getItem("currentgoals"));
    } else {
      console.log("task is empty");
    }
  }
  localstorage();

  function renderTask() {
    let sum = ``;

    currentgoals.forEach(function (elem, idx) {
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

    let markCompletedBtn = document.querySelectorAll(
      ".goal-container .task button"
    );

    markCompletedBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentgoals.splice(btn.id, 1);
        renderTask();
      });
    });

    localStorage.setItem("currentgoals", JSON.stringify(currentgoals));
    currentgoals.date = today;
  }
  renderTask();

  formm.addEventListener("submit", function (e) {
    e.preventDefault();

    currentgoals.push({
      task: goalsinput.value,
      details: goalsdetail.value,
      imp: taskcheck.checked,
    });

    renderTask();

    goalsinput.value = "";
    goalsdetail.value = "";
    taskcheck.checked = false;
  });
}
goalsList();

function gettDay() {
  var header1H1timer = document.querySelector(".header1 h1");
  var header1H2Sdate = document.querySelector(".header1 h2");

  const dayInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var date = new Date();
  let day = dayInWeek[date.getDay()];
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hourr = date.getHours().toString().padStart(2, "0");
  let h = date.getHours() % 12;
  let hh = h.toString().padStart(2, "0");
  let secound = date.getSeconds().toString().padStart(2, "0");
  let timerrr = ``;
  if (hourr >= 12) {
    timerrr = "PM";
  } else {
    timerrr = "AM";
  }
  let totalMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let datee = date.getDate();
  let month = totalMonths[date.getMonth()];

  let year = date.getFullYear() % 100;

  header1H1timer.innerHTML = `${day},${hh}:${minutes}:${secound} ${timerrr} `;
  header1H2Sdate.innerHTML = `${datee} ${month} ${year}`;
}
gettDay();

setInterval(() => {
  gettDay();
}, 1000);

async function weatherApi() {
  let APIkey = `8fd7cca8f4e84fb4b90181831252609`;
  let location = document.querySelector(".header1 h4");
  let allinfo = document.querySelector(".header2");
  let city = "shirdi";
  let response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}`
  );
  let data = await response.json();

  console.log(data);

  location.innerHTML = ` 📍${data.location.name}`;

  allinfo.innerHTML = `
  <h2>${data.current.temp_c}  <sup>o</sup>C</h2>
            <h4>${data.current.condition.text}</h4>
 <h3>Visibility : ${data.current.vis_km} Km</h3>
            <h3>Humidity : ${data.current.humidity}%</h3>
            <h3>Wind : ${data.current.wind_kph} km/h</h3>`;
}
weatherApi();

function changeTheme() {
  let theme = document.querySelector("nav .nav-in button");
  let rootElem = document.documentElement;
  let change = false;
  theme.addEventListener("click", function () {
    if (!change) {
      rootElem.style.setProperty("--sec", "#000000ff");
      rootElem.style.setProperty("--tri2", "#767272ff");
      rootElem.style.setProperty("--fade", "#959595ff");
      rootElem.style.setProperty("--tri1", "#413b3bff");
      rootElem.style.setProperty("--ptr", "#ffffffff");
      change = true;
    } else {
      rootElem.style.setProperty("--sec", "#381c0a");
      rootElem.style.setProperty("--tri2", "#74512d");
      rootElem.style.setProperty("--fade", "#d2b395");
      rootElem.style.setProperty("--tri1", "#feba17");
      rootElem.style.setProperty("--ptr", "#f8f4e1");
      change = false;
    }
  });
}
changeTheme();
