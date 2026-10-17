// Calls to pitchr-ai (the FastAPI AI service). Only NestJS talks to it.

// Where pitchr-ai runs. On Railway this is its private network address.
const PITCHR_AI_URL = process.env.PITCHR_AI_URL ?? 'http://localhost:8000';

/** pitchr-ai couldn't be reached, or answered with an error. */
export class PitchrAiError extends Error {}

/**
 * POST a JSON body to pitchr-ai with the shared secret and return its JSON answer.
 * Throws PitchrAiError when the key is missing, pitchr-ai is unreachable or slow,
 * or it answers with an error (502: Claude failed; 422: the body doesn't match its contract).
 */
export async function postToPitchrAi<T>(
  path: string,
  body: unknown,
  timeoutMs: number,
): Promise<T> {
  // Same value as PITCHR_AI_API_KEY in pitchr-ai
  const apiKey = process.env.PITCHR_AI_API_KEY;
  if (!apiKey) throw new PitchrAiError('PITCHR_AI_API_KEY is not set');

  let response: Response;
  try {
    response = await fetch(`${PITCHR_AI_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Api-Key': apiKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    throw new PitchrAiError(`pitchr-ai request failed: ${error}`);
  }

  if (!response.ok) {
    throw new PitchrAiError(
      `pitchr-ai returned ${response.status}: ${await response.text()}`,
    );
  }
  return (await response.json()) as T;
}
