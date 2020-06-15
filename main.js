let any = document.getElementById("Radios1"),
  custom = document.getElementById("Radios2"),
  Miscellaneous = document.getElementById("Miscellaneous"),
  Dark = document.getElementById("Dark"),
  Programming = document.getElementById("Programming"),
  bar = document.getElementById("search-bar"),
  joke = document.getElementById("Joke"),
  btn = document.getElementById("search-btn"),
  items = document.getElementsByName("check");

// adding jokes on the display box, on the basis of joke type like "twopart" or "onepart"
const type = (full_data) => {
  if (full_data.type == "twopart") {
    joke.innerHTML = `${full_data.setup}` + "<br>" + `${full_data.delivery}`;
  } else {
    joke.innerHTML = full_data.joke;
  }
};

// the main function where fetching will occur
const main = (values) => {
  if (bar.value > "0") {
    fetch(
      `https://sv443.net/jokeapi/v2/joke/${values}?contains=${bar.value}`
    ).then((response) =>
      response.json().then((data) => {
        console.log(data);
        if (data.error == true) {
          joke.style.color = "#ff0000";
          joke.style.fontWeight = "bold";
          joke.innerHTML = data.message;
        } else {
          joke.style.color = "#fbfdff";
          joke.style.fontWeight = "normal";
          type(data);
        }
      })
    );
  } else {
    console.log(values);
    fetch(`https://sv443.net/jokeapi/v2/joke/${values}`).then((response) =>
      response.json().then((data) => {
        console.log(data);
        if (data.error == true) {
          joke.style.color = "#ff0000";
          joke.style.fontWeight = "bold";
          joke.innerHTML = data.message;
        } else {
          joke.style.color = "#fbfdff";
          joke.style.fontWeight = "normal";
          type(data);
        }
      })
    );
  }
};

// function to find the checked check box
const checked = () => {
  var selectedItems = "";
  for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox" && items[i].checked == true)
      selectedItems += items[i].value + ",";
  }
  selectedItems = selectedItems.slice(0, -1); // to remove the last comma from the string
  return selectedItems;
};

// names function where names will be send to fetch function
const names = () => {
  // if (bar.value > "0")
  // joke.innerHTML = bar.value;
  if (any.checked) {
    main("Any");
  } else {
    var checkbox_values = checked();
    main(checkbox_values);
  }
  // to clear the search bar
  bar.value = "";
};

// if user press the enter button
bar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    names();
  }
});
// if user press on submit button
btn.addEventListener("click", () => {
  names();
});

any.addEventListener("change", (e) => {
  e.preventDefault();
  Miscellaneous.disabled = true; //disablying the custom options
  Dark.disabled = true; //disablying the custom options
  Programming.disabled = true; //disablying the custom options
  Miscellaneous.checked = false;
  Dark.checked = false;
  Programming.checked = false;
});

custom.addEventListener("change", (e) => {
  e.preventDefault();
  Miscellaneous.disabled = false; //activating the custom options
  Dark.disabled = false; //activating the custom options
  Programming.disabled = false; //activating the custom options
});
