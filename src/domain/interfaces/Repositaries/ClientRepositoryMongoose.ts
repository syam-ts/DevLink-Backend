import mongoose, { Schema, Document, Model } from 'mongoose';
import { Client } from '../../entities/Client';
import { ClientRepositary } from '../../../application/usecases/client/signupClient';

 
interface ClientDocument extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
}

 
const ClientSchema = new Schema<ClientDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: false },
});

 
const ClientModel: Model<ClientDocument> = mongoose.model<ClientDocument>('Client', ClientSchema);

export class ClientRepositoryMongoose implements ClientRepositary {
  async createClient(client: Client): Promise<Client> {
    const createdClient = new ClientModel({
      name: client.name,  
      email: client.email,
      password: client.password
    });

    const savedClient = await createdClient.save();

    return { 
      clientname: savedClient.name,
      email: savedClient.email,
      password: savedClient.password,
      mobile: savedClient.mobile,
    } as Client;
  }

  async findClientByEmail(email: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();
    if (!client) return null;
 
    return { 
      Clientname: client.name,
      email: client.email,
      password: client.password,
      mobile: client.mobile,
    } as Client;
  }
}


