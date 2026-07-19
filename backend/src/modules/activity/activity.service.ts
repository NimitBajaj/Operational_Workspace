import { ActivityRepository } from "./activity.repository";
import { ProjectRepository } from "../project/project.repository";

import { CreateActivityInput } from "./activity.schema";

import { NotFoundException } from "../../common/errors/not-found-error";

export class ActivityService {
    constructor(
        private readonly activityRepository: ActivityRepository,
        private readonly projectRepository: ProjectRepository
    ) {}

    async crete(data: CreateActivityInput) {

    const project =
        await this.projectRepository.findById(
            data.projectId
        );

    if (!project) {
        throw new NotFoundException(
            `Project with id "${data.projectId}" not found.`
        );
    }

    return this.activityRepository.create({

        type: data.type,

        title: data.title,

        description: data.description,

        entityType: data.entityType,

        entityId: data.entityId,

        performedBy: data.performedBy,

        project: {
            connect: {
                id: data.projectId,
            },
        },
    });
}

async findAll() {
    return this.activityRepository.findAll();
}

async findById(id: string) {

    const activity =
        await this.activityRepository.findById(id);

    if (!activity) {
        throw new NotFoundException(
            `Activity with id "${id}" not found.`
        );
    }

    return activity;
}

async findByProject(projectId: string) {

    const project =
        await this.projectRepository.findById(
            projectId
        );

    if (!project) {
        throw new NotFoundException(
            `Project with id "${projectId}" not found.`
        );
    }

    return this.activityRepository.findByProject(
        projectId
    );
}


}