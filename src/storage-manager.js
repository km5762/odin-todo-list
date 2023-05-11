import createDisplayController from "./display-controller";
import createDisplayView from "./display-view";
import { createListsContainer, createTask, createTodoList } from "./todo-list";

function createStorageManager() {
  function retrieveDisplayController() {
    const containersString = localStorage.getItem("containers");
    console.log(containersString);

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
            let date = null;
            if (
              containersJSON[i].listsArray[j].tasksArray[k].dueDate !== null
            ) {
              date = new Date(
                Date.parse(
                  containersJSON[i].listsArray[j].tasksArray[k].dueDate
                )
              );
            }
            const task = createTask(
              containersJSON[i].listsArray[j].tasksArray[k].description,
              date
            );
            list.addTask(task);
          }
        }
        listContainers.push(container);
      }

      const controller = createDisplayController(listContainers);
      return controller;
    }
    const controller = createDisplayController();
    controller.addListContainer("main");
    return controller;
  }

  return { retrieveDisplayController };
}

export default createStorageManager;
