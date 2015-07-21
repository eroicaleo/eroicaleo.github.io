---
title: Notes on Introduction to Interactive Programming in Python
---

# Lecture 05

## Mouse input

The code for mouse click is
```python
frame.set_mouseclick_handler(mouseclick_handler)

# The position argument is a tuple with two integers
def mouseclick_handler(position):
  pass
```

Don't write code all at once. Write a bit, debug it.
Make a copy of list: `list(pos)`

# Lecture 05b

## Images

```python
canvas.draw_image(image, center_source, width_height_source, center_dest,
 width_height_dest)
```

## Visualizing iteration

## Programming tips

Dictionary is not considered to be ordered.
Dictionary can have boolean as its key like:
```python
d = {True : 1}
```
The keys have to immutable.

## Memory

We need a state machine to record current state.
At state 2, when 2 cards are open, we need to check if we will leave the card
open.
