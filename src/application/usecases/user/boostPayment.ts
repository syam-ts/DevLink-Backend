import Stripe from "stripe";
 
export interface UserRepositary {}
const stripe = new Stripe('sk_test_51QbMd0IRhIB5V98AeCCvXn0kLeqwJ8HDxvSA92ucQQqItioMMPIEFwQk4kY9boTeeh1JRvF91jDnnAvOgJIO2F2k00J7W4XS9H');

export class BoostPayment {
  constructor(private userRepositary: UserRepositary) {}

  async execute() {
    const product = await stripe.products.create({
      name: "Boost-User",
    });

    let boostPrice: number = 400;

    if (product) {
      const price = await stripe.prices.create({
        product: `${product.id}`,
        unit_amount: boostPrice * 100,
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
          success_url: `http://localhost:5173/user/profileBoostSuccess`,
          cancel_url: "http://localhost:5173/user/payment-failed",
          customer_email: "samplemail@gmai.com",
        });

        return session;
      }
    }
  }
}
