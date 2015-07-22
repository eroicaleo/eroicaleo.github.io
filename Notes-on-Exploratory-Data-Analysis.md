---
title: Notes on Exploratory Data Analysis
---

Lecture 1
=========

02 Principles of Analytic Graphics
----------------------------------

1. Always show comparison, compare evidence between 2 different hypothesis.
2. Show causality, mechanism, explanation.
3. Show multivariate data, some variables are confounding variables.
4. Integration evidence, different modes of evidence.
5. Describe and document the appropriate labels.
6. Content is King.

03 Exploratory Graphs
---------------------

Why we need graphs?

1. We want to understand the data
2. We want to find patterns
3. To suggest modeling strategies
4. To debug analysis

Characteristics of exploratory graphs

1. made quickly
2. made in large numbers
3. goal is for personal understandings

Simple Summary of data

1. Five number of summary

    ```python
    summary(pollution$pm25)
    ```

2. boxplot

    ```python
    boxplot(pollution$pm25, col = "blue")
    # We can also overlay features
    # This will draw a line y = 12
    abline(h = 12)
    ```

3. histogram

    ```python
    hist(pollution$pm25, col = "green")
    hist(pollution$pm25, col = "green", breaks = 100)
    # density plot, add a strip under the histogram indicating location of each data point
    rug(pollution$pm25)
    # This will draw a line x = 12, with width 2.
    abline(v = 12, lwd = 2)
    # This will draw a line cross the median data point.
    abline(v = median(pollution$pm25), col = "magenta", lwd = 4)
    ```

4. barplot: it is for categorical data.

    ```python
    barplot(table(pollution$region), col = "wheat", main = "Number of Counties in Each Region")
    ```

5. boxplot for 2 dimensional data

    ```python
    boxplot(pm25 ~ region, data = pollution, col = "red")
    ```

6. histogram for 2 dimensional data

    ```python
    par(mfrow = c(1, 2), mar = c(4, 4, 2, 1))
    hist(subset(pollution, region == "east")$pm25, col = "green")
    hist(subset(pollution, region == "west")$pm25, col = "green")
    ```

    mar is for margin, see the man page of par.

7. scatterplot

    ```python
    with(pollution, plot(latitude, pm25))
    with(pollution, plot(latitude, pm25, col = region))
    ```

From the above examples, we can see there is two ways to refer to
the data in a dataframe.

1. plot(y ~ x, data = pollution)
    The ~ is called formula notation.
2. with(pollution, plot(y, x))

Further resource

[R graph gallery](gallery.r-enthusiasts.com)

