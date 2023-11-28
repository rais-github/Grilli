'use strict';
/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

//   x = x - (x * 2);
//   y = y - (y * 2);
x=x*-1;y=y*-1;
  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});
// Tweet
const api_url="https://api.quotable.io/random";
var data;
async function getquote(url)
{
    const response=await fetch(url);
    data=await response.json();
}
getquote(api_url);
function tweet()
{
    window.open("https://twitter.com/intent/tweet?text="+data.content+"-----by "+ data.author,"Tweet Window","width=600","height=300");
}

//fav
const  $toggleBtns=document.querySelectorAll("[data-toggle-btn]");
$toggleBtns.forEach(btn=>{
    btn.addEventListener('click',function(){
        btn.classList.toggle('active');
    })
})

// Subscribe

const scriptURL = 'https://script.google.com/macros/s/AKfycbzLMaT5cabJCwU2ZEkJjq3RCvj1Kb2NDZ9c2-M-dbnzLgibUWNzl0UY7biBV13PX3vv/exec'
const form = document.forms['submit-to-google-sheet']
const msg =document.getElementById('spn');

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response =>{
        form.reset();
        msg.innerHTML="Thank you for subscribing!";
        setTimeout(()=>{
            msg.innerHTML="";
        },4001)
    })
    .catch(error => console.error('Error!', error.message))
})