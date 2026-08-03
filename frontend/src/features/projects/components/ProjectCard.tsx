import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/common/StatusBadge";

import type { Project } from "../types/project";

interface Props {
  project: Project;
}

export default function ProjectCard({
  project,
}: Props) {

  const navigate = useNavigate();

  return (
    <Card className="p-6 hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-semibold">
            {project.title}
          </h2>

          <p className="text-slate-500 mt-1">
            {project.customer.name}
          </p>

        </div>

        <StatusBadge
          status={project.status}
        />

      </div>

      <div className="mt-6 space-y-2 text-sm text-slate-600">

        <p>
          <span className="font-medium">
            Priority:
          </span>{" "}
          {project.priority.replaceAll("_", " ")}
        </p>

        <p>
          <span className="font-medium">
            Location:
          </span>{" "}
          {project.location || "-"}
        </p>

        <p>
          <span className="font-medium">
            Estimated Value:
          </span>{" "}
          ₹
          {project.estimatedValue
            ? Number(project.estimatedValue).toLocaleString()
            : "-"}
        </p>

      </div>

      <div className="mt-6 flex justify-end">

        <Button
          variant="secondary"
          onClick={() =>
            navigate(`/projects/${project.id}`)
          }
        >
          View
        </Button>

      </div>

    </Card>
  );
}