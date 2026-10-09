/**
 * @file ai-assistant.schema.ts
 * @description Local validation for visible conversational model replies.
 */
import { z } from 'zod';


// Validate our extracted text envelope locally; conversational providers need no JSON Schema.
export const aiAssistantModelOutputSchema = z.object({
  reply: z.string().min(1).max(4000),
}).strict();
export type AiAssistantModelOutput = z.infer<typeof aiAssistantModelOutputSchema>;
