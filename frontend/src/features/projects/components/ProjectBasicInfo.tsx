import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import FormField from "@/components/common/FormField";

import { PROJECT_STATUS, PRIORITIES } from "@shared/enums/project";

import type { UseFormReturn } from "react-hook-form";
import type {
  ProjectFormInput,
  ProjectFormValues,
} from "./schemas/project.schema";

interface Props {
  form: UseFormReturn<
    ProjectFormInput,
    any,
    ProjectFormValues
  >;
}

export default function ProjectBasicInfo({ form }: Props) {
  return (
    <>
      <FormField
        label="Project Title"
        error={form.formState.errors.title?.message}
      >
        <Input
          placeholder="Enter project title"
          {...form.register("title")}
        />
      </FormField>

      <FormField
        label="Status"
        error={form.formState.errors.status?.message}
      >
        <Select
        label ="Status"
          {...form.register("status")}
          options={PROJECT_STATUS.map(status => ({
            value: status,
            label: status.replaceAll("_", " "),
          }))}
        />
      </FormField>

      <FormField
        label="Priority"
        error={form.formState.errors.priority?.message}
      >
        <Select
            label="Priority"
          {...form.register("priority")}
          options={PRIORITIES.map(priority => ({
            value: priority,
            label: priority.replaceAll("_", " "),
          }))}
        />
      </FormField>
    </>
  );
}