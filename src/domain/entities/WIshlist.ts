import { IJobPostDocument } from "./JobPost";

 

export interface IWishlist {
  userId: String;
  jobPostData: [IJobPostDocument];
}
