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
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      displayPeople(filteredPeople);
      return;
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      displayPeople(filteredPeople);
      return;
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      displayPeople(filteredPeople);
      return;
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      displayPeople(filteredPeople);
      return;
      break;
    case "age":
      filteredPeople = searchByAge(people);
      displayPeople(filteredPeople);
      return;
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      displayPeople(filteredPeople);
      return;
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
function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person?");


  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });
  return newArray;
}
function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?");

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
    if (el.gender == userInputGender) {
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
    displayPerson(person);
    break;
    case "family":
    displayPeople(determineFamily(people, person));
    break;
    case "descendants":
    displayPeople(displayDescendents(people, person));
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
      for (var j = 0; j < people[i].parents.length; j++) {
        if (parentArray.includes(people[i].parents[j]) != true) {
        parentArray.push(people[i].parents[j]);
        }
    }
    }
  return parentArray;
}
function checkChildren(people, person){
  let childArray = [];
    for (let i = 0; i < people.length; i++) {
      if (people[i].parents.includes(person.id) || people[i].parents.includes(person)) {
        let childID = people[i].id;
        childArray.push(childID);
      }
    }
  return childArray;
}



function determineDescendents(people, person) {
  let parentIdArray = getParentID(people);
  let familyArray = [];
  if (parentIdArray.includes(person.id) || parentIdArray.includes(person)) {
    let childrenArray = checkChildren(people, person);
    familyArray = familyArray.concat(childrenArray);
  }
  for (let i = 0; i < familyArray.length; i++) {
    familyArray = familyArray.concat(determineDescendents(people, familyArray[i]));
  }
  return familyArray;
}
function displayDescendents(people, person) {
  let descendantsArray = determineDescendents(people, person);
  let newArray = people.filter(function (el) {
    for (let i = 0; i < descendantsArray.length; i++) {
      if (el.id == descendantsArray[i]) {
        return true;
      }
    }
  });
  return newArray;
}

function determineFamily(people, person){
  let familyArray = [];
  let childArray = checkChildren(people, person);
  if(person.currentSpouse > 0){
    familyArray.push(person.currentSpouse);
    let spouseID = people.filter(function (el) {
      for (let i = 0; i < people.length; i++) {
        if (el.id == person.currentSpouse) {
          return true;
        }
      }
    });
    if (spouseID[0].parents.length > 0) {
      for (let i = 0; i < spouseID[0].parents.length; i++) {
        familyArray.push(spouseID[0].parents[i]);
      }
    }
    let spouseKids = checkChildren(people, spouseID[0]);
    if (spouseKids.length > 0) {
      for (let i = 0; i < spouseKids.length; i++) {
        if (childArray.includes(spouseKids[i]) != true) {
          childArray.push(spouseKids[i]);
        }
      }
    }
  }

  if (person.parents > 0) {
    familyArray = familyArray.concat(person.parents);
  }
  let treeArray;
  if (childArray.length > 0) {
    treeArray = familyArray.concat(childArray);
  }
  else {
    treeArray = familyArray;
  }
  let newArray = people.filter(function (el) {
    for (let i = 0; i < treeArray.length; i++) {
      if (el.id == treeArray[i]) {
        return true;
      }
    }
  });
  return newArray;
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
