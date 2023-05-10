import createStorageManager from "./storage-manager";
import createDisplayView from "./display-view";
import createDisplayController from "./display-controller";

window.addEventListener("load", () => {
  const storageManager = createStorageManager();
  const recoveredController = storageManager.retrieveDisplayController();
  createDisplayView(recoveredController);
});
