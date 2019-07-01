describe('Measure visibility of the image', ()=>{
	var scriptObj;
	var countdownTimer;
	var dummyAdElement;
	var percentageVisibilityElement;
	var visibilityStatusElement;

	var visibilityState = function(state) {
		document.hidden = state === "hidden";
};
	beforeEach(function() {
		dummyAdElement = document.createElement('div');
		percentageVisibilityElement = document.createElement('td');
		visibilityStatusElement = document.createElement('td');
	});

	it('should handle tab change or window minimize events and show visibility status of ad element as visible', ()=>{
		//data or spy set up
		var coordinate = {
			top: 104,
			right: 408,
			bottom: 350,
			left: 108
		};
		document.getElementById = jasmine.createSpy('HTML Element').and.returnValues(dummyAdElement, percentageVisibilityElement, visibilityStatusElement);
		spyOn(dummyAdElement,'getBoundingClientRect').and.returnValue(coordinate);
		var startTimeCounterSpy = jasmine.createSpy('startTimeCounter');

		// function call
		handleVisibilityChange();

		//expects
		expect(percentageVisibilityElement.innerHTML).toBe("100%");
		expect(visibilityStatusElement.innerHTML).toBe("visible");
	});

	it('should handle tab change or window minimize events and show visibility status of ad element as hidden', ()=>{
		//data or spy set up
		var coordinate = {
            top: -250,
			right: 408,
			bottom: 0,
			left: 108
		};
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValues(dummyAdElement, percentageVisibilityElement, visibilityStatusElement);
		spyOn(dummyAdElement,'getBoundingClientRect').and.returnValue(coordinate);
		var startTimeCounterSpy = jasmine.createSpy('startTimeCounter');

		// function call
		handleVisibilityChange();

		//expects
		expect(percentageVisibilityElement.innerHTML).toBe("0%");
	});

	it('should handle window scroll events and show visibility status of ad element as visible', ()=>{
		//data or spy set up
		var coordinate = {
			top: 104,
			right: 408,
			bottom: 350,
			left: 108
		};
		document.getElementById = jasmine.createSpy('HTML Element').and.returnValues(dummyAdElement, percentageVisibilityElement, visibilityStatusElement);
		spyOn(dummyAdElement,'getBoundingClientRect').and.returnValue(coordinate);
		jasmine.createSpy('startTimeCounter');
        
        // function call
		handleWindowScroll();

		//expects
		expect(percentageVisibilityElement.innerHTML).toBe("100%");
		expect(visibilityStatusElement.innerHTML).toBe("visible");
	});

	it('should handle window scroll events and show non visibility status of ad element as hidden', ()=>{
		//data or spy set up
		var coordinate = {
			top: -250,
			right: 408,
			bottom: 0,
			left: 108
		};
		document.getElementById = jasmine.createSpy('HTML Element').and.returnValues(dummyAdElement, percentageVisibilityElement, visibilityStatusElement);
		spyOn(dummyAdElement,'getBoundingClientRect').and.returnValue(coordinate);
		jasmine.createSpy('stopTimeCounter');

		// function call
		handleWindowScroll();

		//expects
		expect(percentageVisibilityElement.innerHTML).toBe("0%");
		expect(visibilityStatusElement.innerHTML).toBe("hidden");
	});

	it('should return true if element is in viewport', ()=>{
		//data or spy set up
		var coordinate = {
            top: 104,
            right: 408,
            bottom: 350,
            left: 108
		};
		spyOn(dummyAdElement,'getBoundingClientRect').and.returnValue(coordinate);

		// function call
		var visibilityStatus = isVisible(dummyAdElement);

		//expects
		expect(visibilityStatus).toBe(true);
	});

	it('should return false if element is not in viewport', ()=>{
		//data or spy set up
		var coordinate = {
            top: -250,
            right: 408,
            bottom: 0,
            left: 108
		};
		spyOn(dummyAdElement,'getBoundingClientRect').and.returnValue(coordinate);

		// function call
		var visibilityStatus = isVisible(dummyAdElement);

		//expects
		expect(visibilityStatus).toBe(false);
	});

	it('should calculate visibility for ad element in percentage if ad element is completely visible', ()=>{
		//data or spy set up
		var coordinate = {
            top: 104,
            right: 408,
            bottom: 354,
            left: 108
		};
		spyOn(dummyAdElement,'getBoundingClientRect').and.returnValue(coordinate);

		// function call
		var visibilityInPercentgae = calculateVisibilityForDiv(dummyAdElement);

		//expects
		expect(visibilityInPercentgae).toBe("100%");
	});

	it('should calculate visibility for ad element in percentage if ad element is partially visible', ()=>{
		//data or spy set up
		var coordinate = {
            top: -125,
            right: 408,
            bottom: 125,
            left: 108
		};
		spyOn(dummyAdElement,'getBoundingClientRect').and.returnValue(coordinate);

		// function call
		var visibilityInPercentgae = calculateVisibilityForDiv(dummyAdElement);

		//expects
		expect(visibilityInPercentgae).toBe("50%");
	});
  });

