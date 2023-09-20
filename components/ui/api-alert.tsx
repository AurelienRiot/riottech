"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

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

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Route API copiée dans le presse-papier");
  };

  return (
    <Alert>
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={VariantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex flex-row items-center mt-4 overflow-x-auto gap-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onCopy}
          className="px-2 ml-1 cursor-copy"
        >
          <Copy className="flex-shrink-0 w-4 h-4 " />
        </Button>
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ">
          {description}
        </code>
      </AlertDescription>
    </Alert>
  );
};
