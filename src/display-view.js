import createDisplayController from "./display-controller";
import { createListsContainer, createTask, createTodoList } from "./todo-list";

function createDisplayView() {
  const controller = createDisplayController();
  controller.addListContainer(createListsContainer("main"));
  controller.switchFocus(0, -1);

  function renderTask(task, index) {
    const listContent = document.querySelector(".list-content");
    const taskTemplate = document.querySelector("#task-template");
    const templateClone = taskTemplate.content.cloneNode(true);
    const completeTask = templateClone.querySelector(".complete");
    const templateDescription = templateClone.querySelector(".description");
    const templateDueDate = templateClone.querySelector(".due-date");
    let formattedDate;

    // Create the formatted date string
    if (task.dueDate !== null) {
      formattedDate = task.dueDate.toISOString().slice(0, 10);
    } else {
      formattedDate = "";
    }

    templateDescription.textContent = task.description;
    templateDueDate.textContent = formattedDate;

    completeTask.addEventListener("click", () => {
      controller.focusedList.removeTask(index);
      updateView();
    });

    listContent.appendChild(templateClone);
  }

  function renderList(list, index) {
    const lists = document.querySelector(".lists");
    const listTemplate = document.querySelector("#list-template");
    const templateClone = listTemplate.content.cloneNode(true);
    const listName = templateClone.querySelector(".name");
    const templateList = templateClone.querySelector(".list");
    // templateList.setAttribute("data-index", index);
    listName.textContent = list.name;

    templateList.addEventListener("click", () => {
      controller.switchFocusedList(index);
      updateView();
    });

    lists.appendChild(templateClone);
  }

  function renderTasks(list) {
    for (let i = 0; i < list.tasksArray.length; i++) {
      renderTask(list.tasksArray[i], i);
    }
  }

  function clearView() {
    const lists = document.querySelector(".lists");
    const tasks = document.querySelector(".list-content");

    lists.textContent = "";
    tasks.textContent = "";
  }

  function updateView() {
    clearView();
    const listHeader = document.querySelector("section h2");
    const currentContainer = controller.focusedContainer;
    const currentList = controller.focusedList;
    console.log(currentList);

    listHeader.textContent = currentList.name;
    renderLists(currentContainer);
    renderTasks(currentList);
  }

  function renderLists(container) {
    for (let i = 0; i < container.listsArray.length; i++) {
      renderList(container.listsArray[i], i);
    }
  }

  function createAddListModal() {
    const addListButton = document.querySelector(".add-list");
    const modal = document.querySelector("#add-list-modal");
    const closeModal = document.querySelector("#add-list-modal .close-modal");
    const form = document.querySelector(".add-list-form");
    const name = form.querySelector(".name");

    closeModal.addEventListener("click", (e) => {
      e.preventDefault();
      form.reset();
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    addListButton.addEventListener("click", () => {
      modal.style.display = "block";
    });

    form.addEventListener("submit", (e) => {
      const addTaskButton = document.querySelector(".add-task-icon");
      e.preventDefault();
      const list = createTodoList(name.value);
      controller.focusedContainer.addTodoList(list);
      modal.style.display = "none";
      form.reset();
      controller.switchFocusedList(
        controller.focusedContainer.listsArray.length - 1
      ); // switch focus to last list

      addTaskButton.style.display = "block";
      updateView();
    });
  }

  function createAddTaskModal() {
    const addTaskButton = document.querySelector(".add-task-icon");
    const modal = document.querySelector("#add-task-modal");
    const closeModal = document.querySelector("#add-task-modal .close-modal");
    const form = document.querySelector(".add-task-form");
    const name = form.querySelector(".name");

    closeModal.addEventListener("click", (e) => {
      e.preventDefault();
      form.reset();
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    addTaskButton.addEventListener("click", () => {
      modal.style.display = "block";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dueDate = form.querySelector(".due-date").valueAsDate;
      console.log(dueDate);
      const task = createTask(name.value, dueDate);
      controller.focusedList.addTask(task);
      modal.style.display = "none";
      form.reset();
      updateView();
    });
  }

  createAddListModal();
  createAddTaskModal();
}

export default createDisplayView;
