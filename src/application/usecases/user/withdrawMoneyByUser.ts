const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class WithdrawMoneyByUser {
  constructor() {}

  async execute(userId: string, amount: number, accountNumber: string, ifscCode: string, currency: string) {
    const amountInPaisa = Math.round(amount * 100); // Convert INR to paisa

    // Create Stripe Connected Account for the user
    let account = await stripe.accounts.create({
      type: "express", // Express is recommended for India
      country: "IN",
      email: `${userId}@example.com`,
      capabilities: {
        transfers: { requested: true },
      },
    });

    // Link user's Indian bank account
    const bankAccount = await stripe.accounts.createExternalAccount(account.id, {
      external_account: {
        object: "bank_account",
        country: "IN",
        currency: currency,
        account_number: accountNumber,
        routing_number: ifscCode, // IFSC code is the routing number in India
      },
    });

    // Process payout to the user's bank account
    const payout = await stripe.transfers.create(
      {
        amount: amountInPaisa,
        currency: currency,
        destination: account.id,
      }
    );
    console.log('The payout: ', payout);

    if (payout) {
      console.log("Withdrawal Successful:", payout);
    }

    return payout;
  }
}
