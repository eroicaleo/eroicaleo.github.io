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

# Lecture 06

## Object-oriented programming

```python
# Constructor
__init__
# String method
__str__
```

## Working with object
When you see an type error, use `type` to check the object type.

## Classes for BlackJack

Card - rand and suit

Hand - collection of cards
method: hit, score

Deck - collection of cards
method: shuffle, deal

## Tile Images

canvas.draw_image(tiled_image, ...)
Use dropbox, Add dl=1 at the end of address.
Always test on a different computer, because image will be cached.

## Visualizing object
## Programming tips

# Lecture 07

## Acceleration and friction

```python
self.angle      # ship orientation
self.angle_vec  # ship's angular speed
```

Position - point
velocity - vector
acceleration - vector

```python
position += velocity
velocity += acceleration
```

```python
self.pos[0] += self.vel[0]
self.pos[1] += self.vel[1]
forward = [math.cos(self.angle), math.sin(self.angle)]
if self.thrust:
  self.vel[0] += forward[0]
  self.vel[1] += forward[1]
```

With friction

```python
self.pos[0] += self.vel[0]
self.pos[1] += self.vel[1]
self.vel[0] *= 1-c
self.vel[1] *= 1-c
forward = [math.cos(self.angle), math.sin(self.angle)]
if self.thrust:
  self.vel[0] += forward[0]
  self.vel[1] += forward[1]
```

## space class demo
[space class demo](www.codeskulptor.org/#examples-spaceship.py)

## Load sound
[play sound demo](www.codeskulptor.org/#examples-sound.py)
```python
simplegui.load_sound
```

## Sprite class

Set color transparancy
[demo](http://www.codeskulptor.org/#examples-sprite_example.py)
```python
rgba(255, 0, 0, 0.5)
```

Basically idea is first to draw the image and update it, and next time it will
draw the updated image.

```python
def draw(canvas):
  a_rock.draw()
  a_rock.updates()
```

## Programming tips

code reuse, use dictionary, avoid magic constants.
