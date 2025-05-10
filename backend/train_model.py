# train_model.py

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.ensemble import StackingClassifier
import joblib

# 1. Load the data
data = pd.read_csv('ObesityDataSet_raw_and_data_sinthetic.csv')

# 2. Separate features and target
X = data.drop('NObeyesdad', axis=1)
y = data['NObeyesdad']

# 3. Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Identify numeric and categorical columns
numeric_features = X.select_dtypes(include=['int64', 'float64']).columns
categorical_features = X.select_dtypes(include=['object']).columns

# 5. Create a preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ]
)

# 6. Define base models
base_models = [
    ('rf', RandomForestClassifier(n_estimators=300, random_state=42)),
    ('gb', GradientBoostingClassifier(n_estimators=300, random_state=42)),
    ('svm', SVC(probability=True, random_state=42)),
    ('nn', MLPClassifier(hidden_layer_sizes=(100, 50), max_iter=1000, random_state=42))
]

# 7. Create a pipeline for each model
base_pipelines = [(name, Pipeline([('prep', preprocessor), (name, model)])) 
                  for name, model in base_models]

# 8. Define the stacking model
stacking_model = StackingClassifier(
    estimators=base_pipelines,
    final_estimator=LogisticRegression(),
    cv=5
)

# 9. Fit the stacking model
stacking_model.fit(X_train, y_train)

# 10. Make predictions
y_pred = stacking_model.predict(X_test)

# 11. Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Stacking Model Accuracy: {accuracy:.4f}")

# 12. Print classification report & confusion matrix
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# 13. Perform cross-validation
cv_scores = cross_val_score(stacking_model, X_train, y_train, cv=5)
print(f"\nCross-validation Scores: {cv_scores}")
print(f"Mean CV Score: {np.mean(cv_scores):.4f}")

# 14. Save the trained model as model.pkl
joblib.dump(stacking_model, 'model.pkl')
print("\nModel saved as model.pkl")
