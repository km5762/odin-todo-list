function createListsContainer(inputName) {
  const listsArray = [];
  let name = inputName;

  function addTodoList(list) {
    listsArray.push(list);
    return this;
  }

  function removeTodoList(index) {
    listsArray.splice(index, 1);
  }

  function getList(index) {
    return listsArray[index];
  }

  return {
    addTodoList,
    removeTodoList,
    getList,

    get name() {
      return name;
    },

    set name(setName) {
      name = setName;
    },

    get listsArray() {
      return listsArray;
    },
  };
}

function createTodoList(inputName) {
  const tasksArray = [];
  let name = inputName;

  function addTask(task) {
    tasksArray.push(task);
    return this;
  }

  function removeTask(index) {
    tasksArray.splice(index, 1);
  }

  return {
    addTask,
    removeTask,

    get name() {
      return name;
    },

    set name(setName) {
      name = setName;
    },

    get tasksArray() {
      return tasksArray;
    },
  };
}

function createTask(inputDescription, inputDueDate) {
  let complete = false;
  const date = new Date();
  const description = inputDescription;
  let dueDate = inputDueDate;

  function markComplete() {
    complete = true;
  }

  return {
    markComplete,

    get description() {
      return description;
    },

    get dueDate() {
      return dueDate;
    },

    set dueDate(setDate) {
      dueDate = setDate;
    },

    get complete() {
      return complete;
    },
  };
}

export { createListsContainer, createTodoList, createTask };
