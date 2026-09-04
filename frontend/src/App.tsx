import { Search, Mail, IndianRupee } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "./components/ui/Badge";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-10">

      <Card className="w-[700px]">

        <CardHeader>
          <CardTitle>
            Customer Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex gap-3 flex-wrap">

    <Badge variant="success">
        Active
    </Badge>

    <Badge variant="warning">
        Pending
    </Badge>

    <Badge variant="danger">
        Cancelled
    </Badge>

    <Badge variant="info">
        Draft
    </Badge>

    <Badge>
        Archived
    </Badge>

</div>

          <Input
            label="Customer Name"
            placeholder="John Smith"
          />

          <Input
            label="Email"
            placeholder="john@email.com"
            leftIcon={<Mail size={18} />}
          />

          <Input
            label="Search Products"
            placeholder="Search..."
            leftIcon={<Search size={18} />}
          />

          <Input
            label="Selling Price"
            leftIcon={<IndianRupee size={18} />}
            placeholder="1450"
          />

          <Input
            label="Product Name"
            error="Product name is required"
          />

        </CardContent>

        <CardFooter>

          <Button variant="secondary">
            Cancel
          </Button>

          <Button>
            Save
          </Button>

        </CardFooter>

      </Card>
      

    </div>



    
  );
}

export default App;