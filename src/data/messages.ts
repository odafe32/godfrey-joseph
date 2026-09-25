export type InquiryType = "project" | "consultation" | "speaking";

export interface MessageReply {
  body: string;
  at: string; // ISO date
}

export interface ContactMessage {
  id: string;
  inquiry: InquiryType;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO date
  read: boolean;
  replies?: MessageReply[];
}

export const inquiryLabels: Record<InquiryType, string> = {
  project: "Project Inquiry",
  consultation: "Consultation Request",
  speaking: "Speaking Invitation",
};
