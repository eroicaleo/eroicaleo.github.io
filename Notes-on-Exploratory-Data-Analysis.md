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

#### Important parameters:

* `pch`: plotting character (see the man page for function `points` for details)
* `lty`: line type
* `lwd`: line width
* `col`: color, can be number, string, hex format, `colors` function gives a
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

#### Base plotting functions

* `plot`: make a scatterplot, or other plot depending on the class of the
objects being plotted.
* `lines`: add lines to a plot.
* `points`: add points to a plot.
* `text`: add text labels to a plot.
* `title`: add titles.
* 'mtext': m means margin, add text to margins.
* `axis`: add axis ticks and labels.
