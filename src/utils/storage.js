import { supabase } from "../lib/supabase";

// ============================================================
// STORAGE UTILITY
// Submissions -> Supabase
// Admin session + exam progress -> browser storage
// ============================================================

const ADMIN_SESSION_KEY = "airforce_admin_session";
const EXAM_PROGRESS_KEY = "airforce_exam_progress";

// ---- SUBMISSIONS (SUPABASE) ----

export async function saveSubmission(submission) {
  const { error } = await supabase.from("submissions").insert([
    {
      candidate_name: submission.candidate?.fullName || "",
      candidate_id: submission.candidate?.serviceNumber || "",
      rank: submission.candidate?.rank || "",
      unit: submission.candidate?.unit || "",
      answers: submission.answers || {},
      submit_reason: submission.submitReason || "",
      submitted_at: submission.submittedAt || new Date().toISOString(),
      reviewed: submission.reviewed || false,
      admin_feedback: submission.adminFeedback || "",
      admin_marks: submission.adminMarks || {},
    },
  ]);

  if (error) {
    console.error("Supabase saveSubmission error:", error);
    throw error;
  }
}

export async function getAllSubmissions() {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Supabase getAllSubmissions error:", error);
    return [];
  }

  return data || [];
}

export async function updateSubmission(id, updates) {
  const { error } = await supabase
    .from("submissions")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Supabase updateSubmission error:", error);
    return false;
  }

  return true;
}

export async function getSubmissionById(id) {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getSubmissionById error:", error);
    return null;
  }

  return data;
}

// ---- ADMIN SESSION ----

export function setAdminSession(admin) {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(admin));
}

export function getAdminSession() {
  try {
    return JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

// ---- EXAM PROGRESS ----

export function saveExamProgress(data) {
  localStorage.setItem(EXAM_PROGRESS_KEY, JSON.stringify(data));
}

export function getExamProgress() {
  try {
    return JSON.parse(localStorage.getItem(EXAM_PROGRESS_KEY)) || null;
  } catch {
    return null;
  }
}

export function clearExamProgress() {
  localStorage.removeItem(EXAM_PROGRESS_KEY);
}
