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

* set up environment (binding global variables, data structures)
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

## DEBUGGING

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

# Lecture 08 Assertion and Exceptions

## EXCEPTIONS

### What is an exception?

What if the code hits an unexpected condition? These are called exceptions.

* IndexError:

```python
Test = [1, 2, 3]
Test[4]
```

* TypeError:

```python
int(Test)
'a' / 4
```

* NameError:

```python
noThisName += 1
```

### What to do with exceptions?

* Fail sliently? Really bad idea! User gets no indication that results might be
suspect.
* Return a "error" value
    * What to return? `None`?
    * The caller must have code to check the error value and deal with this
    error.
    * Stop execution, signal error condition.
    ```python
    raise Exception('descriptive string')
    ```

### Dealing with exceptions

```python
try:
  f = open('grade.txt')
  # Code to process
except:
  raise Exception('Cannot find file!')
```

### Handling specific exceptions

Usually handler is only meant to deal with a particular type of exception.

```python
try:
  f = open('grade.txt')
  # Code to process
except IOError, e:
  raise Exception('Cannot find file!')
  sys.exit(0)
except ArithmeticError, e:
  raise ValueError('Bug in grade calculation ' + str(e))
```

### Types of exceptions

* SyntaxError
* NameError
* TypeError
* IndexError
* IOError
* ValueError
* AttributeError

### Other extensions to `try`

* `else`: Try block with no exceptions.

```python
try:
else:
except:
```

* `finally`
    * always gets executed no after `try`, `else`, `except` even if they raise
    anoter error or execute a `break`, `continue` or `return`.
    * Useful for clean-up code which should be run no matter what else happened
    , like close a file.

## EXCEPTION AS CONTROL FLOW

### Exception as flow of control

* In traditional languages, one deals with errors by having functions return
special values
* Any other functions has to check 'error value' was returned.
* In python, just raise an exception

## ASSERTIONS

### Assertions

* We want to make sure the assumptions on state of computation are as expected,
we can use `assert` statement.
* We can't control the response, but will raise an `AssertionError` exception.
* Good for defensive programming.

```python
def avg(grades, weights):
  assert not len(grades) == 0, 'not grades data'
  newgr = [convertLetter(elt) for elt in grades]
  return dotProduct(newgr, weights) / len(newgr)
```

### Assertions as defensive programming

* Assertions don't allow a programmer to control response, they guarantee execution halts whenever an expected condition is not met
* Typically used to check input
* Make easier to locate a bug

### Where to use assertions?

* Goal is to spot bugs early
* Not to be used in place of testing, but as a supplement to testing.
* If users supply bad data input:
    * Check types of arguments
    * Check invariants on data structures are met
    * Check constraints on return values
    * Check for violations of constraints on procedure

# Lecture 11 Classes

## Advantages of OOP

## A CLASS EXAMPLE

### Creating an instance

```python
class Coordinate(object):
  def __init__(self, x, y):
    self.x = x
    self.y = y
```

## AN ENVIRONMENT VIEW OF CLASS

This section is interesting, needs more notes.

## ADDING METHODS TO A CLASS

```python
isinstance(c, Coordinate)
type(c)
```

# Lecture 12 Object Oriented Programming

## INHERITANCE

python `list.sort()` will use the __lt__ method in the class

## USING INHERITANCE SUBCLASSES TO EXTEND BEHAVIOR

```python
class MITPerson(Person):
  # Bind to the class, not instance
  # Like the static variable in C++/JAVA
  nextIdNum = 0

  def __init__(self, name):
    Person.__init__(self, name)
    self.idNum = MITPerson.nextIdNum
    MITPerson.nextIdNum += 1

  def __lt__(self, other):
    return self.idNum < other.idNum
```

Note here the `MITPerson` 's `__init__` and `__lt__` will shadow the same method
defined in `Person` class.

```python
# One consequence is like this:
p1 = MITPerson('Eric')
p2 = Person('John')
# This is OK
p2 < p1
# This is not
p1 < p2
```

## USING INHERITANCE: DESIGNING A CLASS HIERARCHY

## EXAMPLE: A GRADEBOOK

## GENERATORS

Any procedure with `yield` statement is a generator.
generator has `next()` methods.
When `next()` is called, it will execute until it hits `yield`, which suspend execution
and returns a value.
Until it raises a `StopIteration` exception

* A generator separates the concept of computing
a very long sequence of objects, from the actual
process of computing them explicitly
* Allows one to generate each new objects as
needed as part of another computation (rather
than computing a very long sequence, only to
throw most of it away while you do something on
an element, then repeating the process)