/************************************************************************************************
 *                                                                                              *
 *                              COUNTDOWN TIMER SPEC                                            *
 *                                                                                              *
 ************************************************************************************************/

describe('Start and stop time counter as per different events', ()=>{
	var dummyElement1;
	var dummyElement2;
	//This will be called before running each spec
	beforeEach(function() {
		spyOn(window, 'setInterval');
		spyOn(window, 'clearInterval');
		dummyElement1 = document.createElement('span');
		dummyElement2 = document.createElement('span');
		document.getElementById = jasmine.createSpy('HTML Element').and.returnValues(dummyElement1, dummyElement2);
	});

	it('should set interval for countdown timer', ()=>{
        //data or spy set up
        window.interval = 5;

        // function call
        startTimeCounter();
        
        //expects
		expect(clearInterval).toHaveBeenCalledWith(5);
		expect(setInterval).toHaveBeenCalledWith(jasmine.any(Function), 10);
	});

	it('should stop the countdown timer', ()=>{
        // function call
        stopTimeCounter();
      
        //expects
	    expect(clearInterval).toHaveBeenCalledWith(undefined);
	});

	it('should apend 0 if tens are less than 9', ()=>{
        //data or spy set up
        window.tens = 7;
        
        // function call
        startTimer();
        
        //expects
		expect(dummyElement1.innerHTML).toBe("08");
	});

	it('should show tens untill 99', ()=>{
        //data or spy set up
        window.tens = 15;
        
        // function call
        startTimer();
        
        //expects
		expect(dummyElement1.innerHTML).toBe("16");
	});

	it('should show seconds to 01 if tens exceed 99', ()=>{
        //data or spy set up
		window.tens = 100;
        window.seconds = 0;
        
        // function call
        startTimer();
        
        //expects
		expect(dummyElement1.innerHTML).toBe("00");
		expect(dummyElement2.innerHTML).toBe("01");
	});

	it('should show seconds to 10 if tens cross 99', ()=>{
        //data or spy set up
		window.tens = 98;
        window.seconds = 10;
        
        // function call
        startTimer();
        
        //expects
		expect(dummyElement1.innerHTML).toBe("99");
		expect(dummyElement2.innerHTML).toBe("10");
	});

  });


/************************************************************************************************
 *                                                                                              *
 *                              USER ACTIVITY TRACKING SPEC                                     *
 *                                                                                              *
 ************************************************************************************************/

  describe('Track user activity like click and mouse move', ()=>{
    //This will be called before running each spec
    var dummyElement;
	beforeEach(function() {
		spyOn(window, 'setTimeout');
		spyOn(window, 'clearTimeout');
        dummyElement = document.createElement('td');
	});

	it('should set interval for countdown timer', ()=>{
        //data or spy set up
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        
        //function call
        window.inactiveUser();
        
        //expects
        expect(dummyElement.innerHTML).toBe("Inactive");
    });

	it('should reset the timer show status as active', ()=>{
        //data or spy set up
        window.activeTime = 1;
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        
        //function call
        resetTimer();

        //expects
        expect(clearTimeout).toHaveBeenCalledWith(1);
        expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 3000);
        expect(dummyElement.innerHTML).toBe("Active");
	});
  });
