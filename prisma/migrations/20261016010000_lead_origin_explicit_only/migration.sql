-- Lead origin comes only from what was explicitly entered, never from touchpoints
-- (logged touchpoints can be wrong or missing; see docs/lead-origin.md).
--
-- The previous migration kept the explicit values (Networking, Referral, In person,
-- Form) and guessed the rest from each lead's first touchpoint. Those guesses
-- (DM, Email, Text, Call, In-person visit, or empty) become In-person visit, since
-- most leads started that way. Leads we've never contacted stay empty.
UPDATE "Lead" l
SET "origin" = 'IN_PERSON_VISIT'
WHERE (l."origin" IS NULL OR l."origin" IN ('DM', 'EMAIL', 'TEXT', 'CALL', 'IN_PERSON_VISIT'))
  AND EXISTS (SELECT 1 FROM "TouchPoint" t WHERE t."leadId" = l."id");
