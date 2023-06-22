// Selectors
const checkboxes  = document.querySelectorAll('.form-check-input');
const numberInput = document.querySelector('#typeNumber');
const submitBtn   = document.querySelector('#submit');




// Events
numberInput.addEventListener('input',numberInputOnInput);
submitBtn.addEventListener('click',getStyles)

for (checkbox of checkboxes){
    checkbox.addEventListener('change',checkedListDisable)
}

// Functions
var filename = 'example.txt';
getTextContent(filename)
  .then(content => {
    console.log(content);
    // Use the content as needed
  });

function getTextContent(filename) {
  // Construct the file path
  var filePath = './data/' + filename + '.txt';

  // Use fetch() to read the file
  return fetch(filePath)
    .then(response => response.text())
    .then(text => text)
    .catch(error => {
      console.error('Error:', error);
      return null;
    });
}

getTextContent('bacon');

function getStyles(e){
    e.preventDefault();
    let filename = 'bacon'
    let textFile = readThatTextFile(filename);

    console.log(textFile)
}

function checkedListDisable(){
    check_list = getCheckedBoxes()
    if (check_list.length >= 3){
        for (checkbox of checkboxes){
            if (!checkbox.checked){
                checkbox.disabled = true;
            }
        }
    }
    if (check_list.length < 3){
        for (checkbox of checkboxes){
            checkbox.disabled = false; 
        }
    }
}


function numberInputOnInput(){
    if(this.value > 20){
        this.value = 20;
    }

    if(this.value < 1){
        this.value = 1;
    }
}


function getCheckedBoxes(){
    let checkedList = [];
    for (checkbox of checkboxes){
        if (checkbox.checked){
            checkedList.push(checkbox);
        }
    }
    return checkedList;
}