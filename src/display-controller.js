import { createListsContainer, createTask, createTodoList } from "./todo-list";

function createDisplayController() {
  const listContainers = [];
  const focus = {
    container: null,
    list: null,
  };

  function addListContainer(inputName) {
    listContainers.push(createListsContainer(inputName));
    return this;
  }

  function switchFocus(container, list) {
    focus.container = container;
    focus.list = list;
    return this;
  }

  function removeListContainer(index) {
    listContainers.splice(index, 1);
  }

  return {
    addListContainer,
    switchFocus,
    removeListContainer,

    get focusedContainer() {
      return listContainers[focus.container];
    },

    get focusedList() {
      return this.focusedContainer.getList(focus.list);
    },
  };
}

export default createDisplayController;
