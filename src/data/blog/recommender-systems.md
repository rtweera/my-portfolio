---
title: "Hybrid Book Recommender System"
description: "A book recommendation system combining content-based filtering (TF-IDF), collaborative filtering (user similarity), and network-based recommendation (PageRank) into a hybrid architecture — with separate cold-start and warm-user routing."
pubDatetime: 2026-02-23
tags: ["Recommender Systems", "Machine Learning", "NetworkX", "scikit-learn", "Python"]
featured: false
githubURL: "https://github.com/rtweera/recommender-systems-project"
---

Most recommender system projects pick one technique and demonstrate it. This project was about understanding how the techniques compare and how to combine them — with a particular focus on the cold-start problem, which is the real-world challenge that single-technique approaches handle poorly.

## The three approaches

**Content-based filtering** uses TF-IDF over book metadata (title, author, genre, description) to find items similar to what a user has liked. Works from item features alone — no user history needed.

**Collaborative filtering** computes user-to-user similarity based on rating history, then recommends items that similar users liked. Requires sufficient rating history to work well — which is why it fails for new users.

**Network-based (PageRank)** models the user-item interaction space as a graph and applies personalized PageRank to surface items with high connectivity to a user's preferences. Captures indirect relationships that pairwise similarity misses.

## Cold-start vs. warm-user routing

The architecture routes requests through different paths depending on what's known about the user:

**Cold-start (new user):** no history available, so collaborative filtering is useless. The system falls back to content-based recommendations combined with global popularity signals.

**Warm user (established history):** all three approaches contribute to a weighted hybrid score, with personalization boosts based on the user's established preference profile.

This distinction matters in practice. A single recommender that ignores it either performs poorly for new users or underutilizes available data for returning ones.

## Stack

- Python · scikit-learn (TF-IDF, cosine similarity) · NetworkX (PageRank) · pandas · numpy · Jupyter Notebooks · Poetry

## Reflection

The most useful thing this project made concrete was that recommendation quality has a ceiling set by the data you have — not the algorithm. Content-based filtering is only as good as the metadata. Collaborative filtering is only as good as the rating density. The hybrid approach helps, but it can't compensate for sparse or low-quality data. That's a lesson that applies well beyond recommender systems.
