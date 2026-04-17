# Linear Regression

In linear regression, given features and labels (X, Y), where Y is real-valued,
we try to learn a function f(x) to predict Y given x. Figure 2 outlines this
function:

$$ \hat{y} = w_0 + w_1x_1 + w_2x_2 + \dots + w_mx_m = \mathbf{w}^T\mathbf{X} $$

_Figure 2: Learning Function_

where $\mathbf{X} = x_1\text{, } \dots \text{, } x_m$ are the feature values and
$\mathbf{w} = w_0 \text{, } \dots \text{, } w_n$ can be seen as weights.

The weights determine how the corresponding feature affects the predicted value.
Thus, our task is to find the appropriate values of **w**.

**Cost function:** The cost function helps us to figure out the best possible
values for **w**. For the cost function, we use the Mean Squared Error (MSE),
Figure 3.

$$ MSE(\mathbf{w}) = \frac{1}{m}\sum_{i=1}^{m}{\left(\hat{y_i} - y_i\right)^2} $$

_Figure 3: MSE_

Using this MSE function we are going to update the values of w, such that the
MSE value settles at the minimum. The method of updating w to minimize the cost
function (MSE) is called gradient descent. We initialize the values of w and
then update these values iteratively to minimize the cost. Sometimes the cost
function can be a non-convex function where you can settle at a local minimum,
but for linear regression, it is always a convex function. To update w, we take
gradients from the cost function. To find these gradients, we take partial
derivatives with respect to w. Figure 4 outlines this 'update rule'.

- Initialize $w_i$
- Repeat until convergence
  $\{w_i := w_i - \alpha \times \frac{\partial MSE(\mathbf{w})}{\partial w_i}\}$
  Parameter $\alpha$ is called learning rate.

_Figure 4: Update Rule_

Code: In order to perform linear regression, we are going to use a Python module
called scikit learn. In the following example, we will use the California
Housing Data Set. The data set contains information about the housing values in
the suburbs of Boston.

There are 14 attributes for each **X**. Examples of these attributes include:

- MedInc per capita crime rate by town
- HouseAge Average age of a house in years
- AveRooms Average Rooms in a home
- Population City population

The target value **Y** is:

- MedHouseVal - Median value of owner-occupied homes in $1000's

Next, we split the data into training and testing sets. We train the model with
80% of the samples and test with the remaining 20%. Finally, we will evaluate
our model using MSE.

```py
import sklearn
from sklearn.linear_model import LinearRegression
from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split
from sklearn.datasets import fetch_california_housing

housing = fetch_california_housing()
X = housing ['data']
Y = housing ['target']

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.2, random_state=5)

lr = LinearRegression()
lr.fit(X_train, Y_train)
Y_pred = lr.predict(X_test)

mse = sklearn.metrics.mean_squared_error(Y_test, Y_pred)

print('Mean squared error for test set:', mse)
```
