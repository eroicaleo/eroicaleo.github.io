---
title: Notes on Reproducible Research
---

# Week2

## Markdown syntax

### Numbered list
1. ordered list
2. ordered list 2
3. ordered list 3

### Links
I spend so much time reading [R Bloggers][1] and [Simply Statistics][2]!
[1]: http://www.r-bloggers.com/ "R Bloggers"
[2]: http://simplystatistics.org/ "Simply Statistics"

### New localLinearRegression

first line
second line

first line  
second line

### Reference

[The official markdown documentation][1]
[1]: http://daringfireball.net/projects/markdown/syntax
[Github's Markdown Guide][2]
[2]: https://help.github.com/articles/github-flavored-markdown

## R Markdown

`knitr` to convert R markdown to markdown, `markdown` to convert markdown to
HTML

The course slides are converted by `slidify` package

## knitr package

Complex/script way to use knitr
```{r}
library(knitr)
setwd(<working dir>)
knit2html("doc.Rmd")
browseURL("doc.html")
```

Code chunk can have names
```
```{r firstchunk}
## R code goes here
```

If we have some plots, the figure in the generated HTML is base64 encoded.
We can easily pass the HTML to others.

If we want to convert table to HTML table, we can use the `xtable` package.

### Global options

```
```{r setoptions, echo=FALSE}
opt_chunk$set(echo = FALSE, results = "hide")
```

`results = "hide"` or `asis`, which means it original format and not compiled into HTML.

`echo = TRUE` or `FALSE`

`figure.height = 4.0`

`figure.width  = 4.0`

## Week3

DOs:
Start with something interesting to you, something good science, garbage in garbage out.

Donts:
Do things by hand.
