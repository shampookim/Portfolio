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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});


// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar_toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('open');
});




// Handle click on "contact me" button on home
const homeContact = document.querySelector('.home_contact');
homeContact.addEventListener('click',()=>{
    scrollIntoView('#contact');
});

function scrollIntoView(selector){
    const yOffset = -20; 
    const select = document.querySelector(selector);
    console.log(select);
    const height = select.getBoundingClientRect().top + window.pageYOffset + yOffset;
    console.log(height);
    window.scrollTo({top: height, behavior: 'smooth'});
}



// home부분 스크롤 내리면 연하게 보여지기
const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    const opa = (1-window.scrollY/homeHeight);
    home.style.opacity = opa;
});


// Arrow up 버튼 home으로 바로 올라가기
const arrow = document.querySelector('.arrow-btn');
document.addEventListener('scroll',()=>{
    if(window.scrollY > homeHeight){
        arrow.classList.add('visible');
    }
    else{
        arrow.classList.remove('visible');
    }
});

arrow.addEventListener('click',()=>{
    const scrollTo = document.querySelector('#home');
    scrollTo.scrollIntoView({behavior:'smooth'});
});







// Projects
const workCategories = document.querySelector('.work_categories');
const workProjects = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');

workCategories.addEventListener('click',(event)=>{
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter; 
    if(filter == null){
        console.log('Error return null');
        return;
    }

    // Remove selection from the previous item ans select the new one
    const active = document.querySelector('.category_btn.selected');
    active.classList.remove('selected');

    const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    target.classList.add('selected');

    workProjects.classList.add('animation-out');
    setTimeout(() => {
        projects.forEach((project)=>{
            if(filter ==='*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }
            else{
                project.classList.add('invisible');
            }
        });
        workProjects.classList.remove('animation-out');
    }, 300);
});













