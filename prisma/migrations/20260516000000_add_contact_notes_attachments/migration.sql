-- Rename notes -> bio on Contact
ALTER TABLE "Contact" RENAME COLUMN "notes" TO "bio";

-- Make leadId optional on Note
ALTER TABLE "Note" ALTER COLUMN "leadId" DROP NOT NULL;

-- Add contactId to Note
ALTER TABLE "Note" ADD COLUMN "contactId" TEXT;
ALTER TABLE "Note" ADD CONSTRAINT "Note_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Make leadId optional on Attachment
ALTER TABLE "Attachment" ALTER COLUMN "leadId" DROP NOT NULL;

-- Add contactId to Attachment
ALTER TABLE "Attachment" ADD COLUMN "contactId" TEXT;
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
