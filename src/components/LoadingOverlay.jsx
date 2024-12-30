import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="rounded-lg bg-gray-800 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#00D7FE]" />
      </div>
    </motion.div>
  );
}
