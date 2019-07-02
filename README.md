## PageVisibilityAPI

Ad view-ability and user tracking The index.html file contains the advertisement. script.js file has code that will track a viewability of the ad.

## The ad being viewable means:

- The advertisement is 100% in the viewport of the browser (not viewable would be if the user scrolls to the bottom of
 the
 page)
- The browser tab is opened (not viewable would be if you open some other page, e.g. facebook.com in another tab and
the page looses its focus)

## Goal:
- Measure the viewability of the DIV that contains the ad
- Determine viewability also by evaluating the windows focus state (tab change, window unfocused)
- Log your results either to the console or render it on the page

## Requirements:
- You can use pure JavaScript or any library or a framework of your choice
- Feel free to override the `window.log` function.
  This function is invoked every **500ms** and should perform a simple `console.log` with your current viewability values.
- Feel free to override the whole `script.js` if needed
- Feel free to override the `printStatus` function - if you feel that you would like to display data in some other way
that just logs in the console - you're more than welcome to do it!
- The HTML structure of `index.html` file shouldn't be changed
- Browser support at least one browser of your choice

## Extras features:
- Measure the portion of the ad that is visible in %
- Track clicks

## SPECS
To run the specs please open UnitTestRunner.html in browser
