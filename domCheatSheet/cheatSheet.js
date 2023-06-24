/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//selecting, creating, and deleting elements

//selecting elements of an entire webpage
console.log(document.documentElement);
//selecting head of a webpage
console.log(document.head);
//selecting body of a webpage
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);
document.getElementById("section--1");
//This type of selection allows you to delete
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);
//Selecting by class
console.log(document.getElementsByClassName("btn"));
//creating and inserting elements
//.insertAjacentHTML
const message = document.createElement("div");
//adding class to the created element
message.classList.add("cookie-messge");
// message.textContent = "We add cookied for improved functionality and analytics";
message.innerHTML =
  'We add cookied for improved functionality and analytics <button class="btn btn--close--cookie">Got it!</button>';

//We use the following dom command to insert and move elements
// header.prepend(message)
header.append(message)
//to insert multiple copies of the same element we use
// header.append(message.cloneNode(true))
// header.after(message)
// header.before(message)

//Deleting elements
const deleteElement = document.querySelector('.btn--close--cookie')

deleteElement.addEventListener('click', function(){
  // message.remove();
  message.parentElement.removeChild(message)
});

//styles
message.style.backgroundColor = "#37383d"
message.style.width = "120%"


 console.log(getComputedStyle(message).color)
 console.log(getComputedStyle(message).height)


message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) +30 + "px"

//changing the color style of the elemnt using css variable
document.documentElement.style.setProperty("--color-primary", "orangered")

//access and change attributes of an element 
const logo = document.querySelector('.nav__logo');
console.log(logo.alt)
console.log(logo.src)
console.log(logo.className)

//Non-standard 
console.log(logo.designer);
console.log(logo.getAttribute('designer'))
logo.setAttribute('company', 'Bankist')

console.log(logo.src)
console.log(logo.getAttribute('src'))


const link = document.querySelector('.twitter-link')
console.log(link.href);
console.log(link.getAttribute("href"));

//data Attributes
//we work with dataset especiall when we want to put data on the UI
console.log(logo.dataset.versionNumber)

//Classes
logo.classList.add('c', 'J')
logo.classList.remove('c', 'J')
logo.classList.toggle('c')
logo.classList.contains('c')

//Dont use this
logo.className = "Jones"
