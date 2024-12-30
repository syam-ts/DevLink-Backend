import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePayment {
    constructor() {};

    async execute(data: any) {
       
        const { amount } = data;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr',
            payment_method_types: ['card']
        });

        return({
            clientSecret: paymentIntent.client_secret
        })
        

    }
}