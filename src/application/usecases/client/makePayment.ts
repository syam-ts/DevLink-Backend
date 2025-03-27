import Stripe from "stripe";

export interface ClientRepository {
  createJobPost(clientId: string, postData: any): void;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePayment {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string, data: any) { 
    const { 
      amount,
      paymentType, 
    } = data.formData;

    if (paymentType === "hourly") {
      if (amount < 100 || amount > 2000) {
        throw new Error("Pay per Hour should 100₹ to 2000₹ ");
      }

      const totalAmount: number = parseInt(data.formData.estimateTime) * data.formData.amount;
      data.formData.amount = totalAmount;

      const product = await stripe.products.create({
        name: "Job-Post",
      });

      if (product) {
        const price = await stripe.prices.create({
          product: `${product.id}`,
          unit_amount: totalAmount * 100,
          currency: "inr",
        });

        if (price.id) {
          var session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: `${price.id}`,
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_ORIGIN}/client/paymentSuccess/${encodeURIComponent(
              clientId
            )}/${encodeURIComponent(JSON.stringify(data.formData))}`,
            cancel_url:
              `${process.env.FRONTEND_ORIGIN}/client/paymentFailed`,
            customer_email: process.env.STRIPE_CUSTOMER_EMAIL,
          });

          return session;
        }
      }
    } else {
      if (amount < 10000 || amount > 200000) {
        throw new Error("Pay per Hour should 10000₹ to 200000₹ ");
      }

      const totalAmount = amount;
      console.log('Total: ',totalAmount)

      const product = await stripe.products.create({
        name: "Job-Post",
      });

      if (product) {
        const price = await stripe.prices.create({
          product: `${product.id}`,
          unit_amount: totalAmount * 100,
          currency: "inr",
        });

        if (price.id) {

          var session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: `${price.id}`,
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_ORIGIN}/client/paymentSuccess/${encodeURIComponent(
              clientId
            )}/${encodeURIComponent(JSON.stringify(data.formData))}`,
            cancel_url:
              `${process.env.FRONTEND_ORIGIN}/client/paymentFailed`,
            customer_email: process.env.STRIPE_CUSTOMER_EMAIL,
          });
 
          return session;
        }
      }
    }
  }
}
