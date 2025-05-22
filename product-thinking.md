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
- Save results as new analysis versions
- Cannot comment on or delete any segment

**UI Implications:**
- Display editable segment list
- Allow jumping to timestamps
- “Start Analysis” and “Save” buttons
- Text area for editing summaries

---

### 2. Reviewer
**Goal:** Audit the Annotator's work, ensure accuracy and consistency.

**Permissions:**
- View all segment results (read-only)
- Add feedback comments with customizable tags
- Cannot edit segment content

**UI Implications:**
- Read-only segment list with clickable timestamps
- TagSelector + comment box
- History panel of past analysis versions
- “Add Comment” button per version

---

### 3. Admin
**Goal:** Manage the overall flow and oversee the content lifecycle.

**Permissions:**
- View all analysis history
- Delete outdated analysis versions
- Delete inappropriate comments
- Has read-only access to segment content

**UI Implications:**
- View-only version list
- “Delete” button for each version and comment
- Timeline table with clickable time slots
- Display tags and comment content

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

| Role       | Create Segments | Edit Descriptions | Comment | Add Tags | Upload Video | Re-analyze | View Logs | Delete |
|------------|------------------|--------------------|---------|----------|---------------|-------------|------------|---------|
| Annotator  | ✅               | ✅                 | ❌      | ❌       | ❌            | ❌          | ❌         | ❌      |
| Reviewer   | ❌               | ❌ (read-only)     | ✅      | ✅       | ❌            | ❌          | ❌         | ❌      |
| Admin      | ❌               | ❌ (read-only)     | ❌      | ❌       | ✅ (mocked)   | ✅ (mocked) | ✅ (mocked)| ✅      |