---
title: Notes on Scalable Machine Learning
---

# Lecture 03 Linear Regression

## LINEAR REGRESSION

* Learning a mapping from features to continuous labels given training data set
* Examples:
  * Height, Gender, Weight -> Shoe size
  * Audio features -> Song year
  * Process, memory -> power consumption
  * Historical financial -> future stock prices

### Why a linear mapping?

* Simple
* Often works well in practice
* Can introduce new features as we learn

### Evaluating predictions

Measure "closeness" between predictions and labels

* Shoe size: off one size better than 5 sizes
* Song year: off 1 year better than 20 years

Appropriate measure for loss

* Absolute loss |x - x|
* Squared loss (x - x)^2, has nice mathematic properties

### Ridge regression

* Occam's Razor: Simple models are more likely to generalize
* Intuitively, models with smaller weight are simpler
* So the ridge regression is regularized linear regression.
