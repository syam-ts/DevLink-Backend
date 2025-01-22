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

        if(title.length < 5  || title.length > 400) {
            throw new Error('Title should have atleset 5 characters');
        }
        
        
        if(keyResponsiblities.length < 10) {
            throw new Error('KeyResponsiblities should have 10 words');
        }
        
       
        if(description.length < 15) {
            throw new Error('Description should have 15 words');
        }
  
     
        if(requiredSkills.length < 2) {
            throw new Error('Minimum 2 skills are mandatory');
        }

        if(!paymentType) {
            throw new Error('Chose one payment Type');
        }

       
       
        if(!estimateTime) {
            throw new Error('Chose the estimate time');
        }
      
console.log('PAYMENT TYPE : ', paymentType)

       if(paymentType === 'hourly') {

  
        if(payment < 100 || payment > 2000) {
            throw new Error('Pay per Hour should 100₹ to 2000₹ ');
        } 


        const totalAmount = parseInt(data.formData.estimateTime) * data.formData.payment;
 
        data.formData.payment = totalAmount; 
  
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
                cancel_url: 'http://localhost:5173/client/draftJobPost/payment-failed',
                customer_email: 'samplemail@gmai.com'
  
  
             })
  
              
              
           return session;
          }
  
      }  
       } else {
 
        if(payment < 10000 || payment > 200000) {
            throw new Error('Pay per Hour should 10000₹ to 200000₹ ');
        } 


        const totalAmount = payment;
 
       
  
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
                cancel_url: 'http://localhost:5173/client/draftJobPost/payment-failed',
                customer_email: 'samplemail@gmai.com'
  
  
             })
  
              
              
           return session;
          }
        }
       }
    
    

   
    }
}