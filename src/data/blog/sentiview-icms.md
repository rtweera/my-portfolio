---
title: "SentiView – AI-Powered Customer Communications Analytics Platform"
description: "A full-stack multi-channel sentiment intelligence platform built as a 2nd-year university software project. Spans an Angular 17 dashboard frontend and a FastAPI email analytics microservice with Gemini, AWS Comprehend, MongoDB, and Gmail OAuth."
pubDatetime: 2024-07-18
tags: ["Full Stack", "Angular", "FastAPI", "MongoDB", "AWS", "Gemini AI", "Docker", "TypeScript", "Python"]
featured: true
githubURL: "https://github.com/rtweera/iCSMS-email"
liveURL: "https://i-cms-frontend.vercel.app"
---

SentiView (internally called iCSMS) was our second-year software engineering project at the University of Moratuwa — a team-built platform that aggregates customer communications across email, calls, and social media, runs AI-powered sentiment analysis on them, and surfaces the results in an analytics dashboard. It's the first project I worked on that felt like a real product rather than an assignment. This was done in collaboration with [CodeGen International](https://codegen.co.uk/), who provided the project brief and mentorship.

## What it does

Businesses receive high volumes of customer communication across multiple channels. SentiView pulls that data in, classifies emails by topic (issues, inquiries, suggestions), runs sentiment analysis, generates conversation summaries, and presents everything in a live dashboard — giving customer-facing teams a clear picture of what customers are saying and how they're feeling, without reading every message manually.

## My responsibilities

I led the email analytics microservice — the backend that handles Gmail OAuth ingestion, AI-powered classification and summarization, and the REST API layer that the frontend consumes.

On the frontend side, I contributed to the Angular dashboard across multiple modules and was involved in the overall system design decisions, including how the microservices communicated and how authentication was structured.

## The email backend

The email service is a FastAPI microservice with a fair amount of moving parts:

**Ingestion:** Gmail OAuth2 callbacks handle multi-account authorization. The service pulls emails, parses them, and stores structured data in MongoDB.

**AI processing:** Google Gemini handles the heavy lifting — generating conversation summaries, extracting issues and inquiries, and producing structured labels from free-form email text. AWS Comprehend provides sentiment scoring as a complementary signal.

**API surface:** The service exposes a versioned REST API (v1 legacy + v2 structured) covering emails, issues, inquiries, suggestions, dashboard aggregates, settings, and notification channels. Swagger docs auto-generate at `/docs`.

**Infrastructure:** Dockerized with a `docker-compose` setup; also deployed on Vercel for the demo. Pytest test suite for core routes.

## The frontend

The Angular 17 app is organized into feature modules: authentication (AWS Cognito), call analytics, email analytics, social media analytics, a cross-channel main dashboard, and app settings. PrimeNG and Angular Material provide the component library; Chart.js and ECharts handle the visualizations. The production build runs in a Nginx Docker container.

## Stack

**Backend:** Python · FastAPI · MongoDB (pymongo) · Google Gemini API · LangChain · AWS Comprehend · Gmail API · Docker · Pytest · Vercel  
**Frontend:** Angular 17 · TypeScript · SCSS · PrimeNG · Angular Material · Chart.js · ECharts · AWS Cognito · Docker / Nginx · Kubernetes

## What I learned

This project exposed a lot of things that coursework doesn't — managing state across a microservice boundary, dealing with OAuth token refresh edge cases, keeping the frontend and backend API contracts in sync across a team, and the reality that integration problems are harder than implementation problems.

Working with LLM APIs in a production context also taught me to think carefully about latency and cost. Gemini calls are fast, but they're not free, and a naive "call the API for every email" approach doesn't scale. We built batch processing and result caching early — which turned out to matter more than we expected.

The platform is live at the link above. We're proud of how far it came from the initial brief.
