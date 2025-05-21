# 🎯 Product Thinking: Role-Based UI Design for Video Segment Annotation Tool

## Overview

This document explains the design rationale behind the three user roles in the system: **Annotator**, **Reviewer**, and **Admin**. It clarifies their goals, permissions, and UI behavior, and how this separation enhances usability, security, and scalability.

---

## 👤 Roles and Responsibilities

### 1. Annotator
**Goal:** Segment the video into meaningful time slots and write a summary for each.

**Permissions:**
- View the video and its timeline
- Create and edit segments (time range + summary description)
- Cannot edit or comment on others' segments

**UI Implications:**
- Display segment list
- Allow jumping to timestamps
- Text area to add/edit summary

---

### 2. Reviewer
**Goal:** Audit the Annotator's work, ensure accuracy and consistency.

**Permissions:**
- View all segments
- Edit segment summaries if needed
- Add tags like “issue”, “unclear”, “redundant”
- Leave inline or panel-based comments on each segment

**UI Implications:**
- Editable segment descriptions
- Tag buttons under each segment
- Comment box for feedback

---

### 3. Admin
**Goal:** Manage the overall flow and oversee the content lifecycle.

**Permissions:**
- Upload new videos
- Trigger re-analysis (e.g., if the model improves)
- View audit history or logs (mocked)
- Has read-only access to all segments

**UI Implications:**
- Upload section
- Re-analysis button
- Read-only segment view
- View change log or mock history

---

## 🎯 Design Rationale

- **Role separation increases clarity**: Each user has a focused job, reducing mistakes.
- **Reviewer is intentionally distinct from Annotator**: To maintain objective quality control.
- **Admin avoids editing segments**: To maintain audit traceability and control scope.

---

## 🧱 Scaling Notes

If this system were to scale:
- Use real auth system (e.g. Firebase, Supabase) to assign roles
- Store segments, comments, and logs in a backend database
- Paginate video segments for performance
- Add user-specific task assignment for Annotators/Reviewers

---

## ✅ Summary Table

| Role       | Create Segments | Edit Descriptions | Comment | Add Tags | Upload Video | Re-analyze | View Logs |
|------------|------------------|--------------------|---------|----------|---------------|-------------|------------|
| Annotator  | ✅               | ✅                 | ❌      | ❌       | ❌            | ❌          | ❌         |
| Reviewer   | ❌               | ✅                 | ✅      | ✅       | ❌            | ❌          | ❌         |
| Admin      | ❌               | ❌ (read-only)     | ❌      | ❌       | ✅            | ✅          | ✅         |