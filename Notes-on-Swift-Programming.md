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
