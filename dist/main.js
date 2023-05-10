(()=>{"use strict";function e(e){const t=[];let n=e;return{addTodoList:function(e){return t.push(e),this},removeTodoList:function(e){t.splice(e,1)},getList:function(e){return t[e]},get name(){return n},set name(e){n=e},get listsArray(){return t}}}const t=function(){const t=function(){const t=[],n={container:null,list:null};return{addListContainer:function(n){return t.push(e(n)),this},switchFocus:function(e,t){return n.container=e,n.list=t,this},removeListContainer:function(e){t.splice(e,1)},switchFocusedContainer:function(e){return n.container=e,this},switchFocusedList:function(e){return n.list=e,this},incrementFocusedList:function(){n.list+=1},get focusedContainer(){return t[n.container]},get focusedList(){return this.focusedContainer.getList(n.list)},get newestList(){return this.focusedContainer.getList(this.focusedContainer.listsArray[this.focusedContainer.listsArray.length-1])}}}();function n(e,n){const o=document.querySelector(".list-content"),r=document.querySelector("#task-template").content.cloneNode(!0),c=r.querySelector(".complete"),i=r.querySelector(".description"),u=r.querySelector(".due-date");let d;d=null!==e.dueDate?e.dueDate.toISOString().slice(0,10):"",i.textContent=e.description,u.textContent=d,c.addEventListener("click",(()=>{t.focusedList.removeTask(n),s()})),o.appendChild(r)}function o(e,n){const o=document.querySelector(".lists"),r=document.querySelector("#list-template").content.cloneNode(!0),c=r.querySelector(".name"),i=r.querySelector(".list");c.textContent=e.name,i.addEventListener("click",(()=>{t.switchFocusedList(n),s()})),o.appendChild(r)}function s(){!function(){const e=document.querySelector(".lists"),t=document.querySelector(".list-content");e.textContent="",t.textContent=""}();const e=document.querySelector("section h2"),s=t.focusedContainer,r=t.focusedList;console.log(r),e.textContent=r.name,function(e){for(let t=0;t<e.listsArray.length;t++)o(e.listsArray[t],t)}(s),function(e){for(let t=0;t<e.tasksArray.length;t++)n(e.tasksArray[t],t)}(r)}t.addListContainer(e("main")),t.switchFocus(0,-1),function(){const e=document.querySelector(".add-list"),n=document.querySelector("#add-list-modal"),o=document.querySelector("#add-list-modal .close-modal"),r=document.querySelector(".add-list-form"),c=r.querySelector(".name");o.addEventListener("click",(e=>{e.preventDefault(),r.reset(),n.style.display="none"})),window.addEventListener("click",(e=>{e.target===n&&(n.style.display="none")})),e.addEventListener("click",(()=>{n.style.display="block"})),r.addEventListener("submit",(e=>{const o=document.querySelector(".add-task-icon");e.preventDefault();const i=function(e){const t=[];let n=e;return{addTask:function(e){return t.push(e),this},removeTask:function(e){t.splice(e,1)},get name(){return n},set name(e){n=e},get tasksArray(){return t}}}(c.value);t.focusedContainer.addTodoList(i),n.style.display="none",r.reset(),t.switchFocusedList(t.focusedContainer.listsArray.length-1),o.style.display="block",s()}))}(),function(){const e=document.querySelector(".add-task-icon"),n=document.querySelector("#add-task-modal"),o=document.querySelector("#add-task-modal .close-modal"),r=document.querySelector(".add-task-form"),c=r.querySelector(".name");o.addEventListener("click",(e=>{e.preventDefault(),r.reset(),n.style.display="none"})),window.addEventListener("click",(e=>{e.target===n&&(n.style.display="none")})),e.addEventListener("click",(()=>{n.style.display="block"})),r.addEventListener("submit",(e=>{e.preventDefault();const o=r.querySelector(".due-date").valueAsDate;console.log(o);const i=function(e,t){let n=!1;new Date;const o=e;let s=t;return{markComplete:function(){n=!0},get description(){return o},get dueDate(){return s},set dueDate(e){s=e},get complete(){return n}}}(c.value,o);t.focusedList.addTask(i),n.style.display="none",r.reset(),s()}))}()};window.addEventListener("load",(()=>{t()}))})();