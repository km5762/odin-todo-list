/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display-controller.js":
/*!***********************************!*\
  !*** ./src/display-controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _todo_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-list */ \"./src/todo-list.js\");\n\n\nfunction createDisplayController(inputListContainers) {\n  const listContainers = inputListContainers ?? [];\n\n  const focus = {\n    container: null,\n    list: null,\n  };\n\n  function addListContainer(inputName) {\n    listContainers.push((0,_todo_list__WEBPACK_IMPORTED_MODULE_0__.createListsContainer)(inputName));\n    return this;\n  }\n\n  function switchFocus(container, list) {\n    focus.container = container;\n    focus.list = list;\n    return this;\n  }\n\n  function switchFocusedList(list) {\n    focus.list = list;\n    return this;\n  }\n\n  function switchFocusedContainer(container) {\n    focus.container = container;\n    return this;\n  }\n\n  function removeListContainer(index) {\n    listContainers.splice(index, 1);\n  }\n\n  return {\n    addListContainer,\n    switchFocus,\n    removeListContainer,\n    switchFocusedContainer,\n    switchFocusedList,\n\n    get focusedContainer() {\n      return listContainers[focus.container];\n    },\n\n    get focusedList() {\n      return this.focusedContainer.getList(focus.list);\n    },\n\n    get newestList() {\n      return this.focusedContainer.getList(\n        this.focusedContainer.listsArray[\n          this.focusedContainer.listsArray.length - 1\n        ]\n      );\n    },\n\n    get listContainers() {\n      return listContainers;\n    },\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDisplayController);\n\n\n//# sourceURL=webpack://odin-todo-list/./src/display-controller.js?");

/***/ }),

