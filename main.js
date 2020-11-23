'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar_dark');
    }  
    else{
        navbar.classList.remove('navbar_dark');
    }
});


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar_menu');
navbarMenu.addEventListener('click',(event)=>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    scrollIntoView(link);
});


// Handle click on "contact me" button on home
const homeContact = document.querySelector('.home_contact');
homeContact.addEventListener('click',()=>{
    scrollIntoView('#contact');
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}




const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    const opa = (1-window.scrollY/homeHeight);
    home.style.opacity = opa;
});



const arrow = document.querySelector('.arrow-btn');
document.addEventListener('scroll',()=>{
    console.log('scroll');
    if(window.scrollY > homeHeight){
        arrow.classList.add('visible');
    }
    else{
        arrow.classList.remove('visible');
    }
});

arrow.addEventListener('click',()=>{
    console.log('arrow click');
    const scrollTo = document.querySelector('#home');
    scrollTo.scrollIntoView({behavior:'smooth'});
});




