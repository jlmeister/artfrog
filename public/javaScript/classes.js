//Create the class object constructor for Courses.

class ArtCourse {
    constructor(id, name, desc, img){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.img = img;
    }

}

const classArry = []
//const classStr = classArry[0].join()

//create a function to create a new course and push to an array
  let newCourse = new ArtCourse ("1", "Beginner Painting", "This painting course is designed for beginners with little or no previous painting experience ", "img")
  classArry.push(newCourse)

  let newCourse1 = new ArtCourse ("2", "Beginner Drawing", "This drawing course is designed for beginners with little or no previous painting experience ", "img")
  classArry.push(newCourse)

console.log(newCourse)
let counterArt = 0
let counterUl = 2

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

    counterUl+=1
    counterArt+=1
// node.appendChild(classNode);
}

appendClassList(newCourse)
appendClassList(newCourse1)