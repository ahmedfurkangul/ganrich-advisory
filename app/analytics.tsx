"use client";

import { useEffect } from "react";

const CONSENT_KEY = "ganrich-privacy-choice-v1";
const enabled = process.env.NEXT_PUBLIC_ANALYTICS_MODE === "cookieless";
const allowedEvents = new Set(["contact_started", "insight_viewed", "decision_tool_started", "private_briefing_started", "language_switched"]);

function hasAnalyticsConsent() {
  if (!enabled) return false;
  try {
    const preference = JSON.parse(localStorage.getItem(CONSENT_KEY) || "{}") as { analytics?: boolean };
    return preference.analytics === true;
  } catch {
    return false;
  }
}

export function trackAnalyticsEvent(event: string) {
  if (!allowedEvents.has(event) || !hasAnalyticsConsent()) return;
  const payload = JSON.stringify({
    event,
    path: window.location.pathname,
    language: document.documentElement.lang === "tr" ? "tr" : "en",
    occurredAt: new Date().toISOString(),
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
    return;
  }
  void fetch("/api/analytics", { method: "POST", headers: { "content-type": "application/json" }, body: payload, keepalive: true });
}

export function AnalyticsBridge() {
  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      const eventName = target?.dataset.analyticsEvent;
      if (eventName) trackAnalyticsEvent(eventName);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

// Cookieless steps toward a first contact (button click, form started, form sent). Only the step name and
// the page path are sent; the server counts them like page visits. Nothing typed into a form leaves the page.
export function leadEvent(event: "seen" | "cta" | "form_start" | "form_submit" | "check_start" | "check_complete") {
  try {
    navigator.sendBeacon?.("/api/lead-event", new Blob([JSON.stringify({ event, path: location.pathname })], { type: "application/json" }));
  } catch {}
}

const CONTACT = /^\/(en\/contact|tr\/iletisim)\/?$/;

export function LeadSignals() {
  useEffect(() => {
    // Once per page load: proves a real browser ran the page (see worker/traffic.ts).
    leadEvent("seen");
    let started = false;
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (link && link.origin === location.origin && CONTACT.test(link.pathname) && !CONTACT.test(location.pathname)) leadEvent("cta");
    };
    const onFocus = (event: FocusEvent) => {
      if (!started && event.target instanceof Element && event.target.closest("form.contact-form")) { started = true; leadEvent("form_start"); }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("focusin", onFocus); };
  }, []);
  return null;
}
