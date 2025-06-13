import { useEffect, useRef } from "react";

import { toast } from "react-toastify";
import { useSearchParams } from "react-router";

export function useToastQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasShownToast = useRef(false);

  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const type = searchParams.get("type");

  useEffect(() => {
    if (hasShownToast.current) return;

    if (success) {
      const emoji =
        {
          create: "🆕",
          update: "✏️",
          delete: "🗑️",
        }[type] || "ℹ️";

      toast.success(`${emoji} ${success}`);
      hasShownToast.current = true;
    }

    if (error) {
      toast.error(`❌ ${error}`);
      hasShownToast.current = true;
    }

    if (success || error) {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete("success");
          newParams.delete("type");
          newParams.delete("error");
          return newParams;
        },
        { replace: true }
      );
    }
  }, [success, error, type, setSearchParams]);
}
