---
title: "Ballerina Code Completion – SLM Fine-Tuning"
description: "Research and experimentation on fine-tuning Small Language Models for Ballerina code completion — a low-resource domain-specific language for cloud-native integration with limited training data available."
pubDatetime: 2025-04-02
tags: ["Fine-Tuning", "Code Generation", "LLM", "LoRA", "Ballerina", "Python", "Jupyter"]
featured: false
githubURL: "https://github.com/rtweera/code-ft"
---

Ballerina is a domain-specific programming language for cloud-native integration, developed by WSO2. It has a distinctive syntax and semantic model — and almost no representation in the training data of general-purpose code models. GitHub Copilot doesn't know it well. Most code LLMs don't either.

This project explored whether fine-tuning a small language model on Ballerina-specific data could produce a meaningfully better code completion model than the general-purpose baseline — and what that process actually looks like end to end.

## The challenge

Low-resource code completion is harder than it might appear. The problem isn't just data scarcity — it's that the model needs to learn language-specific idioms, standard library patterns, and syntactic conventions that general pre-training didn't cover. Fine-tuning on a small corpus risks overfitting to surface patterns without generalizing to novel code.

The experiments covered: data collection and preprocessing from available Ballerina repositories and documentation, training pipeline design using LoRA for parameter-efficient adaptation, evaluation of generation quality, and comparison against the base model.

## Structure

The repository is organized as a research workspace — notebooks for exploration and experimentation, archived approaches as the methodology evolved, a `training` directory for fine-tuning scripts, and `data-processing` for corpus preparation. The `concepts-examples` folder documents the underlying neural network and fine-tuning concepts studied alongside the implementation.

## Stack

- Python · Jupyter Notebooks · PyTorch · Hugging Face Transformers · PEFT / LoRA

## Reflection

Working on a genuinely low-resource language forced a different mindset than fine-tuning on a well-represented language like Python. Every data preprocessing decision matters more. Evaluation is harder because there's no established benchmark to compare against. And the gap between "the model generates syntactically valid Ballerina" and "the model generates idiomatic, useful Ballerina" is wide enough to require careful qualitative evaluation alongside the quantitative metrics.

The work here fed into broader thinking about domain-adapted code models and what the minimum viable data requirement is to produce meaningful improvement.
