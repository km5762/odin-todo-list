import createDisplayController from "./display-controller";
import createDisplayView from "./display-view";
import { createListsContainer, createTask, createTodoList } from "./todo-list";

function createStorageManager() {
  function retrieveDisplayController() {
    const containersString = localStorage.getItem("containers");

    if (containersString) {
      const containersJSON = JSON.parse(containersString);
      const listContainers = [];

      for (let i = 0; i < containersJSON.length; i++) {
        const container = createListsContainer(containersJSON[i].name);
        for (let j = 0; j < containersJSON[i].listsArray.length; j++) {
          const list = createTodoList(containersJSON[i].listsArray[j].name);
          container.addTodoList(list);
          for (
            let k = 0;
            k < containersJSON[i].listsArray[j].tasksArray.length;
            k++
          ) {
            const task = createTask(
              containersJSON[i].listsArray[j].tasksArray[k].name,
              containersJSON[i].listsArray[j].tasksArray[k].dueDate
            );
            list.addTask(task);
          }
        }
        listContainers.push(container);
      }

      const controller = createDisplayController(listContainers);
      return controller;
    }
    return createDisplayController();
  }

  return { retrieveDisplayController };
}

export default createStorageManager;
