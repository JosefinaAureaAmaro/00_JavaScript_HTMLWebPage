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


  var placeholders = ['1/11/2010','san diego', 'ca','us','sphere', '20 minutes']
  for (i = 0; i <= dataKeys.length -2 ; i++) { 
      var liFilter = filterform.append("li").classed("filter list-group-item",true);
      var labelFilter = liFilter.append("label").attr("for", `${dataKeys[i]}`);
      labelFilter.append("input").classed("form-control", true).attr("id",`${dataKeys[i]}`).attr("type","text").attr("placeholder",`${placeholders[i]}`)
 };
/////// end - create filter form //////////



/////////////////// filter button ////////////////////
function ButtonClick() {
  console.log('button clicked');
  let filteredData = tableData;

 
  

  let inputList = [];
  let inputValueDate = d3.select("#datetime").property("value").trim();


  inputList[0] = inputValueDate;

  for (i = 1; i <= dataKeys.length -2 ; i++) {
    inputList[i] = d3.select('#'+`${dataKeys[i]}`).property("value").trim().toLowerCase();
  }

  console.log(inputList); 

  filteredData = filteredData.filter( row => {
    if (
    (row.datetime === inputList[0] || inputList[0] === "") &&
    (row.city === inputList[1] || inputList[1] === "") &&
    (row.state === inputList[2] || inputList[2] === "") &&
    (row.country === inputList[3] || inputList[3] === "") &&
    (row.shape === inputList[4] || inputList[4] === "") &&
    (row.durationMinutes === inputList[5] || inputList[5] === "")
  ) {return true;}
  return false; 
});

  // use the generateTable function to make a new table
  generateTable(filteredData);

}

//reference button on page
d3.selectAll("#filter-btn").on("click", ButtonClick);

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
