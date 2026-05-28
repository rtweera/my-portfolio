---
title: "Neuro-Symbolic PC Builder – SLM + Prolog Expert System"
description: "A PC configuration assistant that combines a Small Language Model for natural language understanding with a Prolog-based expert system for formal hardware compatibility reasoning — bridged via Janus-SWI."
pubDatetime: 2025-11-20
tags: ["Neuro-Symbolic AI", "Prolog", "LLM", "LangChain", "Ollama", "Python", "Chainlit"]
featured: true
githubURL: "https://github.com/rtweera/neuro-symbolic-pc-builder"
---

Most AI projects I've worked on sit squarely in one camp — either they're neural (deep learning, language models) or they're symbolic (rule engines, logic programming). This project was an experiment in combining both, and it ended up being one of the more intellectually interesting things I've built.

## The idea

The problem is PC configuration. A user describes what they want — budget, workload, preferences — in plain language. The system needs to understand that and then reason formally about hardware compatibility to recommend a valid build.

Neither approach alone is ideal. A pure LLM can misunderstand hardware constraints or hallucinate incompatible component combinations — it doesn't truly *know* that a B650 motherboard won't take DDR4 RAM, it just pattern-matches. A pure expert system is rigid and can't handle natural language input gracefully.

The neuro-symbolic approach splits the job cleanly: the language model handles intent extraction from free-form input, the expert system handles the logic.

## Architecture

The two components are connected through the Janus-SWI bridge — a Python library that embeds SWI-Prolog directly into a Python process, letting you call Prolog predicates as if they were Python functions.

**Neuro component:** An Ollama-hosted Small Language Model (running locally) receives the user's message via LangChain, interprets the intent, and constructs structured queries — budget, workload type, preferred brands, must-have components. LangGraph manages the agentic flow.

**Symbolic component:** A Prolog knowledge base (`knowledge_base.pl`) contains the hardware catalog and compatibility rules. Given the structured query from the SLM, Prolog runs formal backward-chaining inference to find valid builds — and only returns configurations that satisfy every constraint simultaneously. No hallucination possible at the reasoning layer.

**UI:** Chainlit provides the conversational frontend. It's chat-based, so the interaction feels natural even though the reasoning underneath is entirely rule-driven.

## What made it technically tricky

Getting the Janus bridge working reliably across environments was the biggest hurdle. SWI-Prolog needs specific environment variables (`SWI_HOME_DIR`, `PATH`) set before `janus_swi` is imported in Python — the order matters, and it fails silently if you get it wrong. Debugging that cost more time than writing the Prolog rules.

The other interesting challenge was the interface design between the two components. The SLM output needs to be structured enough for Prolog to query against — but not so rigid that the language model can't express nuance. Getting that boundary right required a few iterations of prompt engineering and Prolog schema design.

## Stack

- Python · SWI-Prolog · Janus-SWI · LangChain · LangGraph · Ollama · Chainlit · Docker Compose · Poetry

## Reflection

This project pushed me to think differently about where AI should be neural and where it should be symbolic. Language understanding is genuinely hard — LLMs are the right tool for it. But once you have structured intent, formal logic is faster, more reliable, and completely explainable. The combination gives you the best of both: fluent input, trustworthy reasoning.

Neuro-symbolic approaches are still relatively niche, which is partly what drew me to exploring this space. I think they're underused, and this project confirmed my intuition that the combination is worth more than either approach alone.
