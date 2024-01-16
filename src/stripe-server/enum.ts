export const STRIPE_WEBHOOK_EVENTS_ENUM = {
  TERMINAL_READER_SUCCEEEDED: 'terminal.reader.action_succeeded',
  TERMINAL_READER_FAILED: 'terminal.reader.action_failed',
} as const;

export type StripeWebhookEventsEnum =
  (typeof STRIPE_WEBHOOK_EVENTS_ENUM)[keyof typeof STRIPE_WEBHOOK_EVENTS_ENUM];
