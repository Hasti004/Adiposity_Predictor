# === APACS (ANN + LR + GB -> LR meta) — tiny sweep to beat 97.16 ===
import time, warnings
warnings.filterwarnings("ignore")

import numpy as np, pandas as pd
from collections import Counter

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder, PolynomialFeatures
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.feature_selection import SelectPercentile, mutual_info_classif
from sklearn.base import BaseEstimator, TransformerMixin

from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import GradientBoostingClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression

from imblearn.over_sampling import SMOTE
try:
    from imblearn.over_sampling import BorderlineSMOTE 
    HAS_BSMOTE = True
except Exception:
    HAS_BSMOTE = False
from imblearn.pipeline import Pipeline as ImbPipeline

RANDOM_STATE = 42
np.random.seed(RANDOM_STATE)


print("[LOG] Loading CSV…")
df = pd.read_csv("ObesityDataSet_raw_and_data_sinthetic.csv")


df["BMI"] = df["Weight"] / (df["Height"] ** 2)
df["high_caloric"] = (df["FAVC"] == "yes") & (df["FCVC"] > 2)
df["active_lifestyle"] = (df["FAF"] > 2) & (df["TUE"] < 2)

X = df.drop("NObeyesdad", axis=1)
y = df["NObeyesdad"]
print(f"[LOG] Data: {X.shape[0]} rows, {X.shape[1]} features; classes: {Counter(y)}")

num_cols = X.select_dtypes(include=["number"]).columns.tolist()
cat_cols = X.select_dtypes(exclude=["number"]).columns.tolist()
print(f"[LOG] Numeric={len(num_cols)} | Categorical={len(cat_cols)}")



num_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("poly", PolynomialFeatures(degree=2, include_bias=False)),
    ("scaler", StandardScaler()),
])

try:
    ohe = OneHotEncoder(handle_unknown="ignore", sparse_output=False)  
except TypeError:
    ohe = OneHotEncoder(handle_unknown="ignore", sparse=False)       

cat_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", ohe),
])

preprocessor = ColumnTransformer(
    transformers=[("num", num_pipe, num_cols), ("cat", cat_pipe, cat_cols)],
    remainder="drop",
    sparse_threshold=0.0
)


def make_pipeline(
    ann_size=(320,160),
    ann_alpha=5e-4,
    gb_estimators=1000,
    gb_lr=0.05,
    use_selector=True,
    selector_pct=98,
    smote_k=3,
    use_borderline=False,
    cv_stack=5
):
    ann = MLPClassifier(
        hidden_layer_sizes=ann_size,
        activation="relu",
        solver="adam",
        learning_rate_init=1e-3,
        alpha=ann_alpha,
        early_stopping=True,
        n_iter_no_change=20,
        max_iter=1200,
        random_state=RANDOM_STATE
    )
    lr_base = LogisticRegression(max_iter=5000, C=2.0, multi_class="auto", random_state=RANDOM_STATE)
    gb = GradientBoostingClassifier(
        n_estimators=gb_estimators,
        learning_rate=gb_lr,
        max_depth=3,
        subsample=0.9,
        random_state=RANDOM_STATE
    )
    meta = LogisticRegression(max_iter=6000, C=3.0, multi_class="auto", random_state=RANDOM_STATE)

    stack = StackingClassifier(
        estimators=[("ann", ann), ("lr", lr_base), ("gb", gb)],
        final_estimator=meta,
        passthrough=True,
        cv=cv_stack,
        n_jobs=-1
    )

    steps = [("prep", preprocessor)]
    if use_selector:
        steps += [("select", SelectPercentile(mutual_info_classif, percentile=selector_pct))]
    smoter = (BorderlineSMOTE(k_neighbors=smote_k, random_state=RANDOM_STATE)
              if (use_borderline and HAS_BSMOTE) else SMOTE(k_neighbors=smote_k, random_state=RANDOM_STATE))
    steps += [("smote", smoter), ("stack", stack)]
    return ImbPipeline(steps, verbose=False)

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.15, stratify=y, random_state=RANDOM_STATE
)
print(f"[LOG] Train={len(y_tr)} | Test={len(y_te)}")

candidates = [
   
    dict(use_selector=True,  selector_pct=98, smote_k=3, ann_size=(320,160), ann_alpha=5e-4, gb_estimators=1000, gb_lr=0.05),

  
    dict(use_selector=False, smote_k=3, ann_size=(320,160), ann_alpha=5e-4, gb_estimators=1000, gb_lr=0.05),

    dict(use_selector=True,  selector_pct=98, smote_k=3, ann_size=(256,128), ann_alpha=5e-4, gb_estimators=1000, gb_lr=0.05),


    dict(use_selector=True,  selector_pct=98, smote_k=3, ann_size=(320,160), ann_alpha=5e-4, gb_estimators=1200, gb_lr=0.045),

    dict(use_selector=True,  selector_pct=98, smote_k=5, ann_size=(320,160), ann_alpha=5e-4, gb_estimators=1000, gb_lr=0.05),

    dict(use_selector=False, smote_k=5, ann_size=(320,160), ann_alpha=5e-4, gb_estimators=1000, gb_lr=0.05),
]

if HAS_BSMOTE:
    candidates += [
        dict(use_selector=True,  selector_pct=98, smote_k=3, ann_size=(320,160), ann_alpha=5e-4, gb_estimators=1000, gb_lr=0.05, use_borderline=True),
        dict(use_selector=False, smote_k=3, ann_size=(320,160), ann_alpha=5e-4, gb_estimators=1000, gb_lr=0.05, use_borderline=True),
    ]

cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=RANDOM_STATE)
results = []

print("\n[LOG] === Sweeping compact config set ===")
for i, cfg in enumerate(candidates, 1):
    t0 = time.time()
    pipe = make_pipeline(**cfg, cv_stack=3)
    scores = cross_val_score(pipe, X_tr, y_tr, cv=cv, scoring="accuracy", n_jobs=-1)
    dt = time.time() - t0
    mean, std = scores.mean(), scores.std()
    print(f"[{i:02d}] {cfg} -> CV Acc: {mean:.4f} ± {std:.4f} (time {dt:.1f}s)")
    results.append((mean, std, dt, cfg))

results.sort(key=lambda x: x[0], reverse=True)
best_mean, best_std, best_time, best_cfg = results[0]
print(f"\n[LOG] Best CV: {best_mean:.4f} ± {best_std:.4f} with cfg={best_cfg}")

best_pipe = make_pipeline(**best_cfg, cv_stack=5) 
t0 = time.time()
best_pipe.fit(X_tr, y_tr)
print(f"[LOG] Fit(best) time: {time.time()-t0:.1f}s")

y_pred = best_pipe.predict(X_te)
acc = accuracy_score(y_te, y_pred)
print(f"\n>>> HOLD-OUT Accuracy: {acc:.4f}")
print("\nClassification Report:")
print(classification_report(y_te, y_pred, digits=4))
print("Confusion Matrix:")
print(confusion_matrix(y_te, y_pred))
