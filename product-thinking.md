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
- Editable segment list with optional AI-generated initialization
- Allow jumping to timestamps
- “Save” button to persist changes
- Text area for editing segment descriptions

---

### 2. Reviewer

**Goal:** Audit the Annotator's work, ensure accuracy and consistency.

**Permissions:**
- View all analysis versions (read-only)
- Add feedback comments with customizable tags
- Cannot edit or delete segments

**UI Implications:**
- Read-only segment list with clickable timestamps
- TagSelector + comment input
- History panel of past analysis versions
- “Add Comment” button per version

---

### 3. Admin

**Goal:** Manage the overall flow and oversee the content lifecycle.

**Permissions:**
- View all analysis history and version data
- Delete outdated analysis versions
- View and delete comments
- Upload videos from local or extracted sources
- Cannot edit any segment directly

**UI Implications:**
- View-only version list with timestamp navigation
- “Delete” button for each version and comment
- Timeline table with clickable time slots
- Comment moderation panel with tag display
- Upload interface with file selector and extract-from-link input

---

## 🎯 Design Rationale

- **Role separation increases clarity**: Each user has a focused task, reducing mistakes and cognitive load.
- **Reviewer is distinct from Annotator**: Reviewers offer objective feedback without editing the original content.
- **Admin has oversight, not content creation**: Admins can review and moderate but don’t directly alter content to preserve traceability.

---

## 🧱 Scaling Notes

If this system were to scale:

- Use a real authentication and role management system (e.g., Firebase, Supabase)
- Persist all segments, comments, and logs to a backend database
- Implement pagination or virtual scrolling for long segment lists
- Add task assignment workflows between Annotators and Reviewers
- Enable batch operations for Admin (e.g., multi-delete)

---

## ✅ Summary Table

| Role       | Create Segments | Edit Descriptions | Comment         | Add Tags       | Upload Video | View Analysis      | Delete Versions | Delete Comments |
|------------|------------------|--------------------|------------------|----------------|---------------|---------------------|------------------|------------------|
| Annotator  | ✅               | ✅                 | ❌               | ❌             | ❌            | ✅                  | ❌               | ❌               |
| Reviewer   | ❌               | ❌ (read-only)     | ✅               | ✅             | ❌            | ✅ (all versions)   | ❌               | ❌               |
| Admin      | ❌               | ❌ (read-only)     | ✅ (manage all)  | ✅ (view only) | ✅            | ✅ (full access)    | ✅               | ✅               |