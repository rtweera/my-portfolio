---
title: "Clickbait Detection – Supervised and Unsupervised NLP Approaches"
description: "An NLP project exploring clickbait headline detection using a CNN-based supervised model and an in-progress unsupervised approach with transformer embeddings."
pubDatetime: 2024-08-20
tags: ["NLP", "Deep Learning", "TensorFlow", "Transformers", "Python"]
featured: false
githubURL: "https://github.com/rtweera/clickbait-detection"
---

Clickbait detection is a well-studied NLP problem with a practical application — improving content quality ranking in news aggregators and social feeds. What makes it interesting as a learning project is that it sits right at the boundary between what supervised and unsupervised approaches can handle, which made it a useful exercise in understanding their respective strengths.

## Supervised approach

The supervised model is a CNN trained on labeled headline data. Text is tokenized, embedded, then passed through convolutional filters that capture local n-gram patterns — which turns out to be effective for short-form classification tasks like headlines where specific phrases ("You won't believe...", "This changes everything") are strong signals.

Training used the standard JSONL split format (`train.jsonl`, `validation.jsonl`), with preprocessing handled in the notebook before training.

## Unsupervised approach

The unsupervised direction is more exploratory. The idea: transformer embeddings (via Hugging Face) project headlines into a semantic space, and clickbait headlines — which share rhetorical patterns even without being lexically similar — might cluster separately from genuine news headlines.

This approach is still in progress. The preprocessing and split generation utilities are in place; the clustering and evaluation methodology needs more work.

## Stack

- Python · TensorFlow (supervised) · PyTorch · Hugging Face Transformers · NLTK · scikit-learn · Jupyter Notebooks

## Reflection

The supervised model works well and is the main deliverable. The unsupervised direction is interesting because it doesn't assume you have labeled data — which is the realistic scenario for a new content domain. Whether transformer embeddings actually separate clickbait from non-clickbait without labels is still an open question for this project.
