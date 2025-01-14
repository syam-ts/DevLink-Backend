import Stripe from "stripe";

type Id = string;
export interface UserRepositary {
  boostAccount(userId: Id): Promise<any>;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class BoostAccount {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: Id) {
  

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
          success_url: `http://localhost:5173/user/profile/profile`, // show message of success
          cancel_url: "http://localhost:5173/user/payment-failed",
          customer_email: "samplemail@gmai.com",
        });


        const updatedUser = await this.userRepositary.boostAccount(userId);

        console.log('SUCCESSFULLY DONE THE USER UPDATE BOOST PART')
        return session;

   
      }
    }
  }
}
