const toggleMenu = document.querySelector('.navigation button');
const menu = document.querySelector('.navigation ul');

toggleMenu.addEventListener('click', function() {
  const open = JSON.parse(toggleMenu.getAttribute('aria-expanded'));
  toggleMenu.setAttribute('aria-expanded', !open);
  menu.hidden = !menu.hidden;
});
//-----------------------------------------------------
// Toggle ARIA-Hidden status
//-----------------------------------------------------

// function hideHamburgerContent(){
//   let content = document.getElementsByTagName("ul")[1]
//   let hamburger = document.getElementById("hamburgerMenu").attributes
//   if(hamburger['aria-expanded'].value == 'true'){content.style.display='flex'} else {content.style.display='none'}
// }

function toggleHidden(id) {
  const iden = id;
  const attr = document.getElementById(iden).attributes;

  if (attr['aria-hidden'].value == 'true') {
    document.getElementById(iden).setAttribute('aria-hidden', 'false');
  } else {
    document.getElementById(iden).setAttribute('aria-hidden', 'true');
  }

  console.log(attr['aria-hidden'].value);
}
