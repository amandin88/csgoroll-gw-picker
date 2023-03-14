const TEAMS = {
	CT: "Counter-Terrorists",
	T: "Terrorists",
	C: "Chickens"
};

const TEAMS_INPUTS = {
	MIN_TEAM_RANGE_CT: "minTeamRangeCT",
	MAX_TEAM_RANGE_CT: "maxTeamRangeCT",
	MIN_TEAM_RANGE_T: "minTeamRangeT",
	MAX_TEAM_RANGE_T: "maxTeamRangeT",
	MIN_TEAM_RANGE_C: "minTeamRangeC",
	MAX_TEAM_RANGE_C: "maxTeamRangeC",
};

const NUMBERS_INPUTS = {
	MIN_NUMBERS_RANGE_CT: "minNumberRangeCT",
	MAX_NUMBERS_RANGE_CT: "maxNumberRangeCT",
	MIN_NUMBERS_RANGE_T: "minNumberRangeT",
	MAX_NUMBERS_RANGE_T: "maxNumberRangeT",
	MIN_NUMBERS_RANGE_C: "minNumberRangeC",
	MAX_NUMBERS_RANGE_C: "maxNumberRangeC",
};

function rollNumberFromRange() {
	// read the inputs values and store the values
	const minTeamRangeCt = document.getElementById(TEAMS_INPUTS.MIN_TEAM_RANGE_CT).value;
	const minTeamRangeT = document.getElementById(TEAMS_INPUTS.MIN_TEAM_RANGE_T).value;
	const minTeamRangeC = document.getElementById(TEAMS_INPUTS.MIN_TEAM_RANGE_C).value;
	const maxTeamRangeCt = document.getElementById(TEAMS_INPUTS.MAX_TEAM_RANGE_CT).value;
	const maxTeamRangeT = document.getElementById(TEAMS_INPUTS.MAX_TEAM_RANGE_T).value;
	const maxTeamRangeC = document.getElementById(TEAMS_INPUTS.MAX_TEAM_RANGE_C).value;

	const minNumberRangeCt = document.getElementById(NUMBERS_INPUTS.MIN_NUMBERS_RANGE_CT).value;
	const minNumberRangeT = document.getElementById(NUMBERS_INPUTS.MIN_NUMBERS_RANGE_T).value;
	const minNumberRangeC = document.getElementById(NUMBERS_INPUTS.MIN_NUMBERS_RANGE_C).value;
	const maxNumberRangeCt = document.getElementById(NUMBERS_INPUTS.MAX_NUMBERS_RANGE_CT).value;
	const maxNumberRangeT = document.getElementById(NUMBERS_INPUTS.MAX_NUMBERS_RANGE_T).value;
	const maxNumberRangeC = document.getElementById(NUMBERS_INPUTS.MAX_NUMBERS_RANGE_C).value;

	const forceTeamGeneration = document.getElementById("teamSelect").value;

	// roll a team
	let teamRolled = [2];
	let randomNumberRolled;
	let isFieldMissing = false;

	if (forceTeamGeneration === "") {
		if (!minTeamRangeCt || !minTeamRangeT || !minTeamRangeC || !maxTeamRangeCt || !maxTeamRangeT || !maxTeamRangeC
			|| !minNumberRangeCt || !minNumberRangeT || !minNumberRangeC || !maxNumberRangeCt || !maxNumberRangeT || !maxNumberRangeC) {
			isFieldMissing = true;
			document.getElementById("errorLog").innerHTML = "All the fields must be filled.";
		}
		else {
			document.getElementById("errorLog").innerHTML = "";
			teamRolled = rollTeamFromRange(maxTeamRangeCt, maxTeamRangeT, maxTeamRangeC);
		}
	} 
	else {
		if (!minNumberRangeCt || !minNumberRangeT || !minNumberRangeC || !maxNumberRangeCt || !maxNumberRangeT || !maxNumberRangeC) {
			isFieldMissing = true;
			document.getElementById("errorLog").innerHTML = "All the sequential numbers fields must be filled.";
		}
		else {
			document.getElementById("errorLog").innerHTML = "";

			// set the selected team
			teamRolled[0] = forceTeamGeneration;
			teamRolled[1] = " (forced)";
		}
	}

	// roll a random number for the selected team
	if (!isFieldMissing) {
		if (teamRolled[0] === TEAMS.CT) {
			randomNumberRolled = rollNumberBetweenMinMaxIncluded(minNumberRangeCt, maxNumberRangeCt);
		} 
		else if (teamRolled[0] === TEAMS.T) {
			randomNumberRolled =  rollNumberBetweenMinMaxIncluded(minNumberRangeT, maxNumberRangeT);
		}
		else {
			randomNumberRolled =  rollNumberBetweenMinMaxIncluded(minNumberRangeC, maxNumberRangeC);
		}
	}

	document.getElementById("teamRolled").innerHTML = randomNumberRolled ? (teamRolled[0] + " " + teamRolled[1]) : "-";
	document.getElementById("numberRolled").innerHTML = randomNumberRolled ? randomNumberRolled : "-";
}

function rollTeamFromRange(maxCT, maxT, maxC) {
	let teamRolledResult = [2];

	// get a random number from 1 to maxC included
	const randomNumber =  Math.floor(Math.random() * maxC) + 1;

	// check the team of the random number
	if (randomNumber <= maxCT) 
		teamRolledResult[0] = TEAMS.CT;
	else if (randomNumber > maxCT && randomNumber <= maxT) 
		teamRolledResult[0] = TEAMS.T;
	else 
		teamRolledResult[0] = TEAMS.C;

	teamRolledResult[1] = "(" + randomNumber + ")";

	return teamRolledResult;
}

function rollNumberBetweenMinMaxIncluded(min, max) {
	min = Math.ceil(min);
  max = Math.floor(max);
	
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadCookies() {
	document.getElementById(TEAMS_INPUTS.MIN_TEAM_RANGE_CT).value = getCookie("minRangeCT");
	document.getElementById(TEAMS_INPUTS.MIN_TEAM_RANGE_T).value = getCookie("minRangeT");
	document.getElementById(TEAMS_INPUTS.MIN_TEAM_RANGE_C).value = getCookie("minRangeC");

	document.getElementById(TEAMS_INPUTS.MAX_TEAM_RANGE_CT).value = getCookie("maxRangeCT");
	document.getElementById(TEAMS_INPUTS.MAX_TEAM_RANGE_T).value = getCookie("maxRangeT");
	document.getElementById(TEAMS_INPUTS.MAX_TEAM_RANGE_C).value = getCookie("maxRangeC");

	document.getElementById(NUMBERS_INPUTS.MIN_NUMBERS_RANGE_CT).value = getCookie("minNumberCT");
	document.getElementById(NUMBERS_INPUTS.MIN_NUMBERS_RANGE_T).value = getCookie("minNumberT");
	document.getElementById(NUMBERS_INPUTS.MIN_NUMBERS_RANGE_C).value = getCookie("minNumberC");

	document.getElementById(NUMBERS_INPUTS.MAX_NUMBERS_RANGE_CT).value = getCookie("maxNumberCT");
	document.getElementById(NUMBERS_INPUTS.MAX_NUMBERS_RANGE_T).value = getCookie("maxNumberT");
	document.getElementById(NUMBERS_INPUTS.MAX_NUMBERS_RANGE_C).value = getCookie("maxNumberC");
}

function setCookie(name, value) {
	document.cookie = name + "=" + value + ";";
}

function getCookie(cname) {
	let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}