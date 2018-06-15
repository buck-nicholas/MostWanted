/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let filteredPeople;
  switch(searchType){
    case 'yes':
    filteredPeople = searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople = [];

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    case "Age":
      filteredPeople = searchByAge(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What color eyes does the person have? Select: Brown, Blue, Hazel, Green, or Black");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.eyeColor matches userInputEyeColor
  });

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });
  return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation? Enter: Assistant, Doctor, Landscaper, politician, Programmer, or Nurse");

  let newArray = people.filter(function(el){
    if(el.occupation == userInputOccupation){
      return true;
    }
  });
  return newArray;
}

function searchByAge(people){
  let userInputAge = prompt("Please enter the age of the person you are looking for.")
  for (let i = 0; i < people.length; i++) {
    let age = calculateAge(people[i])
    people[i].age = age;
  }
  console.log(people[0].firstName + "'s is " + people[0].age);
  let newArray = people.filter(function(el){
    if(el.age == userInputAge){
    return true;
    }
  });
  return newArray;
}

function searchByGender(people){
  let userInputGender = prompt("Please enter gender of the person you are looking for.")

  let newArray = people.filter(function(el){
    if (searchByGender == userInputGender) {
      return true
    }
  });
  return newArray
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    determineFamily(people);
    break;
    case "descendants":
    determineDescendents(people);
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  // TODO: find the person using the name they entered
  let newArray = people.filter(function (el) {
    if(el.firstName == firstName && el.lastName == lastName) {
      return true;
      // return true if el.firstName or el.lastName == user input for firstName and lastName
    }
  });
  return newArray;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + calculateAge(person) + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  alert(personInfo);
}

function getParentID(people){
  let parentArray = [];
    for (var i = 0; i < people.length; i++) {
      for (var j = 0; j < people.parents.length; j++) {
        parentArray.push(people[i].parents[j]);
    }
    }
  return parentArray;
}

function checkChildren(people){
  let childArray = [];
    for (var i = 0; i < people.length; i++) {
      for (var j = 0; j < parents[j].length; j++){
        if (people[i].parents[j].includes(parentID)) {
        let childID = people.id;
        childArray.push(childID);
      }
    }
}
  return childArray;
}

function determineDescendents(people){

let descendantsArray = [];
if(parentArray.includes(parentID)) {
  for (i =0; i < people.length; i++){
      if(people[i].parents(parentID)){
        let childID = people[i].id[0];
        descendantsArray.push(childID);
      }
    }
  }
  return descendantsArray;
}



function determineFamily(people){


  let familyArray = [];
  if(people.currentspouse > 1){
    familyArray.push(people.currentspouse);
  }
  let childArray = checkChildren(people);
    if (childArray.length > 0) {
      familyArray.concat(childArray);
    }
  return familyArray;
}





function calculateAge(person) {
  let birthday;
  birthday = person.dob;
  let dobArray = birthday.split("/");
  // getting todays date
  let todaysDate = new Date();
  let yearNow = todaysDate.getFullYear();
  let monthNow = todaysDate.getMonth() + 1;
  let dayNow = todaysDate.getDate();
  let age;
  age = yearNow - dobArray[2];
  if (monthNow < dobArray[0] && dayNow < dobArray[1]) { // if month and date are less than birthday, age--
    age--;
  }
  return age;
  // newStr = str.substr(str.length - 4);
}


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}




