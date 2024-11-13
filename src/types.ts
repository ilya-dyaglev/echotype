
export interface FeedbackData {
    createdAt: string;
    updatedAt: string;
    feedbackId: string;
    userId: string | null;
    emailDestination: string;
    feedbackContent: string;
}