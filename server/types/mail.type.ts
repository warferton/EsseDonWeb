export interface IBookingData{
 bookingNumber: number;
 recipientName: string;
 eventName: string;
 weekDay: string;
 time: string;
 date: Date;
}

export interface IPerformRequestData{
 recipientName: string
 email: string;
 tel: string;
 comment: string;
 videoLink: string;
}