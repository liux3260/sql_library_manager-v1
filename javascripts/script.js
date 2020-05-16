var searchButton =  document.querySelectorAll(".searchButton")[0];
var inputText = document.querySelectorAll("#Search")[0];
console.log("Yeah, it's loaded!!");
searchButton.addEventListener('click',()=>{
    console.log(inputText.value);
})