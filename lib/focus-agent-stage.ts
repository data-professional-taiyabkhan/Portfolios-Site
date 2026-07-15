// Dispatched by any CTA that should scroll to and focus the live AgentStage console.
// AgentStage listens for this same event to scroll itself into view and focus its input.
export function focusAgentStage() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-agent-drawer"));
  }
}
