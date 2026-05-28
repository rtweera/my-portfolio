---
title: "Type II Diabetes Risk Prediction – Published Research"
description: "A multiclass ML system predicting Type II diabetes risk from NHANES lab and lifestyle data, published in IEEE. Built a full pipeline with LightGBM, Optuna, MLflow, and feature ablation studies."
pubDatetime: 2026-02-01
tags: ["Machine Learning", "Healthcare AI", "LightGBM", "MLflow", "Research", "Python"]
featured: true
githubURL: "https://github.com/Diabetic-Research-Group/diabetes-prediction"
liveURL: "https://ieeexplore.ieee.org/document/11499955"
---

This is the project I'm most proud of from a research standpoint — a collaboration that resulted in a peer-reviewed publication in IEEE, studying whether we could meaningfully predict Type II diabetes risk using a combination of laboratory markers and lifestyle factors from the NHANES dataset.

## The research question

Most diabetes prediction models focus narrowly on either lab values or lifestyle factors. We wanted to know whether combining both actually improves prediction — and by how much. That meant building a rigorous ML pipeline and running systematic feature-group comparisons, not just training a single model and reporting accuracy.

## The pipeline

The dataset came from NHANES, hosted on Hugging Face (`rtweera/nhanes-data-converted`). The classification task was three-class: Not Diabetic, Type 2 Diabetes, and Other — which introduced class imbalance that needed careful handling.

The training design was deliberate: we built a class-balanced training set while preserving the natural distribution in the held-out test set, which matters enormously for evaluating real-world performance on an imbalanced problem. SMOTE was applied within training folds only, not to the test set.

For hyperparameter search, we ran 20 Optuna trials, each evaluated with 10-fold stratified cross-validation — so every reported number comes from a proper CV loop, not a single train-test split. LightGBM was the model family of choice for its speed and strong tabular performance.

On top of tuning, we ran two additional studies:

- **Feature group comparison**: labs-only vs. lifestyle-only vs. combined, to answer the core research question
- **Feature importance ablation**: iteratively removing low-importance features to find the minimal sufficient feature set

Everything — metrics, confusion matrices, classification reports, trained models — was tracked in MLflow with nested run structure, making the experiments fully reproducible.

## Stack

- Python · LightGBM · Optuna · MLflow · scikit-learn · imbalanced-learn · SHAP · Poetry
- Data: NHANES via Hugging Face Datasets

## What we found

The combined lab + lifestyle model outperformed either alone, confirming the hypothesis. The ablation study also revealed that a surprisingly small subset of features drove most of the predictive power — useful for thinking about what data actually needs to be collected in a clinical screening context.

## Reflection

Working on a healthcare prediction problem forces a level of methodological care that general ML work doesn't always demand. You can't paper over class imbalance, you can't treat temporal structure as random, and your evaluation metrics matter a lot more than accuracy alone. Building this pipeline made me much more careful about the gap between "model works on my machine" and "model works in the real world."

Having the work go through peer review and land in IEEE was a meaningful milestone — it meant the methodology held up to scrutiny beyond our team.

**Publication:** *Type II Diabetes Risk Prediction: A Multifactor Approach Using Laboratory and Lifestyle Features* — IEEE, 2025.
