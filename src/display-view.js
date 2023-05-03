import createDisplayController from "./display-controller";

function createDisplayView() {
  const controller = createDisplayController();

  function renderTask(task) {
    const listContent = document.querySelector(".list-content");
    const taskTemplate = document.querySelector("#task-template");
    const templateClone = taskTemplate.content.cloneNode(true);
    const templateDescription = templateClone.querySelector(".description");
    const templateDueDate = templateClone.querySelector(".due-date");

    templateDescription.textContent = task.description;
    templateDueDate.textContent = task.dueDate.getMonth();

    listContent.appendChild(templateClone);
  }

  function renderList(list) {
    const lists = document.querySelector(".lists");
    const listTemplate = document.querySelector("#list-template");
    const templateClone = listTemplate.content.cloneNode(true);
    const listName = templateClone.querySelector(".name");

    listName.textContent = list.name;

    lists.appendChild(templateClone);
  }

  function renderTasks(list) {
    list.tasksArray.array.forEach((task) => {
      renderTask(task);
    });
  }

  function renderContainer(container) {
    container.listsArray.array.forEach((list) => {
      renderList(list);
    });
  }

  function updateView() {
    const currentList = controller.focusedList;
    const { currentContainer } = controller;

    renderList(currentList);
    renderContainer(currentContainer);
  }

  function createAddListModal() {
    const addListButton = document.querySelector(".add-list");
    const modal = document.querySelector("#myModal");
    const closeModal = document.querySelector(".close");

    closeModal.addEventListener("click", () => {
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
  }

  createAddListModal();
}

export default createDisplayView;
