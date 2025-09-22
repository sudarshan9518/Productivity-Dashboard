function openFeature(){
  var allElems = document.querySelectorAll(".elem");
var fullElemPage = document.querySelectorAll(".fullElem")
var allElemsBack = document.querySelectorAll(".fullElem .back");

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

openFeature()


let form = document.querySelector(".addTask form")
let taskInput = document.querySelector(".addTask form .task-input")
let taskDetailsInput = document.querySelector(".addTask form textarea")
let taskCheckBox = document.querySelector(".addTask form .mark-imp input")

let currentTask =[]

form.addEventListener('submit', function(e){
  e.preventDefault()

console.log(taskCheckBox.checked);

 
  
})