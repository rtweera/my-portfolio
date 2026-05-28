---
title: "GA Inventory Optimization – Genetic Algorithm Bin Packing"
description: "A genetic algorithm solving the 2D bin packing problem for inventory optimization — determining how to pack items of varying dimensions and values across storage bins to maximize space utilization and stored value, implemented in Java with a Python bridge."
pubDatetime: 2025-10-20
tags: ["Genetic Algorithm", "Optimization", "Java", "Python", "AI"]
featured: false
githubURL: "https://github.com/rtweera/GA-Inventory-Optimization"
---

Bin packing is one of the classic NP-hard combinatorial optimization problems — you can't solve it exactly for large instances, so you need heuristics or metaheuristics. This project uses a genetic algorithm to find good (not necessarily optimal) solutions to a 2D variant: packing rectangular items of known dimensions and values into bins of given capacities, optimizing for both total stored value and space utilization simultaneously.

## The problem

Each item has a width, height, monetary value, and available quantity. Each bin has fixed dimensions. The goal is to assign items to bins in a way that maximizes a combined fitness score balancing value density and space efficiency. With multiple item types, multiple quantities, and multiple bin sizes, the search space is large enough that brute force is infeasible even for modest inputs.

## The algorithm

The GA evolves a population of candidate assignments over 150 generations. Key parameters:

- Population size: 1,200
- Fitness weight: 0.75 (value weighted more heavily than space utilization — tunable)
- Mutation rate: 0.2 | Crossover rate: 0.3

The core optimizer is implemented in Java and compiled to a runnable JAR. A Python `bridge.py` module calls the JAR via subprocess, passing configuration as JSON and receiving the assignment mapping as JSON output — making the optimizer usable from Python scripts and notebooks without rewriting the GA in Python.

## Stack

- Java (GA implementation) · Python (bridge interface) · Maven

## My role

This was a group project. I contributed to the Python bridge interface and the integration design between the optimizer and the calling environment.

## Reflection

The two-language design was deliberate — Java's performance advantage matters for a population-based search running 150 generations over a population of 1,200. The Python wrapper makes it easy to integrate the optimizer into data pipelines or notebooks that would otherwise have to reimplement the algorithm. It's a pattern worth knowing: write the performance-critical core in the right language, expose it cleanly through the language you're working in.
