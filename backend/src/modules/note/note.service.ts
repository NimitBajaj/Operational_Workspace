import { NoteRepository } from "./note.repository";
import { ProjectRepository } from "../project/project.repository";

import {
    CreateNoteInput,
    UpdateNoteInput,
} from "./note.schema";

import { NotFoundException } from "../../common/errors/not-found-error";

export class NoteService {
    constructor(
        private readonly noteRepository: NoteRepository,
        private readonly projectRepository: ProjectRepository
    ) {}

    async create(data: CreateNoteInput) {

    const project =
        await this.projectRepository.findById(
            data.projectId
        );

    if (!project) {
        throw new NotFoundException(
            `Project with id "${data.projectId}" not found.`
        );
    }

    return this.noteRepository.create({

        title: data.title,

        content: data.content,

        type: data.type,

        tags: data.tags,

        isPinned: data.isPinned ?? false,

        project: {
            connect: {
                id: data.projectId,
            },
        },
    });
}

async findAll() {
    return this.noteRepository.findAll();
}

async findById(id: string) {

    const note =
        await this.noteRepository.findById(id);

    if (!note) {
        throw new NotFoundException(
            `Note with id "${id}" not found.`
        );
    }

    return note;
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

    return this.noteRepository.findByProject(
        projectId
    );
}

async findPinned(projectId: string) {

    const project =
        await this.projectRepository.findById(
            projectId
        );

    if (!project) {
        throw new NotFoundException(
            `Project with id "${projectId}" not found.`
        );
    }

    return this.noteRepository.findPinned(
        projectId
    );
}

async update(
    id: string,
    data: UpdateNoteInput
) {

    await this.findById(id);

    return this.noteRepository.update(id, {

        title: data.title,

        content: data.content,

        type: data.type,

        tags: data.tags,

        isPinned: data.isPinned,
    });
}

async delete(id: string) {

    await this.findById(id);

    return this.noteRepository.delete(id);
}

}