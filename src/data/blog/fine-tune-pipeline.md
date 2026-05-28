---
title: "Fine-Tune Pipeline – CI/CD-Ready LLM Fine-Tuning Framework"
description: "A team-built, production-oriented fine-tuning framework covering LoRA training, inference, and evaluation for Qwen, Llama, and Mistral models — designed to run inside GitHub Actions or Jenkins with full W&B experiment tracking."
pubDatetime: 2025-06-25
tags: ["LLM", "Fine-Tuning", "LoRA", "Unsloth", "MLOps", "CI/CD", "Python", "Hugging Face"]
featured: true
githubURL: "https://github.com/Fine-Tuning-Team/Fine-Tune-Pipeline"
liveURL: "https://fine-tuning-team.github.io/Fine-Tune-Pipeline/"
---

Fine-tuning a language model is not that hard. Making fine-tuning *repeatable, auditable, and automatable* is significantly harder — and that's the gap this project was built to close.

Most fine-tuning code I've seen is a Jupyter notebook or a loose collection of scripts that works once, on one machine, for one dataset. If someone else tries to reproduce the result three months later, they're guessing at hyperparameters, package versions, and which checkpoint was actually the good one. This project was built to fix that.

## What it is

A framework with three main components — fine-tuner, inferencer, and evaluator — all driven by a single TOML configuration file. To run a full training experiment, you edit `config.toml`, run one command, and the pipeline handles everything: loading the dataset from Hugging Face, applying LoRA adapters, training, evaluating, and pushing the final model to the Hub. W&B receives all metrics automatically.

The same pipeline runs locally, in GitHub Actions, or in Jenkins — no code changes needed, just different environment variables for secrets.

## The design choices

**TOML over YAML or argparse** — TOML is more readable than YAML for deeply nested configs, and it catches type errors that argparse doesn't. When you're changing 15 hyperparameters between runs, readable config is not a minor concern.

**Unsloth for training** — 4-bit quantization with LoRA via Unsloth gives roughly 5–50× speedup over standard Hugging Face training on the same hardware, with no meaningful quality loss. For experimentation on limited GPU resources, this matters a lot.

**Separate inferencer and evaluator** — keeping these as distinct scripts rather than bolting them onto the training script makes it easy to evaluate a model you didn't train yourself, or to re-evaluate a checkpoint with different evaluation logic. Clean separation of concerns that pays off when you're iterating fast.

**W&B as first-class citizen** — not an optional add-on. Every run logs hyperparameters, training curves, and evaluation metrics. Looking back at what actually worked three months ago should not require re-reading old notebooks.

## My contributions

I worked on the fine-tuner core, the TOML configuration system, and parts of the evaluation pipeline. I also contributed to the documentation site, which was built with MkDocs and covers installation, configuration reference, and CI/CD integration guides.

## Supported models

Qwen 2.5 (0.5B / 3B / 7B), Llama 3, Mistral — and in principle anything compatible with Unsloth.

## Stack

- Python · Unsloth · Hugging Face Transformers · TRL (SFTTrainer) · PEFT / LoRA · Weights & Biases · MLflow · Docker · GitHub Actions · MkDocs · UV

## Reflection

Working on this project changed how I think about the relationship between research and engineering in ML. A lot of fine-tuning work never gets reproduced or built on because the infrastructure around the experiment is too fragile. The model weights end up in someone's `~/checkpoints` folder and the knowledge dies with the run.

Making the pipeline reusable and CI/CD-integrated felt like a small thing while we were doing it. In retrospect it was probably the most impactful design decision we made — it forced us to think about every assumption that was previously implicit, and it meant every team member could run experiments independently without asking "which script do I use and what arguments does it take?"
