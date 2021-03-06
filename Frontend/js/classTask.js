console.log("taskclass");

class Task {
    constructor(parent,id, name, description) {
        
        this.parent = parent;
        
        this.id = id;
        this.name = (name || "default_name");
        this.description = description;
        
    }

    getName(){
        return this.name;
    }
    
    
    getData() {
        return [this.name , this.parent, this.id];
    }
    
    create(){
        const main = document.getElementById(this.parent);
        let task = document.createElement('li');
        task.innerHTML = this.name;
        task.id = this.id
        task.className = "list-group-item"
        
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = "delete";
        deleteButton.className = "btn btn-danger";
        //button.addEventListener("click", () => {console.log("button")})
        deleteButton.addEventListener("click", this.delete);
        
        let doneButton = document.createElement('button');
        doneButton.innerHTML = "done";
        doneButton.className = "btn btn-success";
        //button.addEventListener("click", () => {console.log("button")})
        doneButton.addEventListener("click", this.editDone);

        let infosButton = document.createElement('button');
        infosButton.innerHTML = "infos";
        infosButton.className = "btn btn-info";
        //button.addEventListener("click", () => {console.log("button")})
        infosButton.addEventListener("click", this.infos);
        
        let editButton = document.createElement('button');
        editButton.innerHTML = "edit";
        editButton.className = "btn btn-warning";
        //button.addEventListener("click", () => {console.log("button")})
        editButton.addEventListener("click", displayEditor);
        
        let editForm = document.createElement('div');
        editForm.id = "editForm";
        let editName = document.createElement('input');
        editName.placeholder = "nouveau nom"
        editName.id = "newNameEdit";
        let editSubmit = document.createElement('button');
        editSubmit.innerHTML = "EditName"
        editSubmit.id = "editSubmitButton"
        //editSubmit.className = "btn btn-success";
        editSubmit.addEventListener("click", this.editName)
        
        editForm.appendChild(editName);
        editForm.appendChild(editSubmit);
        
        editForm.style.display = "none";
        editForm.style.position = "absolute";
        editForm.style.top = "50%";
        editForm.style.left = "50%";
        
        function displayEditor(){
            var on_offEditor = document.getElementById("editForm");
            if (on_offEditor.style.display === "none") {
                on_offEditor.style.display = "block";
            } else {
                on_offEditor.style.display = "none";
            }
        }
        
        task.appendChild(deleteButton);
        task.appendChild(doneButton);
        task.appendChild(editButton);
        task.appendChild(infosButton);
        task.appendChild(editForm);
        
        
        main.prepend(task);
    }
    
    delete(){

        resetinfosTodo()
        let popup = document.createElement("div");
        popup.id = "popupDelete"
        
        let deleteControl = document.createElement("div");
        deleteControl.id = "deleteControl";
        
        deleteControl.innerHTML = "Etes vous sur de vouloir supprimer la tache ?" /*+ self.name*/;
        console.log("DELETE")
        
        let deleteOK = document.createElement("button");
        deleteOK.innerHTML = "OK";
        
        let deleteCancel = document.createElement("button");
        deleteCancel.innerHTML = "Cancel";
        
        deleteControl.appendChild(deleteOK);
        deleteControl.appendChild(deleteCancel);
        
        deleteOK.addEventListener("click", () => {
            
            let idToDelete = this.parentNode.id;

            deleteTodo(idToDelete)
            
            const taskToDelete = document.getElementById(idToDelete);
            taskToDelete.remove();

            document.getElementById("popupDelete").remove();  
            resetinfosTodo()
        })

        deleteCancel.addEventListener("click", () => {
            document.getElementById("popupDelete").remove();
        })

        popup.appendChild(deleteControl)
        document.getElementById("mainContent").appendChild(popup)
    }
    
    editDone(){
        let idToDone = this.parentNode.id;
        
        todoDone(idToDone)
        
        this.innerHTML = "undo"
        
        const taskToDone = document.getElementById(idToDone);
        taskToDone.remove();
        let todoListDone = document.getElementById("todoListDisplayDone")
        todoListDone.appendChild(taskToDone)
        
    }

    editName(){
        //console.log("editname")
        let newName = document.getElementById("newNameEdit").value;
        console.log(newName);
        
        let idToEditName = this.parentNode.parentNode.id
        editTodoName(idToEditName,newName);

        this.parentNode.parentNode.childNodes.item(0).nodeValue = newName;
        document.getElementById('editForm').remove();
    }

    infos(){
        let idToInfos = String(this.parentNode.id);
        infosTodo(idToInfos);
    }
}



/*class Task{
    constructor(name, id){
        this.name = name;
        this.id= id;
    }
    
    create(id){
        const main = document.getElementById(id);
        let task = document.createElement('div');
        task.innerHTML("name");
        let button = document.createElement('button');
        button.innerHTML("clic");
        button.addEventListener("click", () => {console.log("button")})
        
        task.appendChild(button);
        
        main.appendChild(task);
    }
    
    get name(){
        return this.name;
    }
    
    get id(){
        return this.id;
    }
}*/