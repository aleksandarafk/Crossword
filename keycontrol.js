let lastInput; //we globally declare this because otherwise it goes down when we the word we are currently at is vertically alligned

function keycontrol() { //function for finding input cells
  let tablerow = document.querySelectorAll("tr"); //finding the tablerows
  for (let i = 0; i < tablerow.length; i++)
  {
    let tablecell = tablerow[i].querySelectorAll("td"); //finding table data cells
    for (let r = 0; r < tablecell.length; r++)
    {
      let input = tablecell[r].querySelector("input"); //selecting an input - only the first one
      if (input !== null) //we declare what happens if the input is not null - invalid
      {
        input.setAttribute("data-pos", (i*10) + r); //formula for finding the place of the "cursor"
        input.addEventListener("keyup", function(event)    //creating a function to validate if the letter is correct
        {
          event.preventDefault(); //preventing the user from continuing if the validation is not met
          let validated = event.target.checkValidity(); //we check if the validity of the letter is true
          if(validated === true || event.key === "Tab") //allowing the user to proceed to next cell if only he presses TAB or guesses the word
          {
            NextCell(event);
          }
        });
        input.addEventListener("keydown", function(prev) //we add an event for key presses that indicates what the user presses therefore using the function above we verify the input
        {
            prev.preventDefault();
            if(prev.key >= "a" && prev.key <= "z")
            {
              prev.target.value = prev.key;
              prev.target.dispatchEvent(new Event("input"));
            }
        });
      }
    }
  }
}

function NextCell(event) //the function we call in the validated if statement
{
  let input = event.target;

  console.log(event);
  if (lastInput === undefined)
  {
    lastInput = input;
  }

  let wasUp =
    Number(lastInput.getAttribute("data-pos")) ===  Number(event.target.getAttribute("data-pos")) - 10; //if it is going up it removes 10
  let wasLeft =
    Number(lastInput.getAttribute("data-pos")) ===  Number(event.target.getAttribute("data-pos")) - 1; //if it goes left removes 1

  let dataPosition = Number(event.target.getAttribute("data-pos")) + 1; //adds one if we go to the right
  let botInput = document.querySelector("input[data-pos='" + dataPosition + "']");
  let rightInput = document.querySelector("input[data-pos='" + dataPosition + "']");
  if (rightInput) //we get the input position with the querySelector and we focus on it
  {
    rightInput.focus();
  }

  dataPosition = Number(event.target.getAttribute("data-pos")) + 10; //if we go down it adds 10
  botInput = document.querySelector("input[data-pos='" + dataPosition + "']");
  if (botInput && !wasLeft)  //an if statement for declaring where after pressing tab we should go
  {
    botInput.focus();
  }

  lastInput = input;
}

window.addEventListener("keydown", function (event)
{
  event.preventDefault();

  if (event.key === "ArrowDown")  //from last time we use the method that was used to move around with the arrow keys
  {
    let dataPosition = Number(event.target.getAttribute("data-pos")) + 10; //add 10 to move to the bottom
    let nextC = document.querySelector("input[data-pos='" + dataPosition + "']");
    if (nextC) //if statement for focusing the next cell
    {
      nextC.focus();
    }
  }
  if (event.key === "ArrowUp")
  {
    let dataPosition = Number(event.target.getAttribute("data-pos")) - 10; //remove 10 to move to the top
    let nextC = document.querySelector("input[data-pos='" + dataPosition + "']");
    if (nextC) //if statement for focusing the next cell
    {
      nextC.focus();
    }
  }
  if (event.key === "ArrowRight")
  {
    let dataPosition = Number(e.target.getAttribute("data-pos")) + 1; //adds 1 if we go to the right
    let nextC = document.querySelector("input[data-pos='" + dataPosition + "']");
    if (nextC) //if statement for focusing the next cell
    {
      nextC.focus();
    }
  }
  if (event.key === "ArrowLeft")
  {
    let dataPosition = Number(e.target.getAttribute("data-pos")) - 1; //removes 1 if we go to the left
    let nextC = document.querySelector("input[data-pos='" + dataPosition + "']");
    if (nextC) //if statement for focusing the next cell
    {
      nextC.focus();
    }
  }
});

