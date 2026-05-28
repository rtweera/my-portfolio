---
title: "Network Load Balancing – Decentralized Multi-Agent System"
description: "An agent-based simulation of decentralized network load balancing using Mesa and Pygame — where server and user agents autonomously communicate, negotiate load, and self-organize without any central coordinator."
pubDatetime: 2024-12-01
tags: ["Multi-Agent Systems", "AI", "Mesa", "Pygame", "Python", "Simulation"]
featured: false
githubURL: "https://github.com/rtweera/Network-Load-Balancing-using-MAS"
---

Traditional load balancers are centralized — there's a single coordinator that routes requests to servers based on some policy. That works well under normal conditions, but it's a single point of failure and doesn't adapt well to rapidly changing conditions. This project explores what happens when you remove the coordinator entirely and let the servers and users sort it out themselves.

## How the simulation works

Every entity in the simulation is an autonomous agent:

**UserAgent** — requests a server connection, maintains its state, disconnects and retries if needed, and dies after a random lifespan before respawning. Users don't know anything about the overall system — they just keep looking for a server.

**ServerAgent** — accepts connections up to its capacity. When full, it delegates incoming users to other servers. When underutilized, it actively requests users from overloaded peers. When severely underloaded, it redistributes all its users to other servers and terminates itself — removing slack capacity from the system.

The key behavior is server-to-server negotiation. No agent has a global view. Each server only knows about its own load and the messages it receives from other agents. The system-level behavior — balanced load, adaptive capacity, resilience to node loss — emerges from those local interactions.

## The butterfly effect trigger

One of the more interesting features is a "Butterfly" button in the Pygame visualization. It disconnects one user from a random server — a tiny perturbation — and lets you watch whether it cascades or dissipates. In certain configurations, that single disconnect triggers a chain of rebalancing events across the whole network. It's a useful way to intuitively understand system stability and the conditions that make it fragile.

## Stack

- Python · Mesa (agent-based modeling framework) · Pygame · Poetry

## Reflection

Building this made the case for agent-based modeling as a tool for thinking about distributed systems. The interesting behaviors — load oscillation, cascading failures, graceful recovery — weren't programmed explicitly. They emerged from the agent rules. That's a very different mental model from designing a centralized system, and it's a useful one for thinking about any distributed infrastructure problem.
