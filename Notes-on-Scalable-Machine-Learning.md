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

## COMMUNICATION HIERARCHY

* Memory is about 50GB/s
* Disk is about 100M/s
* Network is about 10GB/s within the same rack, 0.3 GB/s for different racks

## DISTRIBUTED MACHINE LEARNING: COMMUNICATION PRINCIPLES

2nd rule of thumb: Perform parallel and in-memory computation
Persistent in memory reduces communication.
* Especially for iterative algorithms, e.g. gradient descent
* Scale up to powerful multi-core machine
    * No network communication
    * Expensive
* Scale out, e.g. distributed, cloud based
    * Need to deal with network
    * Commodity HW, scales to massive problems

```python
# We can cache the training set
train.cache()

for i in range(numIters):
  alpha_i = alpha / (n * np.sqrt(i+1))
  gradient = train.map(lambda lp: gradientSummand(w, lp)).sum()
  w -= alpha_i * gradient
return w
```

3rd rule of thumb: Minimize the Network Communication
First observation: We need to store and potentially communicate data, model and
intermediate objects
* Keep large objects local

Second observation: ML methods are typically iterative
* Reduce the number of interactions

Extreme: Divide and Conqure
* Fully process each partition locally, communicate the final results
* Single iteration and minimal communication
* Approximate results

```python
train.mapPartitions(localLinearRegression).reduce(combineLocal)
```

Less extreme: Mini batch

```python
for i in range(fewerIters):
  update = train.mapPartitions(doSomeLocalGradientUpdates).reduce(combineLocalUpdates)
  w += update
return w
```

We can amortize latency
* send large message
* Batch their communication
* Train multiple models

# Lecture 04 Logistic Regression and Click-through Rate Pipeline

## ONLINE ADVERTISING

$43B in 2013

### The players

* Publishers
    * Google, NY times, ESPN

* Advertisers
    * Fossil, Macy

* Matchmakers
    * Google, Yahoo, MS
    * Match publishers with advertisers in real time (when user visits a website)

### Efficient Matchmaking

* Predict probability that user will click each ad and choose ads that maximize
probability
    * Estimate conditional probability: given predictive features

* Predictive features
    * Ad's historical performance
    * advertiser and ad content info
    * Publisher info
    * User info (search/click history)

### Publishers Get Billions of Impressions Per Day

* Data is high dimensional, sparse and skewed (heavily bias)
    * Hundreds of millions of users
    * Millions of publisher pages
    * Millions of ads
    * Very few ads get clicked by users

* Problem definition
    * Given massive data to estimate the conditional probability that a user will
    click a ad given features about the user, the ad and the publisher.
