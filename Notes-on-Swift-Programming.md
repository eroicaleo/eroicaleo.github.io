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
```
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

```
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
