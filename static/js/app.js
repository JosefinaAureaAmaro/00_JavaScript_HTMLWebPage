// from data.js
var tableData = data;

/////////////////// create table ///////////////////

function generateTable(newTableData) {
  var tbody = d3.select("tbody");

  tbody.html(""); // empty table

  newTableData.forEach((nestedObject) => { //
  var row = tbody.append("tr"); // create a row for each key, value pair in object
  Object.values(nestedObject).forEach((val) => { // to get the values of the nested object, for each value   
  var cell = row.append("td"); // append .td for each value in the object
  cell.text(val) // append the value as text to the <td> element 
    });
  });
};



/////////////////// filter button ////////////////////
function handleClick() {
  console.log('button clicked');
  var filteredData = tableData;

  // to reference input value 
  var inputValue = d3.select("#datetime").property("value");
  
  console.log(inputValue);

  // to create a new data table for the filtered values 
  filteredData = filteredData.filter(row => row.datetime === inputValue);

  // use the generateTable function to make a new table
  generateTable(filteredData);

  if (inputValue === "") { // to clear the search if the criteria is cleared
    return generateTable(tableData);};
}

//reference button on page
var filterButton = d3.select("#filter-btn");
d3.selectAll("#filter-btn").on("click", handleClick);


//////////////////// create dropdown filters ///////////////////
// to acquire keys in the data; 
let dataKeys = Object.keys(tableData[0]);
console.log(dataKeys);


let dropDownData = [];
for (i = 0; i < dataKeys.length -1 ; i++) {
var uniqueColumn = {}; // creates an Object 

var indexValues = tableData.map((item) => item[Object.keys(item)[i]]); // repeated for each item in tableData object // returns array of values
//returns values for the ith property of an object

indexValues.forEach((item) => {uniqueColumn[item] = true;}); // for each item in array assign the value as a key to the object, set values for key as true
      // Objects only have unique keys thus an array of keys would be a unique valued array

var dropDownItems = Object.keys(uniqueColumn); //making the keys of the Object into an array 

dropDownData[i] = dropDownItems; // create a nested array at each index of loop
 // the nested array will contact unique keys/values from the original tableData
};

console.log(dropDownData); // to check on nested list 
console.log(dataKeys); // to check on list of keys 

/////// created drop down containers and added ids to html elements //////////
//establish var values for the dropdown items
let container, dropDownStyle, style;

//TH element
var  thElement = document.getElementsByTagName("th");
let idArray = [];


// to add <script> to each thElement
for (var i = 0; i < thElement.length - 1; i++) {
  // for (var j = 0; j <= dropDownData[i].length; j++) {
        
      container = document.createElement("select");
      container.id = "table-head-"+ dataKeys[i];
      container.setAttribute("style", 'display:inline-flex');

      idArray[i] = "table-head-"+ dataKeys[i];
    
  // to append options to select drop down option
  style = document.createTextNode("-----");
  dropDownStyle = document.createElement("option");
  // dropDownStyle.id = dataKeys[i]+ "-" + [j]

  // console.log(dropDownStyle);

  dropDownStyle.appendChild(style); 
  container.appendChild(dropDownStyle);

  thElement[i].appendChild(container);
// }
};

console.log(idArray); // to check on how many table headers have the drop down container

// //////////// to create drop down options /////////////

// var menuDropDown = []; 

for (i = 0; i < idArray.length; i++) {
 var filterOption = document.getElementById(idArray[i]); // expected output - TH Date select filter drop down box

  dropDownData[i].forEach((item) =>  // to take the first nested list, "unique date values" 
  { 
    var menuOptions = document.createElement("option"); // for each item in Array , create new element Option
    menuOptions.id = "option-choice-" +  dataKeys[i]; 
    var menuContent = document.createTextNode(item); // for each item in array, create the value as text 
    menuOptions.appendChild(menuContent); // append text to menu option created
    filterOption.appendChild(menuOptions) // append option to filterOption for 'table-head-date'
  });
}; 


//////// to activate dropdown options as filters /////////


// var testData = tableData
// testData = testData.filter(row => row.datetime = "1/1/2010");
// console.log(testData);

// var dateFilterButtonVal = d3.select("#option-choice-datetime").property("value");
// console.log(typeof(dateFilterButtonVal));

var columnSelection = tableData;
var dateFilterButtonVal = d3.select("#option-choice-datetime").property("value");

function getData(columnSelection){


  switch(columnSelection) {
    case dateFilterButtonVal:

    // to create a new data table for the filtered values 
    columnSelection = columnSelection.filter(row => row.datetime === dateFilterButtonVal);
    console.log(dateFilterButtonVal);
    

  // if (inputValue == "-----") { // to clear the search if the criteria is cleared
  //   return generateTable(tableData);};

    console.log('filter clicked');
    generateTable(columnSelection);
    
    break;
  default:
    generateTable(tableData);
  }
  
}

// //reference button on page
// var dateFilterButton = d3.select("#option-choice-datetime");
d3.select("#option-choice-datetime").on("change", getData);


generateTable(tableData);




// var trElement = document.getElementsByTagName("tr");
// // to add id to all tr elements
// for (i = 0; i < trElement.length - 1; i++) {
//   trElement[i].setAttribute("id", "ufo-data");
// }

// append the values from the array to the filter()
console.log('Hi user');







/** Lessons Learned:
 * you can't get the length of an object, but you can of an array
 * 
 * in order to add content to a var you can make it a list and place the nested list into the holding list by indexing it.  
  arraytest = ["john", 'alex', 'rich']; 
  arraytest[0] = ['leslie','bill', 'allen'];
  arraytest[5] = ['pl','ea','se'];
  console.log(arraytest);

  //accesses first propert of the an object in javascript
  var loveList =  object1.map((item) => item[Object.keys(item)[0]]);
 





 */






//source: 'create a html from javascript' https://www.valentinog.com/blog/html-table/
// source: 'filter data in a json array' : https://codeburst.io/learn-understand-javascripts-filter-function-bde87bce206
//source: 'html and filter for dropdown menu' https://stackoverflow.com/questions/35770982/how-to-make-dropdown-list-filter-for-a-table-using-jquery
//source: 'loop through elements' https://stackoverflow.com/questions/19324700/javascript-loop-through-all-the-elements-returned-from-getelementsbytagname
// source: 'unique keys for elements in an object' https://stackoverflow.com/questions/39248687/get-all-unique-object-properties-from-array-of-objects
// source: 'print unique values from an nested object' https://stackoverflow.com/questions/52363138/get-all-key-values-from-multi-level-nested-array-javascript
// source: 'returning values from a loop in javascript' https://stackoverflow.com/questions/8131838/returning-values-out-of-for-loop-in-javascript