---
title: "English → Sinhala Machine Translation – Three-Stage NLP Pipeline"
description: "A multi-technique machine translation pipeline for English to Sinhala — combining statistical spelling correction, LLM-based text simplification, and quantized MBART neural translation, with a Gradio interface and a Gemini-powered corpus generator."
pubDatetime: 2025-10-15
tags: ["NLP", "Machine Translation", "MBART", "Sinhala", "LLM", "Gradio", "Python"]
featured: false
githubURL: "https://github.com/rtweera/NLP-machine-translation"
---

Sinhala is a genuinely low-resource language for NLP. There's no large, clean parallel corpus available to fine-tune a translation model from scratch with, and the existing multilingual models that support Sinhala weren't trained on much of it. This project was an exploration of what you can do with that constraint — and the answer turned out to be: more than you'd expect, if you design the pipeline thoughtfully.

## The three-stage approach

Rather than treating translation as a single model problem, I broke it into three stages, each handling a different part of the difficulty:

**Stage 1 — Statistical spelling correction**

Before translation, the input English text is cleaned. I built a statistical spelling corrector using a parallel corpus and language model — essentially Norvig's approach adapted to the domain. An improved version adds guardrails that prevent over-correction of domain-specific terms and proper nouns that a statistical model would otherwise mangle.

The corpus for this was generated using Gemini — a Python utility hits the API to produce aligned `parallel_corpus.txt` and `lm_corpus.txt` files, which is a useful trick for bootstrapping data for low-resource setups.

**Stage 2 — Complex English → simpler English**

Sinhala sentence structure differs significantly from complex English. Long embedded clauses, passive constructions, and elaborate subclauses translate awkwardly. This stage uses an LLM to rewrite complex input into structurally simpler English before it hits the translation model — reducing the syntactic distance between source and target.

**Stage 3 — Neural translation with MBART**

A quantized MBART model handles the final English-to-Sinhala translation. Quantization keeps inference feasible without a GPU. The three stages connect end-to-end in a Gradio interface that makes the full pipeline usable interactively.

## Stack

- Python · Hugging Face Transformers · MBART · Gradio · Google Gemini API · Poetry

## Reflection

The interesting insight from this project is that pre-processing and problem decomposition often matter more than the model itself. Throwing a better translation model at complex English input doesn't help much if the structural mismatch between languages is the real bottleneck. Stage 2 exists entirely to reduce that mismatch — and it makes a measurable difference on long, complex sentences.

Low-resource NLP forces you to be creative in ways that high-resource settings don't. That's actually one of the more interesting spaces to work in.
