const form = document.getElementById("form1");
const errorTitle = document.getElementById('classReg')
const errorElement = document.getElementById("error");

form.addEventListener("submit", e => {
  let messages = [];
  
  // Empty Fields Errors
  for (let i = 0; i < form.elements.length; i++) {
    if (form[i].type === "text" && form[i].value === "") {
      messages.push(`Please fill out ${form[i].name}`);
    }
  }

  // If Error Stop Submit page, Display Errors
  if (messages.length > 0) {
    e.preventDefault();
    errorTitle.innerText = ('Class Registration - ERROR')
    errorElement.innerText = messages.join(', ')
  }
});
