/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Invalid entry. Please type either YES or NO");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  

  let filteredPeople = people;
  do{
  	let userSearchChoice = prompt("What would you like to search by? Please type either 'height', 'weight', 'eye color', 'gender', 'age', 'occupation' or 'quit'.");

  	switch(userSearchChoice) {
    	case "height":
      	filteredPeople = searchByHeight(filteredPeople);
     	 break;
   	 case "weight":
      	filteredPeople = searchByWeight(filteredPeople);
      	break;
    	case "eye color":
    		filteredPeople = searchByEyeColor(filteredPeople);
    		break;
    	case "gender":
    		filteredPeople = searchByGender(filteredPeople);
    		break;
    	case "age":
    		filteredPeople = searchByAge(filteredPeople);
    		break;
    	case "occupation":
    		filteredPeople = searchByOccupation(filteredPeople);
    		break;
    	case "quit":
    		return;
    		break;
    	default:
      	alert("Invalid search type. Please type one of the following: 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'");
      	searchByTraits(people);
      	break;
  	}  
  	if(filteredPeople.length > 1){
  		alert("Your search returned several records. We need more information to narrow down your search." + "\n" +displayPeople(filteredPeople));
  	}
  }while(filteredPeople.length > 1);

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person in inches?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh in lbs?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.weight matches userInputWeight
  });

  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is the person's eye color?").toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.eyeColor matches userInputEyeColor
  });

  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What is the person's gender? (male/female)").toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
    // return true if el.gender matches userInputGender
  });
  return newArray;
}

function searchByAge(people) {
  let userInputAge = prompt("How old is the person?").toLowerCase();

  let newArray = people.filter(function (el) {
    if(getAge(el.dob) == userInputAge) {
      return true;
    }
    // return true if getAge(el.dob) matches userInputAge
  });

  return newArray;
}

function getAge(dob){
	let today = new Date();
	let birthday = new Date(dob);
	let age = Math.abs(today- birthday)/(31557600000);
	return parseInt(age);
}

function setAge(people){
	people.map(function (el){
		return getAge(el.dob);
	});
	return people;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?").toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.occupation matches userInputOccupation
  });

  return newArray;
}

function getFamily(person, people){
	let newArray = people.filter(function (el){
		if(person.currentSpouse === el.id){
			return true;
		}
		else if(checkParent(person.parents, el)){
			return true;
		}
		else if(checkChild(person, el)){
			return true;
		}
		else if(person.parents.length > 0){
			return checkSiblings(person.parents,el);
		}
			
	});

  return newArray;
}

function checkParent(parents , person){
	for(let i = 0; i < parents.length;i++){
		if(parents[i] === person.id){
			return true;
		}
	}
	return false;
}

function checkChild(person1 , person2){
	let parents = person2.parents;
	if(parents.length > 0){
		for(let i = 0;i < parents.length;i++){
			if(parents[i] === person1.id){
				return true;
			}
		}
	}
	return false;
}

function checkSiblings(parents , person){
	if(parents.length > 0){
		if(parents === person.parents){
			return true;
		}
	}
	return false;
}

// Menu function to call once you find who you are looking for
function mainMenu(person , people){

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
    displayFamily(person, people);
    break;
    case "descendants":
      let descendants = [person];
    	displayDescendants(descendants,people,0);
    break;
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
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  let newArray = people.filter(function (el) {
    if(el.firstName.toLowerCase() + el.lastName.toLowerCase() === firstName + lastName) {
      return true;
    }
    // return true if el. First/Last is equal to input First/Last
  });
  let foundPerson = newArray[0];
  mainMenu(foundPerson, people);
}

// alerts a list of people
function displayPeople(people){
  let filteredList = people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n");
	return filteredList;
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + getAge(person.dob) + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function displayFamily(person,people){
	let family = getFamily(person, people);
  let familyList = "";
    for(let i = 0; i < family.length; i++){
      familyList += family[i].firstName +" "+ family[i].lastName+"\n";
    }
    alert(familyList);
}

function displayDescendants(person, people){
	let arrayDescendants = getDescendants(person, people);
	let descendants = "";
	for(let i = 0;i < arrayDescendants.length;i++){
		descendants += arrayDescendants[i].firstName+" "+arrayDescendants[i].lastName+"\n";
	}
	alert(descendants);
}

function getDescendants(arrayDescendants, people){
   arrayDescendants = arrayDescendants.concat(getChildren(arrayDescendants, people));
   arrayDescendants.shift();
   return arrayDescendants;
}

function getChildren(familyArray, people){
	let newArray = people;
	let childrenArray = [];
	let temporaryArray = [];
	for(let i = 0; i < familyArray.length;i++){
		temporaryArray = newArray.filter(function (el){
			if(checkChild(familyArray[i], el)){
				return true;
			}
			
		});
		childrenArray = childrenArray.concat(temporaryArray);
	}
	if(childrenArray.length > 0){
		return childrenArray.concat(getChildren(childrenArray, people))
	}
	return [];
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