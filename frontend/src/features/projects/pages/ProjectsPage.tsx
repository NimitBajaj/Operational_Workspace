import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";

import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const navigate = useNavigate();

  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="text-center text-slate-500 py-10">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Projects"
          subtitle="Manage all customer projects."
        />

        <Button onClick={() => navigate("/projects/add")}>
          Add Project
        </Button>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No Projects Found
          </h2>

          <p className="text-slate-500 mt-2">
            Create your first project to get started.
          </p>

          <Button
            className="mt-6"
            onClick={() => navigate("/projects/add")}
          >
            Add Project
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </div>
  );
}