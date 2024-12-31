import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePayment {
    constructor() {};

    async execute(data: any) {
       
        const { amount } = data;


     const product = await stripe.products.create({
         name: 'Job-Post'
     })


     if(product) {}
        const price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: 300 * 100,
            currency: 'inr'
        })


        if(price.id) {
           var session = await stripe.checkout.sessions.create({
              line_items: [
                {
                    price: `${price.id}`,
                    quantity: 1
                }
              ],
              mode: 'payment',
              success_url: 'http://localhost:5173/client/draftJobPost/payment-success',
              cancel_url: 'http://localhost:5173/client/draftJobPost/payment-failure',
              customer_email: 'samplemail@gmai.com'


           })
           return session;
        }


    }
}