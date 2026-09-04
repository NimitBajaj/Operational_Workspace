export interface Project {
  id: string;

  title: string;

  status: string;

  priority: string;

  location?: string;

  estimatedValue?: string;

  expectedCompletionDate?: string;

  customer: {
    id: string;
    name: string;
  };
}