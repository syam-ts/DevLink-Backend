import Stripe from "stripe";
import { JobPostDocument } from "../../../domain/entities/JobPost";

interface DataInterface {
  formData: JobPostDocument
}

export interface ClientRepository {
  createJobPost(clientId: string, postData: JobPostDocument): void;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePayment {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string, data: DataInterface) { 
    const { 
      amount,
      paymentType, 
    } = data.formData;
    

    if (paymentType === "hourly") {

      const totalAmount: number = data.formData.estimateTime * data.formData.amount; 
      console.log('The total: ', totalAmount)

      const product = await stripe.products.create({
        name: "Job-Post",
      });

      if (product) {
        const price = await stripe.prices.create({
          product: `${product.id}`,
          unit_amount: totalAmount * 100,
          currency: "inr",
        });
console.log("Final Data: ",data.formData)
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
      const totalAmount: number = amount;  
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
