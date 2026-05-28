---
title: "Room Occupancy Detection – Time-Series-Aware ML from Sensor Data"
description: "A machine learning project predicting room occupancy from environmental sensors — with careful time-series cross-validation, SMOTE for class imbalance, model comparison across Random Forest, XGBoost, and LightGBM, and SHAP-based interpretability."
pubDatetime: 2024-07-18
tags: ["Machine Learning", "Time Series", "LightGBM", "XGBoost", "SHAP", "Python"]
featured: false
githubURL: "https://github.com/rtweera/room-occupancy-detection"
---

Predicting room occupancy from temperature, humidity, CO₂, light, and humidity ratio sounds straightforward. The dataset is small, the features are few, and the models converge quickly. The interesting part is doing it correctly — and "correctly" here means respecting the time-series structure of the data, which most notebooks on this dataset don't bother with.

## Why time-series handling matters

Occupancy sensor data has strong temporal autocorrelation — the room state at minute T is highly correlated with the state at minute T-1. If you randomly shuffle and split the data, you're leaking future information into training, and your validation accuracy is meaninglessly optimistic. The only honest evaluation uses time-ordered splits.

The pipeline uses `TimeSeriesSplit` throughout — no random shuffling, no stratified random splits. SMOTE for class imbalance is applied only within training folds, never touching the validation fold.

## Pipeline

The full notebook covers EDA (distributions, pair plots, correlation, outlier inspection), followed by feature engineering: datetime parsing, Box-Cox transformation on CO₂ to reduce skew, `KBinsDiscretizer` on light intensity, and cyclical time encodings for hour-of-day and day-of-week. Delta features (rate of change between readings) capture sensor dynamics.

Three model families are compared under the same `GridSearchCV + TimeSeriesSplit` setup: Random Forest, XGBoost, and LightGBM. Evaluation reports accuracy, precision/recall/F1, ROC-AUC, confusion matrix, and inference timing. SHAP plots give feature-level interpretability.

## Stack

- Python · scikit-learn · XGBoost · LightGBM · imbalanced-learn (SMOTE) · SHAP · scipy · seaborn · Jupyter

## Reflection

This project was a good exercise in the gap between "it runs and produces a number" and "the number means something." Getting the cross-validation right, handling the imbalance properly, and then explaining which features actually drive the predictions — all of that takes significantly longer than fitting the model. But it's the part that determines whether the result is trustworthy.
