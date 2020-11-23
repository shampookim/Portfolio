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
    scrollIntoView('#home');
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




// 스크롤에 foreach 넣어서 계속 돌리면 부담된다

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

// 1
const sectionnIds = [
    '#home',
    '#about',
    '#skills',
    '#project',
    '#testimonials',
    '#contact',
];

const sections = sectionnIds.map(id => document.querySelector(id));
const navItems = sectionnIds.map(id => 
    document.querySelector(`[data-link="${id}"]`)
);

// 2 3
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const yOffset = -20; 
function scrollIntoView(selector){
    const select = document.querySelector(selector);
    const height = select.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: height, behavior: 'smooth'});

    selectNavItem(navItems[sectionnIds.indexOf(selector)]);
}

const observerOptions ={
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer)=>{
    entries.forEach(entry => {
        // 그냥 들어오는것만하면 처음에 생성될때도 있어서 추가로 조건추가 화면에 들어왔는지
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionnIds.indexOf(`#${entry.target.id}`);

            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }
            else{
                selectedNavIndex = index - 1;
            }
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY ===0){
        selectedNavIndex = 0;
    }
    else if(window.scrollY + window.innerHeight === document.body.clientHeight){
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});








