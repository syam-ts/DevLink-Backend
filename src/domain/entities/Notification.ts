export interface INotification {
    _id: string;
    type: string;
    message: string;
    sender_id: string;
    reciever_id: string;
    newContract: {
        contractId: string;
    };
    closeContract: {
        contractId: string;
        userId: string;
    };
    inviteSuccess: {
        userId: string;
    };
    withdrawData: {
        paymentScreenshot: string;
        amount: number;
        upiId: number;
    };
    createdAt?: Date;
    __v: string;
}
