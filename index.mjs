/**
 * Step 1: Stack Overflow: write the recursive function.
 *
 * Here, we create a function that calculates
 * the factorial of a number, n. A factorial
 * is the product of all positive integers
 * less than or equal to the number, n.
 */
// Simple recursivefunction to caculate factorial
const factorial = (n) => {
  if (n === 0) return 1; // The base case, to stop recursion
  return n * factorial(n - 1); // The recursive call
};

/**
 * If we were to call the above with a number as
 * high as, say, 50,000, it would result in a stack
 * overflow.
 */

/**
 * Step Two: modify the recursive function.
 *
 * In order to trampoline the function, we must
 * return another function instead of calling
 * the recursive function itself.
 *
 * This prevents the function from being added
 * directly to the call stack.
 */
// Trampolined versin of the factorial function
const facto = (n, a = 1) => {
  if (n === 0) return a;
  return () => facto(n - 1, n * a);
};

/**
 * Step Three: create a trampoline function.
 *
 * This function takes another function and a list
 * of arguments, and uses a linear loop rather than
 * traditional recursion to handle the function calls.
 *
 * This prevents the stack overflow, while still
 * maintaining the declarative approach provided by
 * recursive functions.
 */
// Trampoline function to avoid stack overflow
const trampoline = (f, ...args) => {
  let result = f(...args);
  while (typeof result === "function") {
    result = result();
  }
  return result;
};

/**
 * Now, we can call the factorial function with as high
 * a number as we would like (as long as we don't run into
 * other errors, like exceeding MAX_SAFE_INTEGER, or looping
 * too many times...).
 *
 * Unfortunately, both of these are the case here, but
 * the principle of trampolining holds!
 */
// Test the trampolined factorial function with a large number
console.log(trampoline(facto(10000)));

//**********Part 3: Deferred Execution */

// Another practical manipulation of the event loop is through “deferred execution” of tasks when working in a browser environment.
// Using setTimeout, you can place tasks into the event queue. This sets the task to be executed after the current call stack is cleared and after the browser has had a moment to render.
// Implement the following:
// Create a simple HTML element to hold text.
//Cache this HTML element into a JavaScript variable.
const primeContainer = document.getElementById("primeNumbers");

// Write a function that takes a parameter n and adds a list of all prime numbers between one and n to your HTML element.
//Create a function isPrime that checks if a number is prime:

const isPrime = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Once complete, use the alert() method to alert the user that the calculation is finished.
// Function to calculate prime numbers up to n and display them

const displayPrimes = (n, current = 2) => {
  if (current > n) {
      alert('Calculation finished');
      return;
  }
  if (isPrime(current)) {
      primeContainer.innerHTML += `${current} `;
  }
  setTimeout(() => displayPrimes(n, current + 1), 0); // Defer the next calculation
};

// displayPrimes(19);
// displayPrimes(23);
// displayPrimes(53);
// displayPrimes(61);

// Start the prime number calculation for n = 10,000
displayPrimes(10000);