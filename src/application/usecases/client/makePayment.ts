import Stripe from "stripe";
import { IJobPostDocument } from "../../../domain/entities/JobPost";

interface DataInterface {
  formData: IJobPostDocument
}

export interface ClientRepository {
  createJobPost(clientId: string, postData: IJobPostDocument): void;
}
 
const stripe = new Stripe('sk_test_51QbMd0IRhIB5V98AeCCvXn0kLeqwJ8HDxvSA92ucQQqItioMMPIEFwQk4kY9boTeeh1JRvF91jDnnAvOgJIO2F2k00J7W4XS9H');

export class MakePayment {
  constructor() {}

  async execute(clientId: string, data: DataInterface) { 
    const { 
      amount,
      paymentType, 
    } = data.formData;
    

    if (paymentType === "hourly") {

      const totalAmount: number = data.formData.estimateTime * data.formData.amount;  

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
