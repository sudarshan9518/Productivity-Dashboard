var allElems = document.querySelectorAll('.elem');
var allElemsBack  = document.querySelectorAll('.fullElem .back')

allElems.forEach((elem)=>{
    elem.addEventListener("click", function(){
    let id = elem.id;



      document.querySelectorAll('.fullElem')[id].style.display= 'block'
     
       
        
    })
    
})


allElemsBack.forEach(function(back){

    back.addEventListener('click', function(){
      document.querySelectorAll('.fullElem')[back.id].style.display = 'none'
    })
})