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
///////////////// end - generate table ///////////////



/////// created filter form //////////
let filterform = d3.select("#filters");
let dataKeys = Object.keys(tableData[0]);
console.log(dataKeys);


  var placeholders = ['1/1/2010','bonita', 'ca','us','light', '13 minutes']
  for (i = 0; i <= dataKeys.length -2 ; i++) { 
      var liFilter = filterform.append("li").classed("filter list-group-item",true);
      var labelFilter = liFilter.append("label").attr("for", `${dataKeys[i]}`);
      labelFilter.append("input").classed("form-control", true).attr("id",`${dataKeys[i]}`).attr("type","text").attr("placeholder",`${placeholders[i]}`)
 };
/////// end - create filter form //////////


//data keys check
console.log(`data keys = ${dataKeys.length}`);
console.log(`data keys -1 = ${dataKeys.length - 1}`);

/////////////////// filter button ////////////////////

var filteredData = tableData;

function ButtonClick() {
  console.log('button clicked');

  //variables 
  var inputList = [];
  var defineditems = []; 
  var k = -1; // to use for defined items variable
  var arrayofIndexValues = []; 

  /**************/

  // create input list values from filter form//

  // create date item in input list
  var inputValueDate = d3.select("#datetime").property("value").trim();
  inputList[0] = inputValueDate;

  // create all other fields in input list with the .toLowerCase function 
  for (i = 1; i <= dataKeys.length -2 ; i++) {
    inputList[i] = d3.select('#'+`${dataKeys[i]}`).property("value").trim().toLowerCase()};

  console.log(inputList);

  // end - create input list


  // to iterate through input list and through objects
  for (i = 0; i <= dataKeys.length -2 ; i++) {


    // input list is an array that holds the input values given by the user
    console.log(inputList); // to make sure inputList is still recognized

    function testInput(i) { // if a inputvalue is falsey the i will skip to the next item in the nested object to compare
      while (i <= 5){
      if (inputList[i] !== "" || undefined) {
        console.log(`k equals: ${k = k + 1}`);  // to show list index values
        console.log(`variable i defined: ${i}`); // to show i values
        console.log(`input value ${inputList[i]}`) // to show input item
        defineditems[k] = i; // to store undefined into values into a list
        return i = i; } 
      else {
        console.log(`variable i undefined: ${inputList[i]}`);
        return i = i + 1;
      }
    }
  }; // expect output: variable i per conditions
  testInput(i); // to run function and store i -- not useful beyond this point 
  console.log(`array of defined indexes: ${arrayofIndexValues = new Array(defineditems)}`);

  // we need to create a new array of index values that are defined
  //by holding the index of the values that are defined, we can iterate through that for the final filtered Data
}
  console.log(`array of input: ${arrayofIndexValues}`); // new array iterate variable per conditions 
  
  for (a = 0; a <= arrayofIndexValues.length ; a++) { // we need the loop for when there is more than 1 value in the array
    console.log(arrayofIndexValues[a]);
    var placementvalue = arrayofIndexValues[a]; // placement value takes the index of the 'arrayofindexvalues' that were defined and uses it in the filter. 
    console.log(filteredData = filteredData.filter(obj => obj[Object.keys(obj)[placementvalue]] === inputList[placementvalue]))
  }

  console.log(filteredData);
  console.log('next item!')
  generateTable(filteredData);

  console.log("data filtered")
}; 

 
  //reference button on page
  d3.selectAll("#filter-btn").on("click", ButtonClick);

  // Filter logic: For each object withtin Data filter keys per the following logic: 
  // 1. If given a value for object[0] return filtered data
  // 2. If given a value for object[0] is empty return origin Data
  // 3. Move onto the next key for the Object and provide the hierachy. 

///////////////// end - filter button ///////////////


/// to have table publish to page
generateTable(tableData);

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
  var List =  object1.map((item) => item[Object.keys(item)[0]]);
  //Useful for using a list item as a 

  length starts at 1 not 0 

     // to create a new data table for the filtered values 
    columnSelection = columnSelection.filter(row => row.datetime === dateFilterButtonVal);
    console.log(dateFilterButtonVal);
 */

//source: 'create a html from javascript' https://www.valentinog.com/blog/html-table/
// source: 'filter data in a json array' : https://codeburst.io/learn-understand-javascripts-filter-function-bde87bce206
//source: 'html and filter for dropdown menu' https://stackoverflow.com/questions/35770982/how-to-make-dropdown-list-filter-for-a-table-using-jquery
//source: 'loop through elements' https://stackoverflow.com/questions/19324700/javascript-loop-through-all-the-elements-returned-from-getelementsbytagname
// source: 'unique keys for elements in an object' https://stackoverflow.com/questions/39248687/get-all-unique-object-properties-from-array-of-objects
// source: 'print unique values from an nested object' https://stackoverflow.com/questions/52363138/get-all-key-values-from-multi-level-nested-array-javascript
// source: 'returning values from a loop in javascript' https://stackoverflow.com/questions/8131838/returning-values-out-of-for-loop-in-javascript
// source: 'how to make dropdown menus in javascript' : https://www.selftaughtjs.com/building-javascript-dropdown-menus/ 