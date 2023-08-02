//Storing the task or saving the task
//empty array to store all the tasks
let TaskList = []
//to retrive the data when the browser is loaded from localstrogae
document.addEventListener('DOMContentLoaded',()=>{
  DataPresent=localStorage.getItem('taskname')
  if(DataPresent !==null){
    TaskList=JSON.parse(DataPresent)
    DynamicRendering()
  }
})


//function to save the task
function SaveTask() {
  let TaskName = document.getElementById("input_val").value;
  if(TaskName.trim()!==''){
      let TaskData = {
        //to generate new ID eachtime the user enter the new task
        taskId: TaskList.length + 1,
        taskname: TaskName,
      }
      //pushing the new data into an empty array
      TaskList.push(TaskData)
      //adding data to ul
      localStorage.setItem('taskname',JSON.stringify(TaskList))

      //rendering the ul
      DynamicRendering()

      //to clear the input field
      document.getElementById("input_val").value = ""
    }
}

//rendering the list items dynamically
function DynamicRendering() {
    document.querySelector(".Task_list").innerHTML=''
    for (i = 0; i < TaskList.length; i++) {
      const dynamicList = document.createElement("li");
      dynamicList.classList.add("task");
      const myPara = document.createElement("p");
      myPara.innerHTML = TaskList[i].taskname;
      //appending the paragraph to the li
      dynamicList.appendChild(myPara);
      //appending the li to the ul list
      document.querySelector(".Task_list").appendChild(dynamicList);
      //creating the div element to add edit delete and list items
      const DivEle = document.createElement("div");
      DivEle.classList.add("crud");
      
      //to add icons like delete and retrive
      //Edit Icon
      const EditIcon = document.createElement("i");
      EditIcon.classList.add("bi");
      EditIcon.classList.add("bi-pencil-square");
      //adding the functionality to editicons
      EditIcon.addEventListener('click',EditTask)
      EditIcon.taskId=TaskList[i].taskId

      //Delete Icon
      const DeleteIcon = document.createElement("i");
      DeleteIcon.classList.add("bi");
      DeleteIcon.classList.add("bi-trash");
      //adding the functionality to Deleteicons
      DeleteIcon.addEventListener('click',DeleteTask)
      DeleteIcon.taskId=TaskList[i].taskId

      //appending the icons to the diveelemnt
      DivEle.appendChild(EditIcon)
      DivEle.appendChild(DeleteIcon)

      //appending the divelemnt to the UL list.
      dynamicList.appendChild(DivEle)
    }
}

//edit icon functionality
function EditTask(e){
  var edi=TaskList.find((d)=>d.taskId == e.target.taskId)
  document.getElementById("input_val").value=edi.taskname
}

//delete icon functionality
function DeleteTask(e){
  var index=TaskList.findIndex((d)=>d.taskId == e.target.taskId)
  TaskList.splice(index,1)
  localStorage.setItem('taskname',JSON.stringify(TaskList))
  DynamicRendering()
}

//To remove all the data from the ul and local storage.
 function removeAll(){
  TaskList.splice(0)
  localStorage.removeItem('taskname')
  DynamicRendering()
}
