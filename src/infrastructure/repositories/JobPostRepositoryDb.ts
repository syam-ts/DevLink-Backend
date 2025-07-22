import { Client, ClientModel } from "../../domain/entities/Client";
import { JobPostDocument, JobPostModel } from "../../domain/entities/JobPost";
import { NotificationModel } from "../../domain/entities/Notification";
import { IJobPostRepository } from "../../domain/interfaces/IJobsPostRepository";

export class JobPostRespositoryDb implements IJobPostRepository {
    async createJobPost(
        clientId: string,
        data: JobPostDocument
    ): Promise<JobPostDocument> {
        const client = await ClientModel.findById(clientId).lean<Client>();
        if (!client) throw new Error("Client not found");

        //update client jobpost count
        const cilent = await ClientModel.findByIdAndUpdate(
            clientId,
            {
                $inc: { totalJobs: 1 },
            },
            {
                new: true,
            }
        );
        let parsedEstimatedTimeInHours = Number(data.estimateTime);
        if (data.paymentType === "hourly") {
            parsedEstimatedTimeInHours = Number(data.estimateTime);
            const totalAmount = Math.floor(data.estimateTime * data.amount);
            data.amount = totalAmount; //updatig the total amount
        }

        const createdJobPost = new JobPostModel({
            title: data.title,
            description: data.description,
            keyResponsiblities: data.keyResponsiblities,
            requiredSkills: data.requiredSkills,
            paymentType: data.paymentType,
            estimateTime: new Date(),
            estimateTimeinHours: parsedEstimatedTimeInHours,
            amount: data.amount,
            expertLevel: data.expertLevel,
            location: data.location,
            projectType: data.projectType,
            maxProposals: data.maxProposals,
            proposalCount: 0,
            aboutClient: {
                companyName: client.companyName,
                location: client.location,
                totalSpend: client.totalSpend,
                totalHours: client.totalHours,
                domain: client.domain,
                numberOfEmployees: client.numberOfEmployees,
                joined: client.createdAt,
            },
            status: "pending",
            isPayment: true,
            createdAt: new Date(),
            clientId: clientId,
        });

        const savedJobPost = await createdJobPost.save();

        const newNotification = await NotificationModel.create({
            type: "New Job Post",
            message: "New Post created successfully",
            sender_id: process.env._ADMIN_OBJECT_ID,
            reciever_id: clientId,
            createdAt: new Date(),
        });

        newNotification.save();
        return savedJobPost;
    }

    async listAllJobs(clientId: string): Promise<JobPostDocument[]> {
        const jobs = await JobPostModel.find({ clientId: clientId }).exec();
        if (!jobs || jobs.length === 0) throw new Error("No jobs found");
        return jobs;
    }

    async trendingJobs(): Promise<JobPostDocument[]> {
        const jobs = await JobPostModel.find().limit(3).exec();
        if (!jobs) throw new Error("Jobs not found");
        return jobs;
    }

    async findAllJobs(): Promise<JobPostDocument[]> {
        const allJobs = await JobPostModel.find().exec();

        if (!allJobs || allJobs.length === 0) throw new Error("No job found");

        return allJobs;
    }

    async getSelectedJobs(
        clientId: string,
        jobType: string,
        currentPage: number
    ): Promise<{ jobs: JobPostDocument[]; totalPages: number }> {
        const page_size: number = 3;
        const skip: number = (currentPage - 1) * page_size;

        let totalPages: number;
        if (jobType === "myJobs") {
            const totalJobs = await JobPostModel.countDocuments({
                $and: [{ clientId: clientId }, { status: "pending" }],
            });
            totalPages = Math.ceil(totalJobs / page_size);
            const jobs = await JobPostModel.find({
                $and: [{ clientId: clientId }, { status: "pending" }],
            })
                .skip(skip)
                .limit(page_size);

            if (!jobs) throw new Error("No jobs found");

            return {
                jobs,
                totalPages,
            };
        } else if (jobType === "completedJobs") {
            const totalJobs = await JobPostModel.countDocuments({
                $and: [
                    {
                        clientId: clientId,
                    },
                    {
                        status: "closed",
                    },
                ],
            });
            totalPages = Math.ceil(totalJobs / page_size);
            const jobs = await JobPostModel.find({
                $and: [
                    {
                        clientId: clientId,
                    },
                    {
                        status: "closed",
                    },
                ],
            })
                .skip(skip)
                .limit(page_size);
            if (!jobs) throw new Error("No jobs found");

            return {
                jobs,
                totalPages,
            };
        } else {
            throw new Error("Invalid selection");
        }
    }

    async inviteJobsList(clientId: string): Promise<JobPostDocument[]> {
        const jobs = await JobPostModel.find({
            clientId: clientId,
            status: "pending",
        }).exec();
        if (!jobs || jobs.length === 0) throw new Error("No jobs found");
        return jobs;
    }

    async getSingleJobPost(jobPostId: string): Promise<JobPostDocument> {
        const jobPost = await JobPostModel.findById(jobPostId).exec();
        if (!jobPost) throw new Error("Job Post didnt found");

        return jobPost;
    }
}
