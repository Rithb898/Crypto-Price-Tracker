import { Loader2 } from "lucide-react";
import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#00D7FE]" />
    </div>
  );
}

export default LoadingSpinner;
