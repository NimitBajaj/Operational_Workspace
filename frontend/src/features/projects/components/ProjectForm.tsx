import Button from "@/components/ui/Button";
import SectionCard from "@/components/common/SectionCard";
import FormField from "@/components/common/FormField";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

import ProjectBasicInfo from "./ProjectBasicInfo";

import type { UseFormReturn } from "react-hook-form";
import type {
  ProjectFormInput,
  ProjectFormValues,
} from "./schemas/project.schema";
import CustomerSelect from "@/features/customers/components/CustomerSelect";

interface Props {
  form: UseFormReturn<
    ProjectFormInput,
    any,
    ProjectFormValues
  >;
  onSubmit: (data: ProjectFormValues) => void;
  submitText: string;
}

export default function ProjectForm({
  form,
  onSubmit,
  submitText,
}: Props) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>

      <div className="space-y-8">

        <SectionCard title="Basic Information">

          <div className="grid md:grid-cols-2 gap-6">

            <ProjectBasicInfo form={form} />

          </div>

          <div className="mt-6">

            <FormField
              label="Description"
              error={form.formState.errors.description?.message}
            >
              <Textarea
                placeholder="Project description..."
                {...form.register("description")}
              />
            </FormField>

          </div>

        </SectionCard>

        <FormField
    label="Customer"
    error={form.formState.errors.customerId?.message}
>
    <CustomerSelect
        value={form.watch("customerId")}
        onChange={(value) =>
            form.setValue("customerId", value)
        }
    />
</FormField>

        <SectionCard title="Project Details">

          <div className="grid md:grid-cols-2 gap-6">

            <FormField
              label="Location"
              error={form.formState.errors.location?.message}
            >
              <Input
                placeholder="Project location"
                {...form.register("location")}
              />
            </FormField>

            <FormField
              label="Project Type"
              error={form.formState.errors.projectType?.message}
            >
              <Input
                placeholder="Residential / Commercial"
                {...form.register("projectType")}
              />
            </FormField>

          </div>

        </SectionCard>

        <SectionCard title="Financial">

          <div className="grid md:grid-cols-2 gap-6">

            <FormField
              label="Estimated Value"
              error={form.formState.errors.estimatedValue?.message}
            >
              <Input
                type="number"
                placeholder="0"
                {...form.register("estimatedValue")}
              />
            </FormField>

            <FormField
              label="Expected Completion"
              error={form.formState.errors.expectedCompletionDate?.message}
            >
              <Input
                type="date"
                {...form.register("expectedCompletionDate")}
              />
            </FormField>

          </div>

        </SectionCard>

        <div className="flex justify-end gap-4">

          <Button variant="secondary">
            Cancel
          </Button>

          <Button>
            {submitText}
          </Button>

        </div>

      </div>

    </form>
  );
}