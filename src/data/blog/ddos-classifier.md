---
title: "DDoS Attack Classifier – ML-Based Network Traffic Analysis"
description: "A machine learning project for classifying DDoS attack traffic, comparing Logistic Regression, Autoencoders, and DBSCAN on the Kaggle DDoS dataset — with production-ready sklearn-compatible preprocessing pipelines."
pubDatetime: 2025-04-07
tags: ["Machine Learning", "Cybersecurity", "PyTorch", "scikit-learn", "Python"]
featured: false
githubURL: "https://github.com/rtweera/ddos-classifier"
---

DDoS attacks are easy to describe and surprisingly hard to detect reliably at scale. The challenge isn't just accuracy — it's building a preprocessing pipeline that handles the messy realities of real network flow data (IP addresses as features, mixed types, class imbalance) in a way that can actually be deployed rather than just run in a notebook.

## The problem

Raw network flow data has features that standard ML pipelines don't handle well out of the box — IP addresses that need to be split into octets to be numerically meaningful, high-cardinality categoricals, features with wildly different scales, and a heavily imbalanced class distribution between attack and benign traffic.

Rather than preprocessing inline in a notebook, I built a proper sklearn-compatible pipeline with modular transformers: `FeatureDropper` (removes irrelevant fields like Flow ID and Timestamp), `CompositeSplitter` (breaks IP addresses into four numeric octets), `NumericalStandardiser`, `CategoryEncoder`, and `FeatureImputer`. Each is a standalone transformer that can be composed, tested, and reused independently.

## Models explored

The project compares three approaches, each suited to a different assumption about the problem:

**Logistic Regression** — fast baseline for binary classification. Useful for establishing a performance floor and understanding which features drive the decision.

**Autoencoder** — trained on benign traffic to learn a compressed representation, then used for anomaly detection by measuring reconstruction error on attack traffic. Interesting because it doesn't require labeled attack examples during training.

**DBSCAN** — unsupervised clustering approach. Useful for exploring whether attack traffic naturally clusters separately from benign traffic in feature space, without any labels.

## Stack

- Python · scikit-learn · PyTorch · pandas · numpy · matplotlib / seaborn · Poetry

## Dataset

Kaggle DDoS Datasets — binary classification between benign and attack network flows, with features derived from packet-level statistics.

## Reflection

The most useful thing this project produced wasn't any particular model — it was the preprocessing pipeline. The modular transformer design meant I could swap models freely without touching the data handling code, which is exactly how production ML pipelines should work. It also meant the pipeline could be serialized and loaded alongside the model for inference, rather than re-running preprocessing manually.
