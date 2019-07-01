/************************************************************************************************
 *                                                                                              *
 *                           DETERMINE AD ELEMENT VISIBILITY START                              *
 *                                                                                              *
 ************************************************************************************************/
//Start the time counter as soon as page loads
startTimeCounter();
// window.onload = resetTimer;

//Set the name of the hidden property and the change event for visibility for all the different type of browser
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") { //Firefox 
	hidden = "mozHidden";
	visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {  // IE & Edge
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") { // Safari, Chrome, Opera
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

//Add visibilityChange event listener only if the browser supports Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log("Application is not accessible, Please use Google Chrome or Firefox");
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange);
}

//Add an event listener for the window scroll event
window.addEventListener('scroll', handleWindowScroll);

/**
 * handles visibility change for opening a new tab or
 * minimizing the browser and coming back to page again
 *
 */
function handleVisibilityChange() {
	var visibiltyTimeChange = new Date().toTimeString().split(' ')[0];
	var adElement = document.getElementById("ad");
	var percentageVisibility = document.getElementById("percentageVisible");
	var visibilityStatusElement = document.getElementById("elementVisibility");

	if (document.hidden) {
		stopTimeCounter();
		console.log("Page hidden at ", visibiltyTimeChange);
	} else {
		//Check if the element is visible or not and accordingly stopTimeCounter the timer and set percentage of visibility
		if(isVisible(adElement)){
		//Start the counter if it is visible on returning back to page
			startTimeCounter();
			percentageVisibility.innerHTML = calculateVisibilityForDiv(adElement);
			visibilityStatusElement.innerHTML = "visible";
			console.log("Element visible at ", visibiltyTimeChange);
		} else{
			//if ad element is not visible then mark visibility as 0%
			percentageVisibility.innerHTML = "0%";
			console.log("Ad element is hidden");
		}
	}
};

/**
 * handle window scroll and it will take care of mouse up and down as well
 *
 */
function handleWindowScroll(){
	var visibiltyTimeChange = new Date().toTimeString().split(' ')[0];
	var adElement = document.getElementById("ad");
	var percentageVisibility = document.getElementById("percentageVisible");
	var visibilityStatusElement = document.getElementById("elementVisibility");

	if(!isVisible(adElement)){
		stopTimeCounter();
		percentageVisibility.innerHTML = "0%";
		visibilityStatusElement.innerHTML = "hidden";
		console.log("Element hidden at ", visibiltyTimeChange);
	} else{
		startTimeCounter();
		percentageVisibility.innerHTML = calculateVisibilityForDiv(adElement);
		visibilityStatusElement.innerHTML = "visible";
	console.log("Element visible at ", visibiltyTimeChange);
	}
};

/**
 * check if element is visible on the screen
 *
 * @param {<DIV>} adElement
 * 			element for which visibility needs to be checked
 *
 */
function isVisible(adElement) {
	var coordinates = adElement.getBoundingClientRect();
	return coordinates.bottom > 0 && coordinates.right > 0 &&
		coordinates.left < (window.innerWidth || document.documentElement.clientWidth) &&
		coordinates.top < (window.innerHeight || document.documentElement.clientHeight);
};

/**
 * calculate element visibilty in percentage
 *
 * @param {<DIV>} adElement
 * 			element for which percentage of visibility needs to be calculated
 */
function calculateVisibilityForDiv(adElement) {
	var percentage;
	var fraction;
	var height = 250;
	var width = 300;
	var coordinates = adElement.getBoundingClientRect();

	if(coordinates.top < 0 && coordinates.top > -250){
		height = 250 + coordinates.top;
	}

	if(coordinates.left < 0 && coordinates.left > -300){
		width = 300 + coordinates.left;
	}

	fraction = (height*width)/(250*300);
	percentage = fraction.toFixed(2);
	percentage = parseFloat(percentage)*100;

	return percentage+"%";
};
/************************************************************************************************
 *                                                                                              *
 *                           DETERMINE AD ELEMENT VISIBILITY END                                *
 *                                                                                              *
 ************************************************************************************************/




/************************************************************************************************
 *                                                                                              *
 *                              COUNTDOWN TIMER START                                           *
 *                                                                                              *
 ************************************************************************************************/
var interval;
var seconds = 00;
var tens = 00;

/**
 * start the time counter
 *
 */
function startTimeCounter() {
	clearInterval(interval);
	interval = setInterval(startTimer, 10);
};

/**
 * stop the time counter
 *
 */
function stopTimeCounter() {
	clearInterval(interval);
};

/**
 * start the timer and update tens and seconds regularly
 *
 */
function startTimer () {
	var appendTens = document.getElementById("adTimeCounterTens");
	var appendSeconds = document.getElementById("adTimeCounterSeconds");
	tens++;

	if(tens < 9 && appendTens){
		appendTens.innerHTML = "0" + tens;
	}
	if (tens > 9 && appendTens){
		appendTens.innerHTML = tens;
	}
	if (tens > 99 && appendSeconds) {
		seconds++;
		appendSeconds.innerHTML = "0" + seconds;
		tens = 0;
		appendTens.innerHTML = "0" + 0;
	}
	if (seconds > 9 && appendSeconds){
		appendSeconds.innerHTML = seconds;
	}
};

/************************************************************************************************
 *                                                                                              *
 *                              COUNTDOWN TIMER END                                             *
 *                                                                                              *
 ************************************************************************************************/






 /************************************************************************************************
 *                                                                                              *
 *                              USER ACTIVITY TRACKING TIMER START                              *
 *                                                                                              *
 ************************************************************************************************/

//these two event handler will determine user activity
//if user keeps clicking or do mouse scroll then user is active and if not then inactive in next 5 seconds
//
//We can add more event listener to track full fledge activity of the user
//We can add feature to start and stop countdown timer based on user activity(clicks or other event)
//there could be separate business rules to determine what to show in scenarios described below
//
//1. If ad element is visible and user goes inactive
//2. If ad element is visible, user goes inactive, then user goes to other tab and come back again
//3. If ad element is not visible and user goes inactive
//4. If ad element is not visible, user goes inactive, then user goes to other tab and come back again)
resetTimer();
var activeTime;
this.addEventListener("click", resetTimer, false);
this.addEventListener("wheel", resetTimer, false);

function inactiveUser() {
    //if user is inactive change the user activity element to inactive
    document.getElementById("userActivity").innerHTML = "Inactive";
};

function resetTimer() {
    //clear timeout so that new timer of active user start
    //get the user activity element and make it active
    //set new timer so that new timer for 5000 ms ( 5 sec.) starts during these 5 sec. user will be active
    clearTimeout(activeTime);
    document.getElementById("userActivity").innerHTML = "Active";
    activeTime = setTimeout(inactiveUser, 3000);
};
/************************************************************************************************
 *                                                                                              *
 *                              USER ACTIVITY TRACKING TIMER END                                *
 *                                                                                              *
 ************************************************************************************************/
