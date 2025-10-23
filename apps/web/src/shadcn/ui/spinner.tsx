import type { Icon } from "@tabler/icons-react";
import type { ComponentProps } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@web/lib/utils";

function Spinner({ className, ...props }: ComponentProps<Icon>) {
  return (
    <IconLoader2
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
