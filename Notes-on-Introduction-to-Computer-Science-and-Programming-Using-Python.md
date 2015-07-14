---
title: Notes on Introduction to Computer Science and Programming Using Python
---

# Lecture 07 DEBUGGING

black box testing: exercise path through specification.
glass box testing: exercise path through code.

## TESTING and DEBUGGING

### Design your code for ease testing and debugging

* break into components that can be tested and debugged independently
* documents constraints on modules
    * expectation on inputs and outputs
    * even doesn't enforce IO, still good for debugging
* documents assumption on the code

### When are ready to test?

* Ensure the code run
    * No syntax errors
    * No static semantic errors
    * These are handled by Python
* Have a set of expected results

## TEST SUITE

### testing

* Goal
    * show that bugs exist
    * It's hard to show bug free, because:
        * Can't run all possible inputs
        * Formal methods would help but only on simple codes.

### test suite

* a collection of inputs that has high likelihood to reveal bugs.
    * partition the set into subsets that provide equivalent info about correctness
    * construct the test suite contains one element input from each partition.

### An example

```python
def isBigger(x, y):
  '''
  Assume x, y are integers
  '''
```

possible partition:

* x > 0, y > 0
* x > 0, y < 0
* x < 0, y > 0
* x < 0, y < 0
* x = 0, y != 0
* x != 0, y = 0
* x = 0, y = 0

### Partition

What if we don't have natural partition?

* Random testing
* Use heuristics based on exploring paths through the specifications - black box
testing
* Use heuristics based on exploring paths through the code - box testing

## BLACK-BOX TESTING

test suite is designed without actually looking at the code.

* can be done by someone else than the implementer
* will avoid inherent bias of the implementer
* testing is designed without the knowledge of the implementation so if can be
reused even if the implementation has been changed

### Paths through a specification

Also good to consider boundary conditions:

* For lists: empty list, singleton list, many element list
* For numbers: very small, very large, typical cases

## GLASS BOX TESTING

* Use code to guide design of test cases
* Glass-box testing is path-complete if every path through the code is tested at
least once.
    * may not be possible for loop and recursion.
* Even path-complete suite can still miss a bug, depending on the input

## Rules of thumb for glass-box testing

* exercises both branches of if statement
* ensure each except clause is executed
* for each loop:
    * loop is not entered
    * body of loop is executed exactly once
    * body of loop is executed more than once
* for each while loop:
    * Same cases as for loop
    * Cases to catch all ways to exit loop
* recursive functions, no call, one call, more than one recursive call.

## TEST DRIVERS AND STUBS

### Conducting test

* Unit testing (correct algorithm bugs)
    * Check each module work correctly
* Move to integration testing (correct integration bugs)
    * Check that system as a whole works correctly
* Cycle between these phases

### test drivers and stubs

Driver are code that:

* set up environement (binding global variables, data structures)
* invoke code on predefined sequences of inputs
* Save results
* report

Drivers simulate parts of program that use unit being tested
Stubs simulate parts of program used by unit being tested

Allow you to test units that depend on software not yet written

### Good testing practice

* Unit testing
* Move to integration testing
* Be sure to do regression test
    * meaning go back to check the program still passes the tests it used to
    pass

## TIME

### Runtime bugs

* overt v.s. covert:
    * overt has an obvious manifestation - crashes an runs forever
    * covert has no obvious manifestation, returns a value which may be
    incorrect but hard to determine
* Persistent vs. intermittent:
    * Persistent occurs everytime
    * intermittent occurs some times, even with same input

### Categories of bugs

* Overt and persistent:
    * defensive programming, if an error is made it will fall into this categrory
* Overt and intermittent:
    * can be hard to debug, if the conditions that promote the bug can be
    reproduced, can be handled
* Covert bugs:
    * highly dangerous, might run a long time before being catched.

## DEBUGGING AS SEARCH

### Debugging skills

Treat as a search problem: looking for explanation for incorrect behaviour.

* study both correct and incorrect testcases.

### Some pragmatic hints

* Look for usual suspects
* Ask why the code is doing what it is, not why it is not doing what you want
* The bug is probably not where you think it is - eliminate the locations
* Explain the problem to someone else
* Don't believe the documentation
* Take a break and come back later
 