/***/ "./src/display-view.js":
/*!*****************************!*\
  !*** ./src/display-view.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _todo_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-list */ \"./src/todo-list.js\");\n\n\nfunction createDisplayView(controller) {\n  controller.switchFocus(0, 0);\n\n  function renderTask(task, index) {\n    const listContent = document.querySelector(\".list-content\");\n    const taskTemplate = document.querySelector(\"#task-template\");\n    const templateClone = taskTemplate.content.cloneNode(true);\n    const completeTask = templateClone.querySelector(\".complete\");\n    const templateDescription = templateClone.querySelector(\".description\");\n    const templateDueDate = templateClone.querySelector(\".due-date\");\n    let formattedDate;\n\n    if (task.dueDate !== null) {\n      formattedDate = task.dueDate.toISOString().slice(0, 10);\n    } else {\n      formattedDate = \"\";\n    }\n\n    templateDescription.textContent = task.description;\n    templateDueDate.textContent = formattedDate;\n\n    completeTask.addEventListener(\"click\", () => {\n      controller.focusedList.removeTask(index);\n\n      localStorage.setItem(\n        \"containers\",\n        JSON.stringify(controller.listContainers)\n      );\n\n      updateView();\n    });\n\n    listContent.appendChild(templateClone);\n  }\n\n  function renderList(list, index) {\n    const lists = document.querySelector(\".lists\");\n    const listTemplate = document.querySelector(\"#list-template\");\n    const templateClone = listTemplate.content.cloneNode(true);\n    const listName = templateClone.querySelector(\".name\");\n    const templateList = templateClone.querySelector(\".list\");\n    // templateList.setAttribute(\"data-index\", index);\n    listName.textContent = list.name;\n\n    templateList.addEventListener(\"click\", () => {\n      controller.switchFocusedList(index);\n      updateView();\n    });\n\n    lists.appendChild(templateClone);\n  }\n\n  function renderTasks(list) {\n    for (let i = 0; i < list.tasksArray.length; i++) {\n      renderTask(list.tasksArray[i], i);\n    }\n  }\n\n  function clearView() {\n    const lists = document.querySelector(\".lists\");\n    const tasks = document.querySelector(\".list-content\");\n\n    lists.textContent = \"\";\n    tasks.textContent = \"\";\n  }\n\n  function updateView() {\n    clearView();\n    const listHeader = document.querySelector(\"section h2\");\n    const currentContainer = controller.focusedContainer;\n    const currentList = controller.focusedList;\n\n    listHeader.textContent = currentList.name;\n    renderLists(currentContainer);\n    renderTasks(currentList);\n  }\n\n  function renderLists(container) {\n    for (let i = 0; i < container.listsArray.length; i++) {\n      renderList(container.listsArray[i], i);\n    }\n  }\n\n  function createAddListModal() {\n    const addListButton = document.querySelector(\".add-list\");\n    const modal = document.querySelector(\"#add-list-modal\");\n    const closeModal = document.querySelector(\"#add-list-modal .close-modal\");\n    const form = document.querySelector(\".add-list-form\");\n    const name = form.querySelector(\".name\");\n\n    closeModal.addEventListener(\"click\", (e) => {\n      e.preventDefault();\n      form.reset();\n      modal.style.display = \"none\";\n    });\n\n    window.addEventListener(\"click\", (e) => {\n      if (e.target === modal) {\n        modal.style.display = \"none\";\n      }\n    });\n\n    addListButton.addEventListener(\"click\", () => {\n      modal.style.display = \"block\";\n    });\n\n    form.addEventListener(\"submit\", (e) => {\n      const addTaskButton = document.querySelector(\".add-task-icon\");\n      e.preventDefault();\n      const list = (0,_todo_list__WEBPACK_IMPORTED_MODULE_0__.createTodoList)(name.value);\n      controller.focusedContainer.addTodoList(list);\n      modal.style.display = \"none\";\n      form.reset();\n      controller.switchFocusedList(\n        controller.focusedContainer.listsArray.length - 1\n      ); // switch focus to last list\n\n      localStorage.setItem(\n        \"containers\",\n        JSON.stringify(controller.listContainers)\n      );\n\n      addTaskButton.style.display = \"block\";\n      updateView();\n    });\n  }\n\n  function createAddTaskModal() {\n    const addTaskButton = document.querySelector(\".add-task-icon\");\n    const modal = document.querySelector(\"#add-task-modal\");\n    const closeModal = document.querySelector(\"#add-task-modal .close-modal\");\n    const form = document.querySelector(\".add-task-form\");\n    const name = form.querySelector(\".name\");\n\n    closeModal.addEventListener(\"click\", (e) => {\n      e.preventDefault();\n      form.reset();\n      modal.style.display = \"none\";\n    });\n\n    window.addEventListener(\"click\", (e) => {\n      if (e.target === modal) {\n        modal.style.display = \"none\";\n      }\n    });\n\n    addTaskButton.addEventListener(\"click\", () => {\n      modal.style.display = \"block\";\n    });\n\n    form.addEventListener(\"submit\", (e) => {\n      e.preventDefault();\n      const dueDate = form.querySelector(\".due-date\").valueAsDate;\n      const task = (0,_todo_list__WEBPACK_IMPORTED_MODULE_0__.createTask)(name.value, dueDate);\n      controller.focusedList.addTask(task);\n      modal.style.display = \"none\";\n      localStorage.setItem(\n        \"containers\",\n        JSON.stringify(controller.listContainers)\n      );\n      form.reset();\n      updateView();\n    });\n  }\n\n  createAddListModal();\n  createAddTaskModal();\n  updateView();\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDisplayView);\n\n\n//# sourceURL=webpack://odin-todo-list/./src/display-view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage-manager */ \"./src/storage-manager.js\");\n/* harmony import */ var _display_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-view */ \"./src/display-view.js\");\n/* harmony import */ var _display_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display-controller */ \"./src/display-controller.js\");\n\n\n\n\nwindow.addEventListener(\"load\", () => {\n  const storageManager = (0,_storage_manager__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const recoveredController = storageManager.retrieveDisplayController();\n  (0,_display_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(recoveredController);\n});\n\n\n//# sourceURL=webpack://odin-todo-list/./src/index.js?");

/***/ }),

