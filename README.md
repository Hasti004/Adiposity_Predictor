Introduction

Conventional single-model approaches to adiposity classification often struggle with class imbalance and non-linear interactions across lifestyle variables. APACS (Adiposity Prediction via ANN-plus Ansamble Classifiers Stack) addresses these gaps with a stacking ensemble that blends Artificial Neural Networks (ANN), Logistic Regression (LR), and Gradient Boosting (GB). The pipeline adds dense one-hot encoding, PolynomialFeatures (degree = 2), standardization, optional mutual-information feature selection, and SMOTE class balancing. It’s Colab-friendly and includes detailed logs so you can see exactly what runs and how long each step takes.

Key Features

• Hybrid Stacking (APACS): Base learners = ANN, LR, GB → LR meta-learner with passthrough=True.
• Robust Preprocessing: Dense One-Hot for categoricals; Poly(2) + StandardScaler for numerics.
• Class Balancing: SMOTE after (optional) selection; recommended k=3 or k=5 for the 7-class target.
• Optional Selector: SelectPercentile (mutual_info) at 90–98% (can be disabled when Poly(2) is enabled).
• Observability: Step-wise logs (shapes, class balance), per-estimator timings, optional memory usage.
• Colab-Ready: Minimal deps; top-level knobs for quick speed/accuracy trade-offs.

Installation

Clone the repository

git clone https://github.com/hasti0044/adiposity-predictor.git
cd adiposity-predictor


Create a virtual environment (recommended)

python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate


Install dependencies

pip install -r requirements.txt


Minimal requirements

numpy
pandas
scikit-learn
imbalanced-learn
psutil   # optional, for memory logs

Usage

Place the dataset at data/ObesityDataSet_raw_and_data_sinthetic.csv.

(Optional) Adjust knobs at the top of apacs_stack.py:

FAST_MODE = False → set True for faster, slightly lower-accuracy runs

USE_SELECTOR = True → set False to remove feature selection (often best when Poly(2) is on)

SMOTE: k_neighbors = 3 or 5

ANN: hidden_layer_sizes = (320, 160), alpha = 5e-4

GB: n_estimators = 1000, learning_rate = 0.05

Train & evaluate

python apacs_stack.py


The script prints: dataset stats, stage-by-stage shapes, class balance, per-model timings, hold-out accuracy, and (optionally) 3-fold CV results.

(Optional) Tiny sweep
The script can run a compact set of high-impact configs (selector on/off, SMOTE k, ANN size, GB trees/LR) → reports 3-fold CV on the training split, then refits the best and prints the hold-out score.

Dataset

Primary: UCI Obesity Levels — ObesityDataSet_raw_and_data_sinthetic.csv
Target classes (7):
Insufficient_Weight, Normal_Weight, Overweight_Level_I, Overweight_Level_II, Obesity_Type_I, Obesity_Type_II, Obesity_Type_III

Default split (Stratified, 85/15, seed=42):

Dataset	Classes	Train Samples	Test Samples
UCI Obesity Levels	7	1,794	317

Feature engineering (built by the script):
• BMI = Weight / Height²
• high_caloric = (FAVC == "yes") & (FCVC > 2)
• active_lifestyle = (FAF > 2) & (TUE < 2)

Model Architecture

Workflow

Data Preprocessing
o Numerics: impute (median) → PolynomialFeatures(2) → StandardScaler
o Categoricals: impute (most frequent) → One-Hot (dense)
o Optional: SelectPercentile (mutual_info) (e.g., 90–98%)

Class Balancing
o SMOTE (k=3 or 5) applied after feature selection

Hybrid Stacking (APACS)
o Base learners: MLPClassifier (ANN), LogisticRegression, GradientBoostingClassifier
o Meta-learner: LogisticRegression with passthrough=True
o Inner CV: cv=3–5 inside the stack to create robust meta-features

Logging
o Stage logs: After PREP/ENCODE, After SELECT, After SMOTE (shapes + class balance)
o Per-estimator timings (fit/predict), optional RAM via psutil

Results

• 3-fold CV (training split): up to 98.16% ± 0.24 with
use_selector = False, SMOTE(k=5), ANN(320,160, α=5e-4), GB(1000, lr=0.05)
• Hold-out (15% test split): typically ≥ 97.16%, depending on split/seed

Report the hold-out accuracy as your final result; CV is used for model selection.

Future Improvements

• Probability calibration (Platt/Isotonic) for better thresholds
• Compare BorderlineSMOTE/SMOTE-NC variants
• Add extra base learners (e.g., XGBoost/LightGBM) with the same LR meta
• Explainability: SHAP or permutation importance
• Package a small CLI/REST for batch inference

Contributing

Pull requests are welcome!
• Keep runs reproducible (random_state set)
• Include a brief report (accuracy, macro-F1, confusion matrix)
• Lint before committing

License

MIT License — see LICENSE.

Acknowledgments

• UCI Obesity Levels dataset authors
• scikit-learn & imbalanced-learn communities

Contact

Hasti Vakani — hasti.vakani9104@gmail.com
(Feel free to open issues/PRs in this repo as well.)
