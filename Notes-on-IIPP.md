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
  ...
```

Don't write code all at once. Write a bit, debug it.
Make a copy of list: `list(pos)`
