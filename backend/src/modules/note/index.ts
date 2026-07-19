import { prisma } from "../../lib/prisma";

import { NoteRepository } from "./note.repository";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";

import { ProjectRepository } from "../project/project.repository";

const noteRepository = new NoteRepository(prisma);
const projectRepository = new ProjectRepository(prisma);

const noteService = new NoteService(
    noteRepository,
    projectRepository
);

export const noteController =
    new NoteController(noteService);