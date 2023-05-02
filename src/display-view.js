import createDisplayController from "./display-controller";

function createDisplayView() {
  const controller = createDisplayController();

  function updateView() {
    const currentList = controller.focusedList;
  }
}
