"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Server } from "lucide-react";
import { toast } from "sonner";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const VariantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant = "public" }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Route API copiée dans le presse-papier");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}

        <Badge variant={VariantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex flex-row items-center gap-x-4 overflow-x-auto">
        <Button variant="outline" size="icon" onClick={onCopy} className="ml-1 cursor-copy px-2">
          <Copy className="h-4 w-4 shrink-0 " />
        </Button>
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ">
          {description}
        </code>
      </AlertDescription>
    </Alert>
  );
};
