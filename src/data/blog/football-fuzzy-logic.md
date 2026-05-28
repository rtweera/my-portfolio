---
title: "Football Analysis – YOLOv8 + Fuzzy Logic Confidence Refinement"
description: "A computer vision project combining YOLOv8 object detection with fuzzy inference to improve ball detection confidence in football footage — using domain-aware rules about position, aspect ratio, and proximity to players."
pubDatetime: 2024-12-28
tags: ["Computer Vision", "YOLOv8", "Fuzzy Logic", "OpenCV", "Python"]
featured: false
githubURL: "https://github.com/rtweera/fuzzy-logic-project"
---

YOLOv8 is very good at detecting people in football footage. It's less reliable for the ball — a small, fast-moving object that frequently gets occluded, motion-blurred, or partially cropped. The raw confidence scores YOLO outputs for ball detections are noisy, and filtering on confidence threshold alone produces too many false negatives and false positives.

This project explores whether domain-specific fuzzy reasoning can refine those confidence scores — essentially adding a soft rule layer on top of the neural network output.

## The approach

After YOLO runs detection and returns bounding boxes, ball detections are extracted and passed through a fuzzy inference system. The system derives features from each detection that YOLO doesn't reason about:

- **Normalized vertical position** — a ball near the top of the frame is probably not the match ball; one at pitch level is more likely to be
- **Horizontal position** — center-field detections are more probable than edge detections in a typical broadcast frame
- **Aspect ratio** — a real football is roughly circular; highly elongated boxes suggest a false positive
- **Person-to-ball size ratio** — the ball should be substantially smaller than nearby player detections
- **Initial YOLO confidence** — used as an additional fuzzy input rather than a hard threshold

These features are fed into a `scikit-fuzzy` inference system with membership functions and rules, producing an adjusted confidence score. The final score blends the YOLO confidence and the fuzzy output.

## Visualization

The main driver script produces a side-by-side comparison image: left panel shows raw YOLO detections with original confidence, right panel shows the same frame with fuzzy-adjusted scores. This makes it easy to see where the refinement helps and where it doesn't.

## Stack

- Python · Ultralytics YOLOv8 · scikit-fuzzy · OpenCV · numpy · matplotlib · Poetry

## Reflection

This was a group project — I worked on the fuzzy rule design and the integration between the YOLO pipeline and the fuzzy inference layer. The core insight was that neural networks and fuzzy logic aren't competing approaches — they're complementary. The neural network handles the pattern recognition it's good at; the fuzzy rules apply domain knowledge that would be very hard to learn from data.

The system is still exploratory — the rules need tuning and the calibration methodology needs more rigour before it'd be production-ready. But as a proof of concept for combining learned and expert-specified reasoning, it worked.
