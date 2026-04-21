"use client";

import { motion } from "framer-motion";

export function SectionSkeleton({ type = "cards" }: { type?: "cards" | "text" | "stats" }) {
  if (type === "stats") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="h-24 rounded-xl bg-white/[0.03] border border-white/[0.04] overflow-hidden"
            >
              <div className="h-full animate-pulse">
                <div className="h-3 w-16 bg-white/[0.06] rounded mt-4 mx-4" />
                <div className="h-5 w-20 bg-white/[0.08] rounded mt-3 mx-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="h-8 w-64 bg-white/[0.05] rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-white/[0.03] rounded mx-auto animate-pulse" />
          <div className="h-4 w-80 max-w-full bg-white/[0.03] rounded mx-auto animate-pulse" />
        </motion.div>
      </div>
    );
  }

  // cards (default)
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="h-7 w-48 bg-white/[0.05] rounded-lg mx-auto animate-pulse" />
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="h-64 rounded-2xl bg-white/[0.03] border border-white/[0.04] overflow-hidden"
          >
            <div className="h-full animate-pulse">
              <div className="h-2 w-16 bg-white/[0.06] rounded mt-4 mx-5" />
              <div className="h-5 w-32 bg-white/[0.08] rounded mt-3 mx-5" />
              <div className="h-3 w-full bg-white/[0.04] rounded mt-4 mx-5" />
              <div className="h-3 w-4/5 bg-white/[0.04] rounded mt-2 mx-5" />
              <div className="h-3 w-3/5 bg-white/[0.04] rounded mt-2 mx-5" />
              <div className="flex gap-2 mt-6 mx-5">
                <div className="h-6 w-16 bg-white/[0.05] rounded-full" />
                <div className="h-6 w-20 bg-white/[0.05] rounded-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
