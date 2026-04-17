# Classification

Logistic regression is used in classification problems. For example, an email
can be classified as belonging to one of two classes: 'spam' and 'not spam'.
Given features and labels (**x**, **Y**), where **Y** can take only discrete
values (we can also say that the target variable is categorical), we try to
learn a function f(x) to predict Y given x. Figure 5 outlines this function.

$$ \hat{y} = w_0 + w_1x_1 + w_2x_2 + \dots + w_mx_m = \mathbf{w}^T\mathbf{X} $$

where $\mathbf{X} = x_1 \text{, } \dots \text{, } x_m$ are the feature values
and $\mathbf{w} = w_0 \text{, } \dots \text{, } w_n$ can be seen as weights.

_Figure 5: Learning Function_

As in linear regression, the weights determine how the corresponding feature
affects the predicted value, thus our task is to find the appropriate values of
**w**.

In this binary classification problem, the predicted function must return binary
values (either 0 or 1). To achieve this, we apply to our function the sigmoid or
logistic function (Figure 6). The sigmoid function has the domain of all real
numbers, with a return value from 0 to 1. Unlike linear regression, using the
sigmoid function we transform the output into a probability.

$$ \text{Sigmoid function: } \sigma(x) = \frac{1}{1 + \mathbf{e}^{-x}} $$

$$ \text{Sigmoid applied to learning function: } \sigma(\hat{y}) = \sigma\left(\mathbf{w}^T\mathbf{X}\right) = \frac{1}{1 + \mathbf{e}^{-\mathbf{w}^T\mathbf{X}}} $$

$$ \text{Probability for } \mathbf{X} \text{ to belong in the positive class: } Pr\left(c_{+}\mid X\right) = \frac{1}{1 + \mathbf{e}^{-\mathbf{w}^T\mathbf{X}}} $$

$$ \text{Probability for } \mathbf{X} \text{ to belong in the negative class: } Pr\left(c_{-}\mid X\right) = 1 - Pr\left(c_{+}\mid X\right) $$

_Figure 6: Sigmoid Function_

**Cost function**: Figure 7 outlines the cost function that is used in logistic
regression (Maximum Likelihood).

$$ J(\mathbf{w}) = \frac{1}{m}\sum_{i=1}^{m}{-\left[y_i\log \hat{y} + \left(1 - y_i\right)\left(1 - \hat{y}\right)\right]} $$

_Figure 7: Cost Function in Logistic Regression_

Using this cost function, we are going to update the values of **w**, such that
the J(w) value settles at the minimum. To obtain the values of **w**, we perform
the gradient descent algorithm. Figure 8 outlines the update rule of **w** in
logistic regression.

- Initialize $w_i$
- Repeat until convergence
  $\{w_i := w_i - \alpha \cdot \frac{\partial MSE(\mathbf{w})}{\partial w_i}\}$
  Parameter $\alpha$ is called learning rate.

_Figure 8: Update Rule_

**Code:i** To perform logistic regression we again use the scikit learn module.
In the following example, we will use the Breast Cancer Wisconsin (Diagnostic)
Data Set. There are 10 attributes for every **X** including:

- radius (mean of distances from the center to points on the perimeter)
- texture (standard deviation of gray-scale values)
- perimeter
- area
- smoothness (local variation in radius lengths)

The **Y** classes are:

- WDBC-Malignant
- WDBC-Benign

Next, we split the data into training and testing sets. We train the model with
80% of the samples and test with the remaining 20%. Finally, we will evaluate
our model using precision and recall metrics. The precision is the intuitive
ability of the classifier not to label as positive a sample that is negative,
and recall is the ability of the classifier to find all the positive samples.

```py
import sklearn
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import recall_score
from sklearn.metrics import precision_score

data = load_breast_cancer()
X = data['data']
Y = data['target']

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.2, random_state=5)
clf = LogisticRegression()
clf.fit(X_train, Y_train)
Y_pred = clf.predict(X_test)

print('Recall:', recall_score(Y_test, Y_pred))
print('Precision:', precision_score(Y_test, Y_pred))
```

The disadvantage of this algorithm is that for each iteration m gradients have
to be computed leading to m training examples. If the training set is very
large, the above algorithm is going to be memory inefficient and might crash if
the training set doesn't fit in the memory. The Stochastic Gradient Descent
algorithm may be helpful in this case as it takes a sample of the training set
to calculate the weights-parameters instead of the entire sample space for each
iteration. This makes training much faster.
