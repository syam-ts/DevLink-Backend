import Stripe from 'stripe';


export interface ClientRepository {
    createJobPost(clientId: string, postData: any): Promise <any>
};


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePayment {
     constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string,data: any) { 

        const { title, description, keyResponsiblities, requiredSkills,payment, paymentType, estimateTime} = data.formData;
 

        if(!title || !description || !keyResponsiblities || !requiredSkills || !payment || !paymentType || !estimateTime ) {
            throw new Error('All Fields need to be filled');
        } 

        if(title.length < 5  || title.length > 20) {
            throw new Error('Title should have atleset 5 characters');
        }
        
        
        if(keyResponsiblities.length < 10) {
            throw new Error('KeyResponsiblities should have 10 words');
        }
        
       
        if(description.length < 15) {
            throw new Error('Description should have 15 words');
        }

        //FIX IT WITH ARRAY
        // if(requiredSkills.length < 10) {
        //     throw new Error('Minimum 2 skills are mandatory');
        // }


        if(payment < 100) {
            throw new Error('Pay per Hour atlest 100₹');
        }
      

        if(!paymentType) {
            throw new Error('Chose one payment Type');
        }
      

        if(!estimateTime) {
            throw new Error('Chose the estimate time');
        }
      
       
       
      const minWorkingHours: number = data.formData.estimateTime * 8;
      const finalDate: number = (data.formData.estimateTime * 24 ) - minWorkingHours;

      const totalAmount = finalDate * data.formData.payment;
 

     const product = await stripe.products.create({
         name: 'Job-Post'
     })


     if(product) {
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
              success_url: `http://localhost:5173/client/draftJobPost/payment-success/${encodeURIComponent(clientId)}/${encodeURIComponent(JSON.stringify(data.formData))}`,
              cancel_url: 'http://localhost:5173/client/draftJobPost/payment-failure',
              customer_email: 'samplemail@gmai.com'


           })

            
            
         return session;
        }

    }
    }
}