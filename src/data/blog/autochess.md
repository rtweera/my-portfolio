---
title: "AutoChess – Fully Autonomous Chess-Playing Machine"
description: "A physical chess board that senses human moves, computes responses with an embedded chess engine, and physically moves pieces using an XY electromagnet gantry — rated at ~2000 ELO."
pubDatetime: 2023-07-20
tags: ["Embedded Systems", "C++", "Robotics", "PCB Design", "Chess AI"]
featured: true
githubURL: "https://github.com/rtweera/autochess"
---

This project is the most multidisciplinary thing I've ever built — part robotics, part firmware, part hardware design, part chess AI. The goal was simple to describe and genuinely difficult to execute: build a physical chess board that plays against a human without any external computer, moving the pieces itself.

## What it does

A human makes a move on the real board. The system detects it, validates it, computes a response using an embedded chess engine, and then physically picks up and repositions pieces using an XY gantry and an electromagnet — all autonomously, with no human intervention. From the player's perspective, it feels like playing against another human on a real board.

## How it works

The sensing layer is a 64-cell reed switch matrix, read through 4×4 analog multiplexers. When a piece moves, the change in the switch state lets the system infer the origin and destination squares. That move is then sent over a serial link to a second microcontroller running a MicroMax-based chess engine, which validates the move and computes the AI's response.

The motion system is an XY stepper gantry driven by two stepper motor channels. An electromagnet mounted on the carriage picks up pieces from below the board (through the surface) and drops them at the target square. The firmware handles every case: straight moves, diagonals, knight L-shapes, castling, and captures — including routing captured pieces to a designated off-board zone without colliding with other pieces.

I contributed to the system architecture, wrote core firmware modules for the sensing subsystem and motion control, and co-designed the custom PCB in KiCad that consolidates the motor drivers and multiplexer circuitry.

## Stack and tools

- Microcontrollers: Arduino Mega (game controller) + ESP-based board (chess engine)
- Languages: C++ (Arduino firmware)
- PCB: KiCad — custom boards for DRV8825 motor drivers and MUX subsystem
- Chess engine: MicroMax (compact, embedded-friendly engine)
- Hardware: NEMA stepper motors, reed switches, N35 electromagnet, limit switches, I2C LCD

## Outcome

The system worked — we demonstrated a complete human vs. computer game at EXMO, the university engineering exhibition. The AI plays at roughly 2000 ELO, which means it wins convincingly against most casual players while still being beatable by someone who knows what they're doing.

More than the ELO number, what I took away from this project was an appreciation for how much invisible complexity lives in physical systems. Software can be debugged with logs. Hardware fails silently. Getting the electromagnet pickup reliable across all 64 squares at varying piece weights, calibrating the stepper homing sequence, handling edge cases in the move detection — all of that took far more time than writing the chess logic.

This project permanently shifted how I think about AI systems. The interesting problems aren't always in the model — they're in the interface between the model and the real world.
