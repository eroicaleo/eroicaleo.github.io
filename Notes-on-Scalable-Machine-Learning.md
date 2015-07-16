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

## MILLION SONG REGRESSION PIPELINE

* Obtain raw data
* Split data to training and validation data
* Feature extractions, representing data numerically
* Supervised learning: train the model using training data
* Evaluate the data with testing data

Raw data

* Western commercial tracks from 1984 - 2014
* 12 features, year as the labels

Feature extractions: Quadratic features

* Allow pairwise feature interactions
* Capture the covariance of initial timbre features
* Non-linear model relative to raw data

Supervised learning: least square regression

* Audio -> year
* Ridge regression

Evaluation (part 1)

* Training: train various models
* validation: evaluate various models and choose lambda, the hyper-parameter,
using grid search
* Test: evaluate model's accuracy

Grid search: exhaustive search through hyper-parameter space

* Define and discretize search space (linear or log scale)
* Evaluate points via validation error

## DISTRIBUTED MACHINE LEARNING: COMPUTATION AND STORAGE

The close form solution makes it appealing.
Computational issues associated with linear regression.

In terms of computation:
* X^T * X has O(dn^2)
* Inverse has O(d^3)

In terms of storage:
* X^T * X needs O(d^2)
* X needs O(nd)

Scenario 1: when n is large and d is small.
We can distribute the data points, i.e. each row of X to different machines.

Matrix multiplication can be done through outer products

* We distribute each data point to different workers: O(nd) storage, but can be
distributed
* Map step: Each worker computes the outer product for each data point: O(nd^2)
computation, but can be distributed, O(d^2) local storage
* Reduce step: sum over all the outer products: O(d^3) computation, O(d^2) storage

The above 3 steps can be summrized in following spark code:

```python
trainData.map(computeOuterProduct).reduce(sumAndInverse)
```

Scenario 2: when d grow large, n is also large

* 1st rule of thumb: we need computation and storage both linearly.
    * Exploit sparsity, sparse data is prevalent. It can provide orders of magnitude
    storage and computation gain.
    * Latent sparsity, PCA and low-rank approximation (unsupervised learning)
    * Or we can use different algorithms, like gradient descent O(nd) computation
    and O(d) storage per iteration.
        * map: O(nd) computation and O(d) storage
        * reduce: O(d) computation and O(d) storage
        * But we need to repeat the process several times

## GRADIENT DESCENT

Choose the step size:

* A common step size: `a_i = \frac{a}{n\sqrt{i}}`

Parallel the gradient descent

* map: (wx - y)x
* reduce: sum up

```python
for i in range(numIters):
  alpha_i = alpha / (n * np.sqrt(i+1))
  gradient = train.map(lambda lp: gradientSummand(w, lp)).sum()
  w -= alpha_i * gradient

return w
```

### Gradient descent summary

Pros:

* Easy to Parallel
* Cheap at each iteration
* Stochastic variants can make each iteration even cheaper

Cons:

* Slow convergence
* require communication across nodes.
