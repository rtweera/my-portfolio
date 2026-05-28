---
title: "Choreo Docs AI – End-to-End Dataset Generation, RAG, and Fine-Tuning Pipeline"
description: "A full AI pipeline built around WSO2 Choreo documentation — generating QA datasets with LLMs, fine-tuning Qwen SLMs with LoRA, and building a RAG-based conversational assistant. Three interconnected projects covering the complete lifecycle from raw docs to a working domain expert."
pubDatetime: 2025-06-10
tags: ["RAG", "Fine-Tuning", "LangChain", "Gemini", "Qwen", "LoRA", "Unsloth", "ChromaDB", "MLOps", "Python"]
featured: false
githubURL: "https://github.com/rtweera/new-choreo-qa-gen"
---

This is less a single project and more a coherent body of work spanning three interconnected repositories — all built around the same question: can you turn a large, complex product documentation into a working domain-expert AI system, and what does the full pipeline for that actually look like?

The subject was WSO2 Choreo, a cloud-native platform with extensive markdown documentation. The ambition was to go end-to-end: from raw docs, through dataset generation, through fine-tuning, through evaluation — and end up with a model that can answer questions about Choreo competently.

## The three components

### 1. QA Dataset Generator

The first problem is data. There's no labeled dataset of questions and answers about Choreo — you have to create it. I built an automated pipeline that ingests the documentation, summarizes sections with an LLM, and generates question-answer pairs using several different strategies:

- **Implicit-N:** the model decides how many questions a document section warrants based on content density
- **Simple N-given:** fixed number of QA pairs per document — good for uniform coverage
- **Topic-wise:** generates questions grouped by topic rather than by document
- **User-centric:** frames questions from the perspective of a developer trying to accomplish a specific task

Multiple strategies matter because they produce different distributions of questions. A model trained on only implicit-N questions will have gaps that topic-wise questions would have filled.

The pipeline supports Google Gemini, OpenAI, and Anthropic as LLM backends through a LangChain abstraction — so you can switch providers without rewriting the generation logic. LangSmith handles observability and caching. Output is CSV and JSONL, with field mapping configuration for flexible downstream use.

After running the pipeline across the full Choreo documentation, it produced hundreds of QA pairs across multiple versioned datasets.

### 2. Fine-Tuning Framework

With a dataset in hand, the next step was fine-tuning. I built a reusable LoRA fine-tuning framework around Unsloth and the Qwen 2.5 model family (0.5B, 3B, 7B variants), with full support for:

- YAML-driven configuration — no code changes between experiments
- 4-bit quantization for memory efficiency
- SFTTrainer-based supervised fine-tuning with gradient checkpointing
- Inference scripts for both the fine-tuned model and the base model (for comparison)
- RAGAS-based evaluation: answer similarity and relevancy against the held-out QA set
- W&B experiment tracking; model push to Hugging Face Hub on completion

Running base model inference alongside fine-tuned inference on the same questions made it easy to measure the actual delta — how much did fine-tuning help, and on which question types.

### 3. RAG System

In parallel, I built a retrieval-augmented generation system over the same documentation corpus — not as an alternative to fine-tuning, but as a complement. RAG and fine-tuning solve different problems: RAG gives the model access to fresh, specific information at query time; fine-tuning changes how the model reasons and responds.

The RAG system uses LangChain, OpenAI embeddings (`text-embedding-3-small`), and ChromaDB as the vector store. A Document Manager handles loading and chunking the markdown files; an Embedding Manager creates and persists the vector database; a Conversational Retrieval Agent manages multi-turn dialogue with document-grounded context.

## What the full pipeline looks like

```
Raw Choreo docs
    ↓
QA Dataset Generator (Gemini / LangChain)
    ↓ CSV / JSONL datasets
Fine-Tuning Framework (Unsloth + Qwen)
    ↓ Fine-tuned model on HF Hub
Evaluation (RAGAS metrics vs. base model)

Parallel path:
Raw Choreo docs → Embeddings (OpenAI) → ChromaDB → RAG chatbot
```

## Stack

- Python · LangChain · Google Gemini 2.0 Flash · OpenAI · Anthropic · LangSmith
- Unsloth · Hugging Face Transformers · TRL · PEFT / LoRA · Qwen 2.5
- ChromaDB · RAGAS · Weights & Biases · UV / Poetry

## What I took from this

Building end-to-end taught me that data quality is the real bottleneck — not model architecture or training hyperparameters. The different QA generation strategies exist because no single strategy produces a balanced, high-quality dataset on its own. Getting the prompts right for each strategy, filtering out low-quality pairs, and versioning the datasets carefully probably mattered more than any single training decision.

It also made the case for RAG and fine-tuning as complements rather than alternatives. Fine-tuning made the model better at *how* it answers Choreo questions — tone, structure, format. RAG made it better at *what* it knows — grounding answers in specific, up-to-date documentation. Together they're more effective than either alone.
