"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
//Implementing/setting smooth scrolling
//scroll from
const btnScrollTo = document.querySelector(".btn--scroll-to");
//scroll to section--1
const section1 = document.querySelector("#section--1");

const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////

//Event delegation: Implementing page navigation

// /////////////////////////////////////////////////////
// /////////////////////////////////////////////////////

btnScrollTo.addEventListener("click", function (e) {
  //gett the coordinates of the element we want to scroll to
  const s1coords = section1.getBoundingClientRect();

  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  //getBoundingClientRect is ralative to the visible viewport

  //current scroll positin
  console.log("current scroll (X/Y)", window.scrollX, window.scrollY);
  console.log(
    "height/width of the viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //Scrolling

  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // Smooth scrolling
  // window.scrollTo({
  //  left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // })

  //Modern Scrolling version
  section1.scrollIntoView({ behavior: "smooth" });
});
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//Event delegation by putting the eventListener to the common parent
//to create event bubbling up
// Implementing page navigation
//steps
//1. Add Event listener to the common parent element
//2. Determine what element in which the event is originated
//by using e.target
const navLink = document.querySelector(".nav__links");
navLink.addEventListener("click", function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    //selecting all the href attributes of the targeted element
    const id = e.target.getAttribute("href");
    console.log(id);
    //implementing smooth scroll behavior of the navigation bar
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//Building a tabbed component

tabsContainer.addEventListener("click", function (e) {
  // e.preventDefault()
  const clicked = e.target.closest(".operations__tab");

  //Guard clause
  if (!clicked) return;

  //this removes the active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //this adds active status to all the tabs
  clicked.classList.add("operations__tab--active");

  //Activate the content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
//TESTING IF TABS ARE WORKING
//BP: Bad Practice
// tabs.forEach(function(t){
//   t.addEventListener('click', function(e){    //BP
//     console.log('TAB');
//   })
// })

//////////////////////////////////////////////////
///////////////////////////////////////////////////

//When hovering one link other link of the navigation bar fadeout
//Menu fade animation
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains("nav__link")) {
    const clickedLink = e.target;
    const linkSiblings = clickedLink
      .closest(".nav")
      .querySelectorAll(".nav__link");
    const logo = clickedLink.closest(".nav").querySelector("img");

    linkSiblings.forEach((sibling) => {
      if (sibling !== clickedLink) sibling.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//passing "argument" into handledr
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

//////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//Implementing a Sticky navigation: The scroll event
//using scrow event to implement sticky navigation is bad for perfomance

// const initialCoordinates = section1.getBoundingClientRect();

// console.log(initialCoordinates);
// window.addEventListener('scroll', function(){
// console.log(window.scrollY)

// if(window.scrollY > initialCoordinates.top){
//   nav.classList.add('sticky')
// } else{
//   nav.classList.remove('sticky')
// }

// })

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//Sticky navigation using the intersection observer API

// const obsCallback = function (entries, observer){
//   entries.forEach((entry)=>{
//     console.log(entry)
//   })
// }
// const obsOptions ={
//   //target/observe element to intersect (ie section1)
//   root: null,
//   //the percentage of intersectio at which the
//   //callback function will be called
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(obsCallback, obsOptions)

// observer.observe(section1)

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; // this is the same as: const entry = entries[0]

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
////////////////////////////////////////////////////
////////////////////////////////////////////////////

//Reveal sections by removing the class section__hidden to reveal the sections

const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden')
});

///////////////////////////////////////////////////
///////////////////////////////////////////////////

//Lazy loading images: great for perfomance
//its good for users with slow internet an low data plan or slow cellphone

const imgTarget = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  //replace src with data-src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTarget.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////////////////
///////////////////////////////////////////////////
//Bulding a slider component Part1

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector('.dots')

let currentSlide = 0;

let maxSlide = slides.length;

// // x-translation 0%, 100%, 200%, 300%
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

const createDots = function(){
  slides.forEach(function(_, i){
    dotsContainer.insertAdjacentHTML('beforeEnd', 
    `<button class="dots__dot" data-slide= "${i}")></button>`
    );
  });
};
createDots()

const gotToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
// x-translation 0%, 100%, 200%, 300%
gotToSlide(0);

// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.3) translateX(-1600px)";
// slider.style.overflow = "visible";

//Going to the next slide
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  //here we want the 1st slide to be at -100%,
  //2nd slide at 0%, 3rd slide at 100%, and 4th slide at 200%
  gotToSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide -1;
  } else {
    currentSlide--;
  }
  gotToSlide(currentSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener('keydown', function(e){

  if(e.key === 'ArrowLeft') prevSlide();
  
  e.key === 'ArrowRight' && nextSlide();
  
})

// //left and right dots
// document.addEventListener('keydown', function(e){
//   console.log(e);
//   if(e.key === 'arrowLeft') prevSlide();
//   e.key === 'arrowRight' && nextSlide(); //cicuit shortcut
// })

/////////////////////////////////////////////////////
////////////////////////////////////////////////////

//Using forEach to implement Event delegation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     //selecting all the href attributes
//     const id = this.getAttribute("href");
//     console.log(id);
//     //implementing smooth scroll behavior of the navigation bar
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });
/////////////////////////////////////////////////////
////////////////////////////////////////////////////

///////////////////////////////////////////////////
///////////////////////////////////////////////////
// //selecting, creating, and deleting elements

// //selecting elements of an entire webpage
// console.log(document.documentElement);
// //selecting head of a webpage
// console.log(document.head);
// //selecting body of a webpage
// console.log(document.body);

// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);
// document.getElementById("section--1");
// //This type of selection allows you to delete
// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);
// //Selecting by class
// console.log(document.getElementsByClassName("btn"));
// //creating and inserting elements
// //.insertAjacentHTML
// const message = document.createElement("div");
// //adding class to the created element
// message.classList.add("cookie-messge");
// // message.textContent = "We add cookied for improved functionality and analytics";
// message.innerHTML =
//   'We add cookied for improved functionality and analytics <button class="btn btn--close--cookie">Got it!</button>';

// //We use the following dom command to insert and move elements
// // header.prepend(message)
// header.append(message)
// //to insert multiple copies of the same element we use
// // header.append(message.cloneNode(true))
// // header.after(message)
// // header.before(message)

// //Deleting elements
// const deleteElement = document.querySelector('.btn--close--cookie')

// deleteElement.addEventListener('click', function(){
//   // message.remove();
//   message.parentElement.removeChild(message)
// });

// //styles
// message.style.backgroundColor = "#37383d"
// message.style.width = "120%"

//  console.log(getComputedStyle(message).color)
//  console.log(getComputedStyle(message).height)

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) +30 + "px"

// //changing the color style of the elemnt using css variable
// document.documentElement.style.setProperty("--color-primary", "orangered")

// //access and change attributes of an element
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt)
// console.log(logo.src)
// console.log(logo.className)

