import '@testing-library/jest-dom';

/* any window.alert instances throughout the
   code will be called as console.log instead.
   this is required due to headless browser test running */
window.alert = console.log;
