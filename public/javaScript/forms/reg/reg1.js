const form = document.getElementById("form");
const errorTitle = document.getElementById('classReg')
const errorElement = document.getElementById("error");

form.addEventListener("submit", e => {
  let messages = [];
  
  // Empty Fields Errors
  for (let i = 0; i < form.elements.length; i++) {
    if (form[i].type === "text" && form[i].value === "" || form[i].value === null) {
      messages.push(`Please fill out ${form[i].name}`);
    }
  }

  // Create a list in <div>#error</div> of error messages 
  for(let i = 0; i < messages; i++) {
    const list = document.createElement('ul');
    list.className = "list";
    const listItem = document.createElement('li');
    let listValue = document.createTextNode(messages[i]);

    // Append value to list item
    listItem.appendChild(listValue);

    // Append list item into the list
    list.appendChild(listItem)

    // Append dynamic list to Error Section
    errorElement.appendChild(list);
  }

  // If Error Stop Submit page, Display Errors
  if (messages.length > 0) {
    e.preventDefault();
    errorTitle.innerText = ('Class Registration - ERROR')
    
  }
});
