"use client";

import type { CSSProperties } from "react";
import type { ToasterProps } from "sonner";
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconExclamationCircleFilled,
  IconInfoCircleFilled,
  IconLoader2
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <IconCircleCheckFilled className="size-4" />,
        info: <IconInfoCircleFilled className="size-4" />,
        warning: <IconAlertTriangleFilled className="size-4" />,
        error: <IconExclamationCircleFilled className="size-4" />,
        loading: <IconLoader2 className="size-4 animate-spin" />,
        close: <IconCircleXFilled className="size-4" />
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        } as CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
