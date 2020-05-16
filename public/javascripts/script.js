let searchButton =  document.querySelectorAll(".button")[1];
let inputText = document.querySelectorAll("#Search")[0];
let tbody =  document.querySelectorAll("tbody tr");
let table = document.querySelector("table");
const items_per_page = 10;

searchButton.addEventListener('click',()=>{
    console.log(inputText.value);
    if(inputText.value){
        window.location.href = "/books/search/" + inputText.value;
    }
    else{
        window.location.href = "/books";
    }
})

/*** 
   appendPageLinks function: generate, append, and add 
   functionality to the pagination buttons.
   Input: student list
   Output:None
***/
const appendPageLinks = (list) => {
    const pagination = document.querySelector('.pagination') ;
    if(pagination !== null){
       student_page.removeChild(pagination);
 
    }
    const number_of_pages = Math.ceil(list.length / items_per_page);
    const div = document.createElement('div');
    div.className = "pagination";
    table.appendChild(div);
    //const ul = document.createElement('ul');
    //div.appendChild(ul);
    for(let i =1;i<=number_of_pages;i++){
       //const li = document.createElement('li');
       const a = document.createElement('a');
       let page_number = document.createTextNode(i);

       a.className = 'button';
       
       //a.setAttribute("href","#");
       //ul.appendChild(li);
       div.appendChild(a);
       a.appendChild(page_number);
       
       a.addEventListener("click", function(event){
          pageLinkEvent(list,event);
       });
    }
    showPage(list,1);
 
 }

 /*** 
   pageLinkEvent function: show the page after pagination based on page number 
   of the event
   Input: student list, event
   Output:None
***/
const pageLinkEvent= (list,event) =>{

    showPage(list,event.target.textContent);
 }

 /*** 
   showPage function: hide all of the items in the 
   list except for the ten you want to show.
   Input: student list, page number
   Output: None
***/
const showPage = (list, page) => {
    const start_index = (page-1)*items_per_page;
    const end_index = page*items_per_page;
    for(let i=0;i<list.length;i++){
       if(i <end_index && i>=start_index){
          list[i].style.display = ""; // show
       }
       else{
        list[i].style.display = "none"; // hide
       }
  
    }
  }

  appendPageLinks(tbody);