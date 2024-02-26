// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");
var filterInput = document.getElementById("filter");
var historyArray = [];
var historyTable = document.querySelector("table");
// var filterList = document.getElementsByClassName("list-filter");

filterInput.addEventListener("input", movieFiltering);

// Example of a simple function that clears the input after a user types something in
function clearInput() {
  inp.value = "";
}

function clearMovies() {
  // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
  myMovieList.innerHTML = "";
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
  // Step 1: Get value of input
  var userTypedText = inp.value;
  // Step 2: Create an empty <li></li>

  if (!userTypedText) {
    alert("Please type the movie title!");
    return;
  }

  var li = document.createElement("li"); // <li></li>

  // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
  var textToInsert = document.createTextNode(userTypedText);

  // Step 4: Insert text into li
  // <li>Harry Potter </li>
  li.appendChild(textToInsert);

  // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
  myMovieList.appendChild(li);

  movieHistory(userTypedText);

  // Step 6: Call the clearInput function to clear the input field
  clearInput();
}

function movieFiltering() {
  var searchWord = filterInput.value.toLowerCase();
  var movieItems = Array.from(myMovieList.getElementsByTagName("li"));

  for (let i = 0; i < movieItems.length; i++) {
    if (movieItems[i].innerText.includes(searchWord)) {
      movieItems[i].style.display = "block";
    } else {
      movieItems[i].style.display = "none";
    }
  }
}

function movieHistory(userTypedText) {
  var isDuplicate = false;

  historyArray.forEach((historyItem) => {
    if (historyItem.title.toLowerCase() === userTypedText.toLowerCase()) {
      historyItem.view++;
      isDuplicate = true;
    }
  });

  if (!isDuplicate) {
    historyArray.push({
      title: userTypedText,
      view: 1,
    });
  }

  // clear the table
  historyTable.innerHTML = "";

  // create the cell titles
  var trTitle = document.createElement("tr");
  var th1 = document.createElement("th");
  th1.textContent = "Title";

  var th2 = document.createElement("th");
  th2.textContent = "Watched";

  trTitle.appendChild(th1);
  trTitle.appendChild(th2);
  historyTable.appendChild(trTitle);
  
  // create cells with the data
  historyArray.forEach((history) => {
    var tr = document.createElement("tr"); // <tr></tr>

    var td1 = document.createElement("td"); // <td></td>
    td1.textContent = history.title;
    tr.appendChild(td1);

    var td2 = document.createElement("td");
    td2.textContent = history.view;
    tr.appendChild(td2);

    historyTable.appendChild(tr);
  });
}