[R Bloggers](http://www.r-bloggers.com/)

04 Plotting system in R
-----------------------

1. base plot system
    "Artist's palette" model, add pieces one by one.
    generation, plot or like function.
    Then annotation, add labels, axis etc.

2. Lattice plot system
    plots are create at once.
    Good for condition plot, panel plot.
    Good for putting many many plots on a screen.

3. ggplot system
    It mixes the ideas of both

05 Base Plotting system
-----------------------

### The Process of Making a plot

Some questions to think about?

1. The plot will be on a paper? Screen?
2. Will the plot be used in screen? web browser? presentation?
3. Large data go into the plot?
4. Need to dynamically resize the plot?
5. Which plotting system we will use?

### Base Graphics

There are 2 steps:

1. Initializing a plot
2. Annotating the plot

plot and hist will launch a graphics device, if there is no one open.
plot has lots of arguments, letting you set title, labels.
Most of them are documented in the `par` function man pages.

3 base graph commands: `plot, hist, boxplot`.

### Important parameters:

* `pch`: plotting character (see the man page for function `points` for details)
* `lty`: line type
* `lwd`: line width
* `col`: color, can be number, string, hex format, `colors()` function gives a
vector of color by name
* `xlab`: x-axis label
* `ylab`: y-axis label

Use `par()` function to specify these parameters and also to read the current
value of them, like `par("col")`. Don't forget the double quote.

* `las`: the orientation of axis labels on the plot
* `bg`: background color
* `mar`: margin, start from the bottom and clockwise turn. The unit is line of
text.
* `oma`: the outer margin
* `mfrow`: number of plots per row and per column, filled row-wise.
* `mfcol`: number of plots per column and per row, filled column-wise.

### Base plotting functions

* `plot`: make a scatterplot, or other plot depending on the class of the
objects being plotted.
* `lines`: add lines to a plot.
* `points`: add points to a plot.
* `text`: add text labels to a plot.
* `title`: add titles.
* `mtext`: m means margin, add text to margins.
* `axis`: add axis ticks and labels.
* `legend`: add legend. If they are the line, specify `lty`. If they are
character, specify `pch`.

### Summary

Very flexible and offers high degree of control, but maybe tedious.

06 Base Plotting Demonstration
---------------------------

We can use the `examples` function to see the examples of a function like
`examples(points)`

`pch` 21 ~ 25 are similar to 1 ~ 6, but they have boundaries (with `col` parameters)
and fills (with `bg` parameters).

We could make the plot, but don't put the data in it by doing
`plot(x, y, type = "n")`

```python
g <- gl(2, 50, labels = c("Male", "Female"))
plot(x, y, type = "n")
plot(x[g == "Male"], y[g == "Male"], col = "blue")
plot(x[g == "Female"], y[g == "Female"], col = "green")
```

## 07 Graphic devices

### What is a graphic device

* A graphic device is something we can make plot apprear
    * a window, it's a screen device
    * A PDF file
    * A PNG, JPEG file
    * A SVG file (scalable vector graphic)
* When making a plot, it has to be sent to a graphic device
* To open screen device
    * `quatz()` on Mac, `X11()` on Linux, `windows()` on Windows
    * `?Device` to find all devices
* `plot`, `xyplot`, `qplot` will send plot to screen device. And there is only
one screen device for all the 3 platforms
* file devices are appropriate for paper/slide/presentation

### How does a plot get created?

* Explicitly launch a graphic device

```python
pdf(file = "myplot.pdf")
```

* Call a plot function to make a plot
* Annotate the plot
* **_Explicitly close the graphic device by calling_** `dev.off()`

### Graphic file devices

Vector formats:

* Pros: useful for line graphics, resize well, won't distort.
* Cons: not good for plot with lots of points/objects
* pdf
* svg, useful for animation and web-based plot
* windows metafile: windows only
* postscript: not use very often

Bitmap formats:

* Pros: good for plot with lots of points
* Cons: doesn't resize well
* png
* jpeg: good for natural scenes, very small, not good for line drawing
* tiff
* bmp

### Multiple open graphic devices

* can launch multiple devices
* only one is active at a time
* each one gets a integer nubmer >= 2
* find the current device by `dev.cur()`
* set active device by `dev.set(integer)`

### Copy plots

```python
dev.copy(png, file = "myfile.png")
dev.off()
# if want PDF
dev.copy2pdf
```

**Warning: the plot may not be exactly the same as seen in screen**

# Lecture 02

## Lattice plotting system

### Introduction

* Lattice contains function to produce trellis graphics, including:
    * `xyplot`
    * `bwplot`
    * `levelplot`
* It builds on `grid` package, which we seldom use directly
* Doesn't have two phases: plotting and annotation
* All plotting/annotation is done at once with a single function call

### Important functions

* `xyplot`: scatterplot
* `bwplot`: boxplot
* `histogram`: histograms
* `stripplot`: boxplot with actual points
* `dotplot`：plot dots like "violin strings"
* `splom`：scatterplot matrix; like the `paris` in base system
* `levelplot`, `contourplot`: for plotting image data

### `xyplot` function

```python
xyplot(y ~ x | f * g, data)
```

* Again, we use formula notation, left of ~ is y-axis, right of ~ is x-axis.
* f and g are called conditioning variables, which are optional
    * they are categorical variables that we condition on
    * it means we want to look at the scatterplot of y and x at every level of f
    and g
    * Don't have to use 2 categorical variables, * indicates interaction.
* data is the dataframe
    * if no dataframe passed, it will look into parent frame.

### Simple lattice plot

* Basic one

```python
library(lattice)
library(datasets)
xyplot(Ozone ~ Wind, data = airquality)
```

* Better one, pay attention how we use `transform` to change the variable in a
dataframe

```python
library(lattice)
library(datasets)
xyplot(Ozone ~ Wind, data = airquality)
airquality <- transform(airquality, Month = factor(Month))
xyplot(Ozone ~ Wind | Month, data = airquality, layout = c(5, 1))
```

### Lattice behaviour

Fundamental difference between base plot system

* Base system plot to graphic devices.
* Lattice system returns a `trellis` object.
* print methods for lattice functions do the plotting work
* It's better to keep the data and code
* On the command line, trellis objects are auto-printed.

### Lattice panel functions

* Lattice functions have **_panel functions_** which controls what happens inside each panel
* Can supply our own to customize the panel
* panel functions receive the x/y coordinates of the data points in their panel
* You cannot use the annotation function in base plotting system, you cannot
mix the two plotting systems.

```python
# Panel functions
xyplot(y ~ x | f, panel = function(x, y, ...) {
  panel.xyplot(x, y, ...)
  panel.abline(h = median(y), lty = 2)
})

xyplot(y ~ x | f, panel = function(x, y, ...) {
  panel.xyplot(x, y, ...)
  panel.lmline(x, y, col = 2)
})
```

### Summary

* Lattice functions are constructed with one single function call
* margins and spacing are handled automatically
* ideal for creating conditional plots where you examine the same kind of plot
under many different conditions
* panel functions can be specified and customized to modify what is plotted in
each of the plot panels

## ggplot2

### What is ggplot2?

* An implementation of grammar of graphics.
* Written by Hadley Wickham
* A 3rd graphics system in R
* grammar of graphics represents abstraction of graphic ideas and objects
* Think "verb", "noun", "adjective" for graphics
* Allow theory of graphics to build new graph and graphic objects
* Shorten the distance from mind to page

### Grammar of Graphics

* Statistic graph is a mapping from data to aesthetic attributes (color, shape,
size) and geometric objects (points, lines, bars). The plot may contain statistic
transformation of data and is drawn on a specific coordinate system

### The basics `qplot`

* much like the plot in base system
* must look for a dataframe, if cannot find, look in parent environment.
* Plots are made up of aesthetic and geoms
* Factors are indicating subsets of data. They should be labeled.
* `qplot` hides underneath
* `ggplot` is core function and very flexible
