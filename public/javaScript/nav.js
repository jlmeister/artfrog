const toggleMenu = document.querySelector('.navigation button');
const menu = document.querySelector('.navigation ul');

toggleMenu.addEventListener('click', function() {
  const open = JSON.parse(toggleMenu.getAttribute('aria-expanded'));
  toggleMenu.setAttribute('aria-expanded', !open);
  menu.hidden = !menu.hidden;
});
//-----------------------------------------------------
//Toggle ARIA-Hidden status
//-----------------------------------------------------

function toggleHidden(id) {
  let iden = id
  let attr = document.getElementById(iden).attributes

  if(attr['aria-hidden'].value == 'true') {
    document.getElementById(iden).setAttribute('aria-hidden', 'false')
  } else {
    document.getElementById(iden).setAttribute('aria-hidden', 'true')
  }
  console.log(attr['aria-hidden'].value)
}