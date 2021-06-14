let myApp = (function () {
  let todoInput = document.querySelector("input");
  let category = document.querySelectorAll("#category p");

  //to add new item
  let addNewTodo = function (str) {
    let para = document.createElement("li");
    para.classList.add("dropzone");
    para.setAttribute("draggable", true);
    let checkImage = document.createElement("img");
    let crossImage = document.createElement("img");
    checkImage.className = "check";
    checkImage.src = "./images/icon-check.svg";

    crossImage.className = "cross";
    crossImage.src = "./images/icon-cross.svg";

    let node = document.createElement("p");
    node.textContent = `${str}`;
    para.appendChild(checkImage);
    para.appendChild(node);
    para.appendChild(crossImage);

    let list = document.querySelector("ul");
    list.insertBefore(para, list.lastChild.previousSibling);
    changeNumberInfo();

    // list.addEventListener("dragend", dragEnd(event));
  };

  //change number of items
  let changeNumberInfo = function () {
    let count = 0;
    document.querySelectorAll("ul li .check").forEach((elem) => {
      if (!elem.classList.contains("checked")) {
        count++;
      }
    });
    document.querySelector("#numberofitems").innerHTML = `${count} items left`;
  };

  //to add a new todo
  todoInput.addEventListener("focus", () => {
    document.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        if (todoInput.value !== "") {
          addNewTodo(todoInput.value);
          todoInput.value = "";
        }
      }
    });
  });

  //event delegation to make it work for new elements
  document.querySelector("ul").addEventListener("click", function (e) {
    if (e.target.classList.contains("check")) {
      e.target.classList.toggle("checked");
      e.target.parentElement.classList.toggle("strikethrough");
    }
    if (e.target.classList.contains("cross")) {
      console.log(e.target.parentElement);
      e.target.parentElement.remove();
    }
    changeNumberInfo();
  });

  let selectCategory = (elem) => {
    if (elem.classList.contains("all")) {
      document.querySelectorAll("ul li").forEach((elem) => {
        elem.classList.remove("hidden");
      });
    } else if (elem.classList.contains("active")) {
      document.querySelectorAll(".check").forEach((elem) => {
        elem.parentElement.classList.remove("hidden");
      });
      document.querySelectorAll(".checked").forEach((elem) => {
        elem.parentElement.classList.add("hidden");
        console.log(elem.parentElement.classList);
      });
    } else {
      document.querySelectorAll(".check").forEach((elem) => {
        elem.parentElement.classList.add("hidden");
      });
      document.querySelectorAll(".checked").forEach((elem) => {
        elem.parentElement.classList.remove("hidden");
      });
    }
  };

  //to toggle category section
  category.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      let selectedItem = event.target;
      event.target.classList.add("selected");
      selectCategory(event.target);
      category.forEach((elem) => {
        if (elem !== selectedItem) {
          elem.classList.remove("selected");
        }
      });
    });
  });

  //clear completed
  document
    .querySelector("#clearcompleted")
    .addEventListener("click", (event) => {
      document.querySelectorAll(".checked").forEach((elem) => {
        elem.parentElement.remove();
      });
    });

  // below code is for drag and drop feature
  let changePosition = (item1, item2) => {
    let content = item1.innerHTML;
    item1.innerHTML = item2.innerHTML;
    item2.innerHTML = content;
  };

  let item1 = null;
  let item2 = null;

  document.querySelector("ul").addEventListener("dragstart", function (event) {
    item1 = event.target;
  });

  document.querySelector("ul").addEventListener("dragover", function (event) {
    if (event.target.classList.contains("dropzone")) {
      item2 = event.target;
    }
  });

  document.querySelector("ul").addEventListener("dragend", function (event) {
    changePosition(item1, item2);
  });

  //togle dark and light
  let toggleLight = document.querySelector("#togglelightdark");
  toggleLight.addEventListener("click", (event) => {
    if (document.body.classList.contains("dark")) {
      document.querySelector("body").classList.remove("dark");
      toggleLight.src = "./images/icon-moon.svg";
    } else {
      document.querySelector("body").classList.add("dark");
      toggleLight.src = "./images/icon-sun.svg";
    }
  });

  //to add button
  document.querySelector("button").addEventListener("click", () => {
    addNewTodo(todoInput.value);
    todoInput.value = "";
  });
})();
