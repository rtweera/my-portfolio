---
title: "AI Career Domain Ontology – Semantic Web and Knowledge Graph"
description: "An OWL/RDF ontology modeling the AI domain — subfields, career roles, required skills, learning resources, and prerequisite relationships — stored in GraphDB and queryable via SPARQL, with a Streamlit + Ollama app for natural language exploration."
pubDatetime: 2026-02-22
tags: ["Semantic Web", "OWL", "RDF", "SPARQL", "GraphDB", "Streamlit", "Knowledge Graphs", "Python"]
featured: false
githubURL: "https://github.com/rtweera/sem-web-ontology-project"
---

Semantic web technologies — OWL, RDF, SPARQL, knowledge graphs — sit in an interesting corner of AI that most practitioners don't engage with. They predate the deep learning era and come from a different intellectual tradition: formal logic and knowledge representation. This project was an exercise in that tradition, applied to a domain I found meaningful: mapping out the AI field itself.

## The ontology

The domain model captures:

- **AI subfields** and the foundational concepts each requires (e.g., reinforcement learning requires probability theory and calculus)
- **Career roles** within AI (research scientist, ML engineer, AI product manager, etc.) and the skills each demands
- **Skills** themselves, with typing and difficulty levels
- **Learning resources** mapped to skills and difficulty levels, to support recommendation queries
- **Prerequisite relationships** between concepts — enabling path queries like "what do I need to learn before I can study transformers?"

The ontology is authored in RDF/XML format (`ai-ontology.rdf`) and loaded into a local GraphDB instance. SPARQL competency questions are defined up front and tested against the populated graph.

## The application

A Streamlit app connects live to the GraphDB SPARQL endpoint. Users can run the predefined competency queries, explore the graph structure, and interact with a local Ollama model (`llama3.2:1b`) for natural language querying — the LLM translates plain English questions into SPARQL and interprets the results.

A `reload_ontology.py` utility handles clearing and reloading the graph data cleanly during development, which was useful for iterating on the ontology schema.

## Stack

- Python · OWL/RDF (RDF/XML) · GraphDB · SPARQL · Streamlit · Ollama (llama3.2:1b) · Poetry

## Reflection

Formal ontology design forces a kind of precision that machine learning doesn't require. Every relationship needs a name, a direction, and a formal type. Every instance needs to fit cleanly into the class hierarchy. That discipline produces a knowledge base that's queryable in ways a document corpus or a vector store isn't — you can ask "which roles require both Python and statistics?" and get a precise, reproducible answer grounded in defined relationships.

The limitation, of course, is that someone has to maintain it. Ontologies don't learn from data. But for stable domains with well-understood structure, that's a feature rather than a bug.
