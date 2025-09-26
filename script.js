



const newjobInput = document.getElementById('data-input');
const MainDivs = document.getElementById("jobs-list")

function addnewjob() {

    const jobtext = newjobInput.value.trim();

    if (jobtext === "") {
        alert('please enter your considered activity');
        return;
    }

    const addingItem = createjobelemnt(jobtext);
    MainDivs.appendChild(addingItem);
    newjobInput.value = "";
    updateAndSaveJobs();

}
function createjobelemnt(jobtext) {
    //making div element
    const jobitem = document.createElement('div');
    jobitem.className = "job-items";

    //making span element
    const spanItem = document.createElement('span');
    spanItem.textContent = jobtext;
    jobitem.appendChild(spanItem);

    //making edit button
    var editbutton = document.createElement('button');
    editbutton.className = 'edit-button';
    jobitem.appendChild(editbutton);

    //makink icon for edit button
    var EditIcon = document.createElement('i');
    EditIcon.className = "fa-solid fa-pen";
    editbutton.appendChild(EditIcon);

    editbutton.onclick = function () {
        edittask(jobitem);
    };

    //making delet button
    var deletebutton = document.createElement('button');
    deletebutton.className = 'del-button';
    jobitem.appendChild(deletebutton);

    //making icon for delet button
    var DeleteIcon = document.createElement('i');
    DeleteIcon.className = "fa-solid fa-trash";
    deletebutton.appendChild(DeleteIcon)

    deletebutton.onclick = function () {
        deleteDiv(jobitem);
    };
    return jobitem;

}

function edittask(jobitem) {

    const spantask = jobitem.querySelector('span');
    const newdata = prompt('Edit your text please ', spantask.textContent);
    if (newdata !== null && newdata !== '') {
        spantask.textContent = newdata;
        updateAndSaveJobs();
    }
}

function deleteDiv(jobitem) {
    const confirmed = confirm("Are you sure you want delete this task?!");

    if (confirmed) {
        jobitem.remove();
        updateAndSaveJobs();
    }
}

function updateAndSaveJobs(jobtext) {
    const task_spans_all = document.querySelectorAll('.job-items span')
    var spanArrey = [];
    for (let i = 0; i < task_spans_all.length; i++) {
        spanArrey.push(task_spans_all[i].textContent)
    }
    localStorage.setItem("spanArrey", spanArrey.join(','));
}

function showTasks() {
    const savedtasks = localStorage.getItem('spanArrey');
    if (savedtasks) {
        const tasks = savedtasks.split(',')
        for (let i = 0; i < tasks.length; i++) {
            const jobtext = tasks[i];
            const recreating_tasks = createjobelemnt(jobtext);
            MainDivs.appendChild(recreating_tasks);
        }
    }
}

document.addEventListener('DOMContentLoaded',showTasks);