import Stripe from 'stripe';


export interface ClientRepository {
    createJobPost(postData: any): Promise <any>
};


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePayment {
     constructor( private clientRepository: ClientRepository) {};

    async execute(data: any) { 
       
        const minWorkingHours: number = data.formData.estimateTime * 8;
      const finalDate: number = (data.formData.estimateTime * 24 ) - minWorkingHours;

      const totalAmount = finalDate * data.formData.payment;
 

     const product = await stripe.products.create({
         name: 'Job-Post'
     })


     if(product) {}
        const price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: totalAmount * 100,
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
           const jobPost = await this.clientRepository.createJobPost(data);
 
         return session;
        }


    }
}