/***/ "./src/storage-manager.js":
/*!********************************!*\
  !*** ./src/storage-manager.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _display_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display-controller */ \"./src/display-controller.js\");\n/* harmony import */ var _display_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-view */ \"./src/display-view.js\");\n/* harmony import */ var _todo_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo-list */ \"./src/todo-list.js\");\n\n\n\n\nfunction createStorageManager() {\n  function retrieveDisplayController() {\n    const containersString = localStorage.getItem(\"containers\");\n    console.log(containersString);\n\n    if (containersString) {\n      const containersJSON = JSON.parse(containersString);\n      const listContainers = [];\n\n      for (let i = 0; i < containersJSON.length; i++) {\n        const container = (0,_todo_list__WEBPACK_IMPORTED_MODULE_2__.createListsContainer)(containersJSON[i].name);\n        for (let j = 0; j < containersJSON[i].listsArray.length; j++) {\n          const list = (0,_todo_list__WEBPACK_IMPORTED_MODULE_2__.createTodoList)(containersJSON[i].listsArray[j].name);\n          container.addTodoList(list);\n          for (\n            let k = 0;\n            k < containersJSON[i].listsArray[j].tasksArray.length;\n            k++\n          ) {\n            let date = null;\n            if (\n              containersJSON[i].listsArray[j].tasksArray[k].dueDate !== null\n            ) {\n              date = new Date(\n                Date.parse(\n                  containersJSON[i].listsArray[j].tasksArray[k].dueDate\n                )\n              );\n            }\n            const task = (0,_todo_list__WEBPACK_IMPORTED_MODULE_2__.createTask)(\n              containersJSON[i].listsArray[j].tasksArray[k].description,\n              date\n            );\n            list.addTask(task);\n          }\n        }\n        listContainers.push(container);\n      }\n\n      const controller = (0,_display_controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(listContainers);\n      return controller;\n    }\n    const controller = (0,_display_controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    controller.addListContainer(\"main\");\n    return controller;\n  }\n\n  return { retrieveDisplayController };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStorageManager);\n\n\n//# sourceURL=webpack://odin-todo-list/./src/storage-manager.js?");

/***/ }),

/***/ "./src/todo-list.js":
/*!**************************!*\
  !*** ./src/todo-list.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createListsContainer\": () => (/* binding */ createListsContainer),\n/* harmony export */   \"createTask\": () => (/* binding */ createTask),\n/* harmony export */   \"createTodoList\": () => (/* binding */ createTodoList)\n/* harmony export */ });\nfunction createListsContainer(inputName) {\n  const listsArray = [];\n  let name = inputName;\n\n  function addTodoList(list) {\n    listsArray.push(list);\n    return this;\n  }\n\n  function removeTodoList(index) {\n    listsArray.splice(index, 1);\n  }\n\n  function getList(index) {\n    return listsArray[index];\n  }\n\n  return {\n    addTodoList,\n    removeTodoList,\n    getList,\n\n    get name() {\n      return name;\n    },\n\n    set name(setName) {\n      name = setName;\n    },\n\n    get listsArray() {\n      return listsArray;\n    },\n  };\n}\n\nfunction createTodoList(inputName) {\n  const tasksArray = [];\n  let name = inputName;\n\n  function addTask(task) {\n    tasksArray.push(task);\n    return this;\n  }\n\n  function removeTask(index) {\n    tasksArray.splice(index, 1);\n  }\n\n  return {\n    addTask,\n    removeTask,\n\n    get name() {\n      return name;\n    },\n\n    set name(setName) {\n      name = setName;\n    },\n\n    get tasksArray() {\n      return tasksArray;\n    },\n  };\n}\n\nfunction createTask(inputDescription, inputDueDate) {\n  let complete = false;\n  const date = new Date();\n  const description = inputDescription;\n  let dueDate = inputDueDate;\n\n  function markComplete() {\n    complete = true;\n  }\n\n  return {\n    markComplete,\n\n    get description() {\n      return description;\n    },\n\n    get dueDate() {\n      return dueDate;\n    },\n\n    set dueDate(setDate) {\n      dueDate = setDate;\n    },\n\n    get complete() {\n      return complete;\n    },\n  };\n}\n\n\n\n\n//# sourceURL=webpack://odin-todo-list/./src/todo-list.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;