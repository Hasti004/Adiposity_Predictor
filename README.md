# obesity-predictor
This project presents a comprehensive machine learning pipeline designed for predicting obesity levels based on lifestyle, demographic, and biometric data. Built with reproducibility in mind, this pipeline leverages advanced stacking ensemble techniques to combine the power of multiple machine learning models for enhanced prediction accuracy. The approach is derived from, and extends, the methodology presented in our peer-reviewed paper:

>Vakani, H., Hardik Jayswal, et al. (2025). Obesity Level Prediction Using Machine Learning Stacking Ensembles.
>The model demonstrates a remarkable accuracy of 96.7%, validated on a unique blended dataset incorporating both CDC and Colombia-Mexico-Peru data, ensuring robustness and generalizability across diverse populations. This work sets a foundation for further exploration and improvement in the field of health data science, providing a powerful tool for predictive health modeling.


---

## ✨ Key features
| Module | What it does |
|--------|--------------|
| **/notebooks** | End-to-end Jupyter workflow: EDA → preprocessing → model training & evaluation |
| **/src/data** | Cleaners, transformers, one-hot encoders, SMOTE balancing |
| **/src/models** | • Stacking ensemble (RF + GBM + SVM + LogReg) <br>• RNN baseline for sequential data <br>• Optuna hyper-parameter search |
| **predict.py** | CLI entry point – load a CSV or single JSON row and return predicted obesity class |
| **/reports** | Automatically generated confusion matrices, ROC curves, and SHAP plots |

---

## 🗂️ Project structure
obesity-predictor/
├── data/ # raw & interim datasets (git-ignored)
├── notebooks/ # Jupyter notebooks (EDA, training, …)
├── src/
│ ├── data/ # data loading / cleaning / feature builders
│ ├── models/ # model classes, training, evaluation
│ └── utils/ # common helpers
├── models/ # saved .pkl / .h5 weights (git-ignored; use DVC or Git-LFS)
├── requirements.txt
└── predict.py

yaml
Copy
Edit

---

## 📦 Installation
```bash
# 1) clone the repo
git clone https://github.com/hasti0044/obesity-predictor.git
cd obesity-predictor

# 2) create a virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 3) install dependencies
pip install -r requirements.txt
🚀 Quick start
bash
Copy
Edit
# train the stacking model with default settings
python -m src.models.train --config configs/stack_default.yml

# run inference on new data
python predict.py --input samples/demo_row.json
For a step-by-step walkthrough, open notebooks/01_full_pipeline.ipynb and run each cell.
```

📊 Results
| Model               | Accuracy | Macro-F1 | Notes                                        |
|---------------------|----------|----------|----------------------------------------------|
| **Stacking Ensemble** | 0.967    | 0.964    | 10-fold CV, class-weighted, Optuna-tuned     |
| **Random Forest**    | 0.943    | 0.939    | 300 trees                                   |
| **Gradient Boosting**| 0.951    | 0.948    | learning_rate = 0.05                        |
| **SVM (RBF)**        | 0.904    | 0.900    | y = 0.01, C = 10                            |
| **RNN (LSTM)**       | 0.912    | 0.907    | 3 × 64-unit layers                          |


Detailed metrics, ROC curves, and SHAP importance plots are in reports/.

📚 Dataset
Primary: CDC Adult & Youth Health Surveys (840 rows × 16 cols)

Synthetic augmentation: 5 000 rows generated with CTGAN to reduce class imbalance

License: Public Domain / CC-0
See data/README.md for acquisition scripts and preprocessing steps.

⚙️ Configuration
All hyper-parameters are YAML-driven.
Edit any file in configs/ or override on the CLI, e.g.:

📝 Citation

Once the paper is published, we will update the citation here. Thank you for your understanding!

If you use this code or dataset, please cite:

```bibtex
@inproceedings{Vakani2025Obesity,
  title   = {Obesity Level Prediction Using Machine Learning Stacking Ensembles},
  author  = {Hasti Vakani, Mithil Mistry, Hardik Jayswal, et al.},
  booktitle = {Proceedings of the 10th International Conference on Information Technology and Computer Science (ICTCS 2025)},
  year    = {2025},
  pages   = {Will be updated after publication},  # Add the specific page range once available
  publisher = {10th International Conference on Information Technology and Computer Science (ICTCS 2025)},  # Replace with actual publisher name

}
```
🤝 Contributing
Pull requests are welcome!

Fork the repo & create a feature branch

black / ruff lint before committing

Open a PR and fill out the template

📄 License
This project is licensed under the MIT License – see LICENSE for details.

🙋‍♀️ Contact
Hasti Vakani – hasti.vakani9104@gmail.com

Enjoy exploring, reproducing, or extending the obesity-predictor! 🎉
