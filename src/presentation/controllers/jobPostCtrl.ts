import { Request, Response } from "express";
import { CreateJobPost } from "../../application/usecases/jobPost/createJobPost";
import { GetSelectedJobsClientByClient } from "../../application/usecases/jobPost/getSelectedJobsByClient";
import { GetSingleJobPostClient } from "../../application/usecases/jobPost/getSingleJobPostByClient";
import { InviteJobsListByClient } from "../../application/usecases/jobPost/inviteJobListByClient";
import { ListAllJobsByClient } from "../../application/usecases/jobPost/listAllJobsByClient";
import { TrendingJobs } from "../../application/usecases/jobPost/trendingJobsByClient";
import { JobPostRespositoryDb } from "../../infrastructure/repositories/JobPostRepositoryDb";
import { HttpStatusCode } from "../../helper/constants/enums";
import { StatusMessage } from "../../helper/constants/stausMessages";
import logger from "../../logger/logger";

export class JobpostController {

    private jobpostRepo: JobPostRespositoryDb;
    private createJobPostUsecase;
    private listAllJobsUsecase;
    private trendingJobsUsecase;
    private getSelectedJobsUsecase;
    private inviteJobsListUsecase;
    private getSingleJobPostUsecase;

    constructor() {
        
        this.jobpostRepo = new JobPostRespositoryDb();
        this.createJobPostUsecase = new CreateJobPost(this.jobpostRepo);
        this.listAllJobsUsecase = new ListAllJobsByClient(this.jobpostRepo);
        this.trendingJobsUsecase = new TrendingJobs(this.jobpostRepo);
        this.inviteJobsListUsecase = new InviteJobsListByClient(this.jobpostRepo);
        this.getSingleJobPostUsecase = new GetSingleJobPostClient(this.jobpostRepo);
        this.getSelectedJobsUsecase = new GetSelectedJobsClientByClient(
            this.jobpostRepo
        );
    }

    createJobPost = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String(req.user?.id);
            const { data } = req.body;

            const jobPost = await this.createJobPostUsecase.execute(clientId, data);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.CREATED],
                data: jobPost,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            logger.error(err.message);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    };

    listAllJobs = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String(req.user?.id);
            const response = await this.listAllJobsUsecase.execute(clientId);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                response,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            logger.error(err.message);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    };

    trendingJobs = async (req: Request, res: Response): Promise<void> => {
        try {
            const jobs = await this.trendingJobsUsecase.execute();

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                data: jobs,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            logger.error(err.message);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    };

    getSelectedJobs = async (req: Request, res: Response): Promise<void> => {
        try {
            const { jobsType } = req.params;
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String(req.user?.id);
            const currentPage: number = Number(req.query.currentPage) || 1;

            const response = await this.getSelectedJobsUsecase.execute(
                clientId,
                jobsType,
                currentPage
            );
            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                data: response,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            logger.error(err.message);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    };

    inviteJobsList = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String(req.user?.id);
            const response = await this.inviteJobsListUsecase.execute(clientId);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                response,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            logger.error(err.message);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    };

    getSingleJobPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const { jobPostId } = req.params;
            const jobPost = await this.getSingleJobPostUsecase.execute(jobPostId);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                jobPost,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            logger.error(err.message);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    };
}