// //Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'))
// logo.setAttribute('company', 'Bankist')

// console.log(logo.src)
// console.log(logo.getAttribute('src'))

// const link = document.querySelector('.twitter-link')
// console.log(link.href);
// console.log(link.getAttribute("href"));

// //data Attributes
// //we work with dataset especiall when we want to put data on the UI
// console.log(logo.dataset.versionNumber)

// //Classes
// logo.classList.add('c', 'J')
// logo.classList.remove('c', 'J')
// logo.classList.toggle('c')
// logo.classList.contains('c')

// //Dont use this
// logo.className = "Jones"

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//Types of events and event handlers

//mouseenter event----example

// const h1 = document.querySelector('h1')

// //addEventListener allows us to add multiple eventlistener to he same event
// //We can also remove an event if we dont need it anymore.
// const h1Alert = function(e){
//   alert('addEventListener: Greate! You are reading the heading :D');
// }

// h1.addEventListener('mouseenter', h1Alert)

// setTimeout(()=> h1.removeEventListener('mouseenter', h1Alert), 3000)

//old way of listening an event
// h1.onmouseenter = function(){
//   alert('addEventListener: Greate! You are reading the heading :D');
// }
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

//rgb(225, 255, 255)--------Bubbling up

// const randomInt = (min, max) => Math.floor(Math.random()*(max - min + 1) + min);

// const randomColor =  ()=> `rgb(${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 255)} )`

// console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('LINK', e.target, e.currentTarget);
//   //Show that the current event is comming from
//   //the element in which it is implemented
//   console.log(e.currentTarget === this);
//   //Stop propagation
//   //  e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('CONTAINER', e.target, e.currentTarget);
// })

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('NAV', e.target, e.currentTarget);
// })

//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

//DOM TRAVERSING: Walking throught the DOM
//Selecting element based on the other element
//in order to understand the dom tree

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); //works for all h1
// console.log(h1.children);  //works for direct children only
// h1.firstElementChild.style.color = 'orangered'
// h1.lastElementChild.style.color = 'purple'

///////////////////////////////////////////////////////////

//Going upwards: parent: the following are one and the same thing

// console.log(h1.parentNode); //the h1 parent: the parent in which h1 is enclosed
// console.log(h1.parentElement); //the h1 parent: the parent in which h1 is enclosed

////////////////////////////////////////////////////////////

//Going upwards: the closest parent further up in the dom tree

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--color-tertiary-opacity)'

//////////////////////////////////////////////////////////////

//Going sideway:  siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// h1.nextElementSibling.style.color = 'red'

//Getting all the siblings of the element
//this method will also allow us to loop through and
//selectively design  siblings of the targeted element

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(child){
//   if(child !== h1){
//     child.style.backgroundColor = 'purple'
//     child.style.transform = 'scale(0.75)'
//   }
// })

// for(let i = 0; i < h1.parentElement.children.length; i++ ){
//   console.log(h1.parentElement.children[i])
// }

//getting previous and next siblings

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
