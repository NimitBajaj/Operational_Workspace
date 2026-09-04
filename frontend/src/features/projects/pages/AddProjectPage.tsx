import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageHeader from "@/components/common/PageHeader";

import ProjectForm from "../components/ProjectForm";

import {
  projectSchema,
  type ProjectFormInput,
  type ProjectFormValues,
} from "../components/schemas/project.schema";

export default function AddProjectPage() {

  const form = useForm<
    ProjectFormInput,
    any,
    ProjectFormValues
  >({
    resolver: zodResolver(projectSchema),

    defaultValues: {
      title: "",
      description: "",
      customerId: "",
      location: "",
      projectType: "",
      status: "LEAD",
      priority: "MEDIUM_PRIORITY",
      estimatedValue: undefined,
      expectedCompletionDate: "",
    },
  });

  function onSubmit(data: ProjectFormValues) {
    console.log(data);
  }

  return (
    <>
      <PageHeader
        title="Add Project"
        subtitle="Create a new project."
      />

      <ProjectForm
        form={form}
        onSubmit={onSubmit}
        submitText="Save Project"
      />
    </>
  );
}