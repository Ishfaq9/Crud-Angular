import { SMSRecipient } from "./SMSRecipient";

export interface SMSRecipientCategory {
    Id: number;
    Name?: string;
    Description?: string;
    IsActive: boolean;
    InsertedBy: string;
    InsertedDateTime: Date;
    UpdatedBy?: string;
    UpdatedDateTime?: Date;
    SmsRecipients?: SMSRecipient[];
  }
  