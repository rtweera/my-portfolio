---
title: "Unitree Gallery Service – Event Image Gallery with QR Sharing"
description: "A FastAPI-based image gallery microservice built for WSO2Con — enabling live event photo uploads, responsive gallery browsing, and instant QR-code-based image sharing."
pubDatetime: 2025-07-28
tags: ["FastAPI", "Python", "REST API", "QR Code", "Jinja2"]
featured: false
githubURL: "https://github.com/rtweera/unitree-gallery-service"
---

This was a practical tool built for a specific real-world need — WSO2Con, a developer conference, needed a lightweight way for staff and attendees to upload and share photos from the event floor without routing everything through a third-party service.

The constraint was simplicity: it had to work reliably, require no account creation, and let anyone share an image instantly using just a phone camera.

## What it does

Staff upload images via a `POST /upload` endpoint — from a phone, a curl command, or an admin UI. Each uploaded image gets a QR code generated automatically. Scanning the QR code on any device opens the image directly, making in-person sharing frictionless.

The web interface has two views: a gallery mode with a thumbnail sidebar and full-size viewer, and a "latest image" view that always shows the most recently uploaded photo — useful for displaying on a screen at the event.

## Stack

- Python · FastAPI · Uvicorn · Jinja2 · `qrcode` library · python-multipart · UV

## API surface

Beyond upload and gallery, the service exposes per-image download, single and bulk delete, health check, and stats endpoints. The `DEPLOYED_URL` environment variable controls what the QR codes point to — so the same code works locally and in production by just changing the URL.

## Reflection

Small, focused tools like this are underrated as portfolio pieces. The requirements were tight, the timeline was short, and it had to work at an actual live event with real people using it. Getting something production-ready under those constraints — reliable upload handling, graceful error responses, a UI that worked on mobile — required more care than a side project you can iterate on indefinitely.
