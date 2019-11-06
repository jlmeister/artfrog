//Create the class object constructor for Courses.
class ArtCommunity {
    constructor(id, name, desc, img){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.img = img;
    }

}

//create an Array to hold courses being created.
const classArry = []

//create sample courses
  let newCourse = new ArtCommunity ("1", "Beginner Painting", "This painting course is designed for beginners with little or no previous painting experience ", "img")
  classArry.push(newCourse)

  let newCourse1 = new ArtCommunity ("2", "Beginner Drawing", "This drawing course is designed for beginners with little or no previous painting experience ", "img")
  classArry.push(newCourse)

  let newCourse2 = new ArtCommunity ("3", "Some new Community Project", "This is a new Community Project focused on Community Art Projects", "Community Img" )
  classArry.push(newCourse)

//create counters to identify programmatically created elements
console.log(newCourse)
let counterArt = 0
let counterUl = 2

//Create function to alternate class listing background color
function articleColor(){
    let articleBkGrnd = document.getElementsByTagName("article")[counterArt]
    if(counterArt %2!==0){articleBkGrnd.style.backgroundColor = "#22313F"; articleBkGrnd.style.color = '#f0f0f0'} else {articleBkGrnd.style.backgroundColor ='#f0f0f0'; articleBkGrnd.style.color = "#22313F"}
}

//create a function to create a new course and push to an array
function appendClassList(classid) {
    // let classNode = document.create(classid);
    let nodeContainer = document.createElement('ARTICLE')
    document.getElementById('currentCourses').appendChild(nodeContainer)
    
    let nodeList = document.createElement('UL')

    let nodeArticle = document.getElementsByTagName("Article")[counterArt]
    nodeArticle.appendChild(nodeList)

    for(let key in classid) {
        let node = document.createElement('li');
        let nodeListUl = document.getElementsByTagName('UL')[counterUl]
        node.innerHTML = classid[key];
        nodeListUl.appendChild(node);  
}
    let nodeButton = document.createElement('button')
    nodeButton.innerHTML = `Register for ${classid.name}`
    nodeArticle.appendChild(nodeButton)
    articleColor()
    counterUl+=1
    counterArt+=1
    
// node.appendChild(classNode);
}

appendClassList(newCourse)
appendClassList(newCourse1)
appendClassList(newCourse2)

//Dynamically change Course listing background colors so that every other course entry has a different background color:
