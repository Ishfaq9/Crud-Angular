import { SMSRecipientCategory } from "./SMSRecipientCategory";

export interface SMSRecipient {
    SMSRecipients: { Id: number; PhoneNumber: string; IsActive: boolean; SmsRecipientCategoryId: number; InsertedBy: string; InsertedDateTime: Date; }[];
    Id: number;
    PhoneNumber: string;
    IsActive: boolean;
    SmsRecipientCategoryId: number;
    SmsRecipientCategory?: SMSRecipientCategory;
    InsertedBy: string;
    InsertedDateTime: Date;
    UpdatedBy?: string;
    UpdatedDateTime?: Date;
  }
  