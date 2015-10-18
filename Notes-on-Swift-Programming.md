# Table of Contents
* [Week 5 objective-c](#week5)

# Week1

## Setting up playground

To get the help on something, there are 3 ways:

1. To use the right panel
2. Hold the "alt" or "option" button
3. The menu bar

## Preference setup

The most interest part is "font and color"
Another important is "account"

## Debug

In the (lldb) command line, `po` to print object.
`nil` means null.

The bug is because the image is not there. We drag the image to the Asset folder.
We can also view the variable by move the mouse on it.

Debug view hierarchy is cool.

# Week2

How to start a new playground
1. File -> New
2. Window -> Welcome to Xcode

Swift is a strong type, but you don't have to declare it. You assign it, and it
gets that type.

No need to use semicolon.

`var` defines a variable, `let` defines a constant.

`nil` is the `null` variable in other languages. But a `string` type or other type
cannot be `nil` in Swift. You can build optional string with a question mark like
```swift
var str: String? = "Hello world!"
```

If you want see all the numbers in a loop, you have to right click the box and select "Value history".

`if` and `guard`
```
for count in 0..<10 {
    guard count != 2 else { continue }
    if count != 5 {
        print(count)
    }
}
```

`switch-case` statement. We cannot put curly bracket after `case`, because it defines a closure.
```
func transmogrify(species: String, weight: Int = 0) -> Int {
    switch species {
        case "duck": return 0
        case "human": return 1
    default: return -1
    }
}
```

For function call, from the 2nd argument, we have to provide the name of that parameter.
```
transmogrify("duck", weight: 500)
```

## 2-D array

```python
# Define a 2-D array
var beautifulImage = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Loop over the 2-D array
for i in 0..<beautifulImage.count {
    for j in 0..<beautifulImage[i].count {
        print(beautifulImage[i][j])
        if beautifulImage[i][j] < 5 {
            beautifulImage[i][j] = 5
        }
    }
}

```

Pass the 2-D array to function is tricky, here is an example. Note we have to
declare the argument as `inout`. And when passing it, we need to use `&` to
indicate we are passing address.

```python
func raiseLowerNumbers(inout inImage image: [[Int]], to number: Int) {
    for i in 0..<image.count {
        for j in 0..<image[i].count {
            if image[i][j] < number {
                image[i][j] = number
            }
        }
    }

}
raiseLowerNumbers(inImage: &beautifulImage, to: 6)
```

Here is a [link](http://stackoverflow.com/questions/27364117/is-swift-pass-by-value-or-pass-by-reference)
about passing value or reference in function.

# Week 3

## optionals

```swift
var maybeString: String? = nil
// If we need to force it to non optional string, we need to do
maybeString!.characters.count
```

But if `maybeString` is `nil`, then we got an error.
And we want to avoid `!` mark.
```swift
if maybeString != nil {
    maybeString!.characters.count
}
```

But Swift has cooler syntax:

```swift
if let definitelyString = maybeString {
    definitelyString.characters.count
} else {
    print("It's nil")
}
```

Use `guard` and optional together make your code more elegant.

```swift
func processString(ss: String?) -> Int {
    guard let tt = ss else { return 0 }

    print(tt)
    return tt.characters.count
}

processString(maybeString) # returns 0
processString("haha") # returns 4
```

Another type of optional

```
var mostLiklyString: String! = nil
mostLiklyString.characters.count // Gives an error
```
But why we need this kind variable? We can have objective-c code, which returns
something optional, but you don't want to use it as optional.
In objective-c, every pointer is optional. When implement interface, this is
important.

### optional chaining

```swift
let niceCar = Car()
niceCar.cupHolder = CupHolder()
niceCar.cupHolder?.cups = []
niceCar.cupHolder?.cups? = ["Sprite"]
let firstCup = niceCar.cupHolder?.cups?[0]
```

difference between arrays and dictionaries, access array of strings always
returns a string. Access dictionaries always return optionals.

## Closure

* How to define it?
```swift
# normal function:
func performMagic(thingy: String) -> String {
    return thingy
}
# closure
var newMagicFunction = {
    (thingy: String) -> String in
    return thingy
}
```

In the above example, the newMagicFunction is anonymous function.

* Why closure is useful?

A more complex example:
```swift
func doComplicatedStuff(complete: () -> ()) {
    // do crazy stuff
    complete()
}
func doMoreComplicatedStuff() {
    print("lala")
}
doComplicatedStuff { doMoreComplicatedStuff() }
```

Another cool thing about closure is that it can capture variable in the scope,
e.g.
```swift
var b = 3
var addFunction2: (Int) -> Int  = {
    (a: Int) -> Int in
    return a + b
}
addFunction2(3) # gives 6
b = 4
addFunction2(3) # gives 7
```

## Properties

Strong Properties and weak properties, in the following example, if dog is
deallocated, the `vet.legs` will be nil.

```swift
class Legs {
    var length: Int = 0
}

class Animal {
    var name: String = ""
    var legs: Legs = Legs()
}

class LegVet {
    weak var legs: Legs? = nil
}

let dog = Animal()
let vet = LegVet()
vet.legs = dog.legs
```

Properties can have public, private and protected (default) access control.

Computed properties, which depends on other properties.

```
class Animal {
    var name: String = ""
    var legs: Legs = Legs()

    var uppercaseName: String {
        get {
            return name.uppercaseString
        }
        set {
            name = newValue
        }
    }
}
dog.uppercaseName = "GoldenHunter"
print(dog.uppercaseName) // GOLDENHUNTER
print(dog.name) // GoldenHunter
```

## Value Types

`struct` and `class` is different in swift in the sense that struct is value
type and class is reference type.
Class is copied by reference and struct is copied by value.

## Cheat Sheet

* supercalss and extend classes.

```swift
class SuperNumber: NSNumber {
    override func getValue(value: UnsafeMutablePointer<Void>) {
        super.getValue(value)
    }
}

extension NSNumber {
    func superCoolGetter() -> Int {
        return 5
    }
}

let n = NSNumber(int: 4)
n.superCoolGetter()

```

* protocol, which is just like the interface in java

```swift
protocol dancable {
    func dance()
}

class Person: NSNumber, dancable {
    func dance() {
        print("dance!")
    }
}
```

* enum

The `enum` object in Swift can be strings, it makes program more type safe.
Note that carrot and randVeggie are different types.

```swift
enum TypesofVeggies: String {
    case Carrots
    case Tomatoes
    case Celery
}

let carrot = TypesofVeggies.Carrots // type is TypesofVeggies
print(carrot.rawValue)

func eatVeggies(veggie: TypesofVeggies) -> String {
    return veggie.rawValue
}

eatVeggies(TypesofVeggies.Carrots)
eatVeggies(carrot)
let randVeggie = TypesofVeggies(rawValue: "Lead") // type is TypesofVeggies?
```

* Initializer

require Initializer and convenience initializer cannot have same signature.

```swift
class Car {
    var cupholder: String = "two holder"

    required init(cupholder: String) {
        print("I am in required init")
        self.cupholder = cupholder
    }

    convenience init() {
        self.init(cupholder: "Cool")
    }
}

let car = Car(cupholder: "cool")

let newCar = Car()
```

* More expert topic
    * generic
    * operator overload

# Week 4

```swift
let image = UIImage(named: "scenery.jpeg")!
```

Swift uses 1-D array to represents the image.
Each green/red/blue is stored as an 8-bit integer UInt8.

```swift
public var red: UInt8 {
    get {
        return UInt8(value & 0xFF)
    }
    set {
        value = UInt32(newValue) | (value & 0xFFFFFF00)
    }
}
```

code can be downloaded from week5 assignment.

Here is the link for follow up reading by Jack Wu:
[Image Processing in iOS Part 1: Raw Bitmap Modification](http://www.raywenderlich.com/69855/image-processing-in-ios-part-1-raw-bitmap-modification)

## Creating Filters

# <a id="week5"></a>Week 5 objective-c

In objective-c, we don't want multiple classes have the same name.
In objective-c, no name space built-in. Traditionally, we add capital letters at
the beginning indicating which classes belong to me.
Just in case, there is some class called 'city' in Cocoa, so we don't overwrite
that class. Convention is to capitalize two letters.

In swift, we don't have to do this. Even the system has the 'city' class, we
don't overwrite that class.

```swift
class City {

}
```

But in objective-c, we have to say `UTCity` is subclass of NSObject

```objective-c
// *.h file
@interface UTCity : NSObject

@end
// *.m file
#import "UTCity.h"
@implementation UTCity
@end
```

In objective-c, if we want to make method available to other parts of the program,
we have to put them in the .h file. swift by default, everything is public.
.h file doesn't include any implementation, definition.

## Types and Initializers Difference

Swift is static typing while objective-c is dynamic typing.

Define properties inside the class.

```swift
class City {
    let name: String
    let population: Int
}
```

```objective-c
// UTCity.h
#import <Foundation/Foundation.h>

@interface UTCity : NSObject

@property (strong, nonatomic) NSString * name;
@property (assign, nonatomic) NSInteger population;

@end
```

Some comments:

* `* name` is because string is not a value type, it's a pointer type. that name
doesn't store a string, just store a reference to that string. `population`
stores the value, so it doesn't have a `*`.
* `strong` means it's not optional, like in swift. Somebody has to own that
string, otherwise it will become deallocated.
* objective-c retains compatibility with C.
* swift more implicitly about everything is reference type or value type.

**Initializer**

Swift:

```swift
class City {
    let name: String
    let population: Int

    required init(name: String, pop: Int) {
        self.name = name
        self.population = pop
    }
}
```

objective-c:

```objective-c
- (instancetype)initWithName: (NSString *)name population: (NSInteger) population
{
    self = [super init];
    if (self) {
        self.name = name;
        self.population = population;
    }
    return self;
}
```

Some comments:

* In objective-c, has to explicitly call the initializer of super calss, it can
return `nil`, so we have to check before we can use it.
* In swift, don't need to do this.
* The initializer in swift is special, but not in objective-c.
