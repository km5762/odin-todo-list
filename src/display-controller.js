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

  function switchFocusedList(list) {
    focus.list = list;
    return this;
  }

  function switchFocusedContainer(container) {
    focus.container = container;
    return this;
  }

  function removeListContainer(index) {
    listContainers.splice(index, 1);
  }

  function incrementFocusedList() {
    focus.list += 1;
  }

  return {
    addListContainer,
    switchFocus,
    removeListContainer,
    switchFocusedContainer,
    switchFocusedList,
    incrementFocusedList,

    get focusedContainer() {
      return listContainers[focus.container];
    },

    get focusedList() {
      return this.focusedContainer.getList(focus.list);
    },

    get newestList() {
      return this.focusedContainer.getList(
        this.focusedContainer.listsArray[
          this.focusedContainer.listsArray.length - 1
        ]
      );
    },
  };
}

export default createDisplayController;
