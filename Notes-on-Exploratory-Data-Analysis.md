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