//constant for the crossword
const wordsCells = [
  ["", "", "", "", "", "", "", "", "t", "", ""],
  ["", "", "f", "", "", "", "", "", "h", "", ""],
  ["", "j", "a", "v", "a", "s", "c", "r", "i", "p", "t"],
  ["", "", "l", "", "", "w", "", "", "s", "", ""],
  ["c", "a", "s", "e", "", "i", "", "", "", "", ""],
  ["o", "", "e", "", "s", "t", "r", "i", "n", "g", ""],
  ["n", "", "", "", "", "c", "", "", "u", "", ""],
  ["t", "", "", "", "", "h", "", "", "m", "", ""],
  ["i", "", "", "", "f", "", "n", "", "b", "", ""],
  ["n", "", "", "d", "o", "c", "u", "m", "e", "n", "t"],
  ["u", "", "", "", "r", "", "l", "", "r", "", ""],
  ["e", "", "", "", "", "", "l", "", "", "", ""],
];

const letters = ["A", "B", "C"]; //constant for letter headings in the crossword

function generateInputCells(rows, cols) //using a function to generate the input cells
{
  let newTableData = document.createElement("td");
  let cellData = wordsCells[rows][cols];
  let input = document.createElement("input");
  input.type = "text";

  input.setAttribute("pattern", cellData); //setting the attributes of the cells using setAttribute
  input.setAttribute("maxlength", "1");

  newTableData.appendChild(input); //using appendChild we declare the last input
  return newTableData; //we return the function
}

function generateEmptyRows(rows, cols) //we generate empty table data rows with this function
{
  let newTableData = document.createElement("td");

  let cellsOnTop = rows - 1 >= 0 && wordsCells[rows - 1][cols] !== "";
  let cellsOnBottom = rows + 1 < wordsCells.length && wordsCells[rows + 1][cols] !== "";
  let cellsOnLeft = cols - 1 >= 0 && wordsCells[rows][cols - 1] !== "";
  let cellsOnRight = cols + 1 < wordsCells[rows].length && wordsCells[rows][cols + 1] !== "";

  if ((cellsOnTop && cellsOnBottom) || (cellsOnLeft && cellsOnRight)) //if the rows are on top and bottom or left and right we add a balck square - properties are in the css file
  {
    newTableData.classList.add("blacksquare");
  }

  return newTableData; //we return the newTableData function
}

function generateNumberCells(number) //we generate table headings cells adding +1 for each one and returning the newTableData function
{
  let newTableData = document.createElement("th");
  newTableData.textContent = number + 1;
  return newTableData;
}

function generateTable()  //using this function we create the whole table with selection of the tbody + table heads, empty cells and cells with data
{ 
  const tableBody = document.querySelector("tbody");

  for (let row = 0; row < wordsCells.length; row++)
  {
    let newTableRow = document.createElement("tr");
    if (row > 0)
    {
      let firstTableData = document.createElement("th");
      firstTableData.textContent = String.fromCharCode(64 + row);
      newTableRow.appendChild(firstTableData);
    }
    else
    {
      let firstTableData = document.createElement("th");
      newTableRow.appendChild(firstTableData);
    }

    tableBody.appendChild(newTableRow);

    for (let col = 0; col < wordsCells[row].length; col++)
    {
      let cellData = wordsCells[row][col];
      let newTableData;

      if (row === 0)
      {
        newTableData = generateNumberCells(col);
      }
      else if (cellData === "")
      {
        newTableData = generateEmptyRows(row, col);
      }
      else
      {
        newTableData = generateInputCells(row, col);
      }

      newTableRow.appendChild(newTableData);
    }
  }

  keycontrol(); //calling the keycontrol function
}

generateTable();  //calling the generateTable function
