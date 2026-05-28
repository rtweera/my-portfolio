---
title: "Compfigurator – PC Build Expert System"
description: "A rule-based expert system that recommends complete PC builds from a workload type and budget — using Experta for the knowledge engine and Streamlit for an interactive chat-style UI. Supports 11 workload types with progressive compatibility constraints."
pubDatetime: 2024-12-05
tags: ["Expert Systems", "AI", "Experta", "Streamlit", "Python", "Knowledge Engineering"]
featured: false
githubURL: "https://github.com/rtweera/compfigurator"
---

Expert systems don't get much attention in modern AI curricula — everything is neural networks and probabilistic models. But for problems with well-understood, stable rules and a need for explainable outputs, they're still the right tool. PC configuration is one of those problems: the compatibility rules between components are well-defined, the constraints are hard (a CPU either fits a socket or it doesn't), and users generally want to know *why* a particular component was recommended.

## How it works

Given a target workload — gaming, machine learning, video editing, office use, and eight others — and a budget, the system applies a chain of compatibility and budget constraints to select components:

**CPU → Motherboard** (socket and chipset compatibility) **→ GPU** (PCIe and budget) **→ RAM** (DDR type and speed) **→ Storage** (interface compatibility) **→ Monitor** (remaining budget)

The order matters. Each selection constrains what's valid for the next. A cheaper CPU might leave more budget for GPU, which is the right trade-off for gaming but wrong for scientific computing. The workload type shapes the budget allocation percentages that drive these trade-offs.

The engine scores each valid configuration and surfaces the best one alongside ranked alternatives. Each component comes with a short explanation drawn from the knowledge base — so the user understands not just *what* was recommended but *why*.

## Stack

- Python · Experta (Python CLIPS binding) · Streamlit · JSON knowledge base · Poetry

## Knowledge base

The knowledge base is a single `knowledge_base.json` file containing workload definitions, budget allocation rules, component catalogs (processors, motherboards, GPUs, RAM, storage, monitors), and per-component explanation strings. Adding a new component or workload is a JSON edit — no code changes.

## UI

The Streamlit app presents a chat-style interface: the user provides workload and budget, the system returns the best build and can show alternatives. A "View Knowledge Base" tab exposes the underlying data for transparency.

## Reflection

Building this alongside learning about modern ML approaches gave me a clearer view of what each paradigm is actually good at. Experta makes it trivial to express hard constraints that would be difficult to learn from data. Explaining a recommendation is built-in — not bolted on afterwards. The trade-off is that someone has to encode the knowledge, and keeping it current requires maintenance. For a rapidly changing domain (hardware prices, new chip generations), that's a real cost.
