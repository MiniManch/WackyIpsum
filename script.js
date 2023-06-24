// Selectors
const checkboxes = document.querySelectorAll('.form-check-input');
const numberInput = document.querySelector('#typeNumber');
const submitBtn = document.querySelector('#submit');
const baseURL = 'https://raw.githubusercontent.com/MiniManch/WackyIpsum/main/data/';
const paraInput = document.querySelector('#para');
const lineInput = document.querySelector('#line');
const copyBtn   = document.getElementById("copy-btn");
const result    = document.getElementById('result-box');
const resetBtn = document.getElementById("reset-btn");

let ipsum = [];
let para = [];


// Events
paraInput.addEventListener('input', numberInputOnInput);
lineInput.addEventListener('input', numberInputOnInput);
copyBtn.addEventListener("click", copyToClipboard);
resetBtn.addEventListener("click", resetEverything);


for (checkbox of checkboxes) {
    checkbox.addEventListener('change', checkedListDisable);
}

submitBtn.addEventListener('click',activateApp)

// Functions
async function activateApp(e) {
    // filename, num_of_lines, num_of_para
    e.preventDefault();
    filenames    = getCheckedBoxes();
    if (filenames.length == 0){
        alert('you did not choose a wacky Ipsum \n So i will choose for you!');
        filenames = checkCheckboxesRandomly();
    }
    
    num_of_lines = convertToInt(lineInput.value,lineInput.id);
    num_of_para  = convertToInt(paraInput.value,paraInput.id);

    let totalLines = num_of_lines * num_of_para ;
    let currentFile = filenames[0];
    let paraCounter = num_of_lines;

    resetVars();
    while (totalLines != 0){
        while(paraCounter != 0){
            await getLine(currentFile,para);
            if (currentFile != filenames[filenames.length-1]){
                currentFile = filenames[filenames.indexOf(currentFile)+1];
            } else if(currentFile == filenames[filenames.length-1]){
                currentFile = filenames[0];
            }
            paraCounter -= 1;
            if (paraCounter == 0){

                newString = await joinListToString(para);
                ipsum.push(newString);
                ipsum.push('\n');
                para = [];
            }
        }
        totalLines -=1;
        paraCounter = num_of_lines;
    }

    let finalString = joinListToString(ipsum)
    result.value = finalString;
    // resetVars();

}

async function getTextContent(filename) {
  const response = await fetch(baseURL + filename + '.txt');
  const text = await response.text();
  return text;
}

async function getLine(filename,array) {
  try {
    const text = await getTextContent(filename);
    file = text;

    file = file.replaceAll('\n', '');
    file = file.split('.');
    newList = [];

    for (line of file) {
        if(line != ''){
            newList.push(line.replace('\r\n\r\n', ''));
        }
    }
    randomLine = newList[Math.floor(Math.random() * newList.length)];

    if (randomLine[0] == ' ') {
      randomLine[0] = '';
    }
    randomLine = `${randomLine}.`;
    array.push(randomLine);

  } catch (error) {
    console.log('Error:', error);
  }
}

function joinListToString(array) {
  let newString = array.join('');
  return newString;
}

function checkedListDisable() {
  check_list = getCheckedBoxes();
  if (check_list.length >= 3) {
    for (checkbox of checkboxes) {
      if (!checkbox.checked) {
        checkbox.disabled = true;
      }
    }
  }
  if (check_list.length < 3) {
    for (checkbox of checkboxes) {
      checkbox.disabled = false;
    }
  }
}

function numberInputOnInput() {
    if (this.id == 'para' && this.value > 20) {
        this.value = 20;
    }

    if (this.id == 'para' && this.value < 1) {
        this.value = 1;
    }

     if (this.id == 'line' && this.value > 4) {
        this.value = 4;
    }

    if (this.id == 'line' && this.value < 1) {
        this.value = 1;
    }
}

function getCheckedBoxes() {
  let checkedList = [];
  for (checkbox of checkboxes) {
    if (checkbox.checked) {
      checkedList.push(checkbox.id);
    }
  }
  return checkedList;
}

function convertToInt(line,itsId){
    if (line != ''){
        line = parseInt(line);
    }else{
        if(itsId == 'line'){
            line = Math.floor(Math.random() *4)+1;
        }
        if(itsId = 'para'){
            line = Math.floor(Math.random() *20)+1;
        }
    }
    return line;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

function getRandomLine(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function checkCheckboxesRandomly(){
    i = getRandomNumber();
    let filenames = [];

    while(i > 0){
        randomItem = getRandomLine(checkboxes);
        randomItem.checked = true;
        filenames.push(randomItem.id);
        i -= 1;
    }
    return filenames;
}

function copyToClipboard() {
    var resultBox = document.getElementById("result-box");
    resultBox.select();
    document.execCommand("copy");
}

function resetVars(){
    paraInput.value = '';
    lineInput.value = '';
    result.value    = '';

    ipsum = [];
    para = [];

    return true;
}

function resetCheckBoxes(){
    for (checkbox of checkboxes){
        checkbox.checked = false;
        checkbox.disabled = false;
    }
}

function resetEverything(){
    resetVars();
    resetCheckBoxes();
}