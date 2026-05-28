---
title: "Chapters Blog Backend – FastAPI Microservice for AI Student Chapter Portal"
description: "A production FastAPI backend powering the blog section of the University of Moratuwa AI Student Chapter portal — covering blog CRUD, comments, replies, likes, and dashboard analytics with Keycloak JWT authentication and MongoDB."
pubDatetime: 2026-04-15
tags: ["FastAPI", "MongoDB", "Keycloak", "Docker", "Python", "REST API"]
featured: false
githubURL: "https://github.com/comp-math-uom/chapters-blogs-backend"
liveURL: "https://www.aistudentchapter.lk/blog"
---

The Computational Mathematics Department of University of Moratuwa had this Chapter website, which needed a backend for its member portal — a place where members could write blog posts, comment, engage with each other's work, and build a collective knowledge base. I contributed to this backend service, which handles the full content lifecycle from creation through engagement tracking.

## What the service does

The service exposes a REST API under `/api/v1/blogs` that the frontend portal consumes. It handles three user-facing content types — blog posts, comments/replies, and likes — plus a dashboard analytics layer that aggregates engagement data.

Public routes let anyone browse blogs, search by tags, and read comments without authenticating. Protected routes — creating, editing, deleting, and reacting to content — require a valid user identity.

## Authentication design

Authentication was an interesting design decision. The service sits behind an API gateway in the deployed setup, so it supports two input modes:

**Gateway header mode** — the gateway authenticates the user and injects their ID as `X-User-ID`. The service trusts that header without re-validating the token. Fast, and correct when the gateway is the only entry point.

**Direct bearer mode** — for direct API access and testing, the service validates a JWT against Keycloak's JWKS endpoint itself. This keeps the service independently usable without requiring the gateway.

The auth dependency checks for the header first, falls back to the bearer token. In production, the gateway is the only path in, so the header mode is always used — but the fallback makes local development and testing straightforward.

## Stack

- Python · FastAPI · Uvicorn · MongoDB (pymongo) · Keycloak (JWKS JWT) · Docker · Vercel · pytest

## Project structure

The service is organized cleanly: routers in `api/v1/endpoints/blogs.py`, business logic in `services/blog.py`, database handles in `db/database.py`, and request/response schemas in `schemas/blog.py`. Auth lives in `core/security.py`. There's also a gated debug namespace (`/debug/...`) for inspecting headers and system info — disabled in production.

## Reflection

Working on a real-organization backend with real users reading the API contracts pushed me to think more carefully about schema design and versioning than any coursework had. The v1/v2 structure exists partly because early API decisions needed to evolve without breaking the frontend — and that's a very normal production constraint that doesn't come up in tutorials.
