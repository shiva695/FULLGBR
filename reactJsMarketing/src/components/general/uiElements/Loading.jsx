import React, { useState } from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  return (
    <div className="h-[100vh]">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        whileInView="visible"
        //   viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 5, ease: "easeOut" }}
        exit={{ opacity: 1 }}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{ overflow: isAnimating ? "hidden" : "auto" }}
        //   variants={{
        //     hidden: { opacity: 0, x: 0 },
        //     visible: { opacity: 1, x: 0 },
        //   }}
        className="relative overflow-hidden overflow-x-hidden overflow-y-hidden"
      >
        <div className="h-[100vh] bg-[#1c1c1c] overflow-hidden overflow-y-hidden  overflow-x-hidden flex items-center justify-center text-center"></div>
      </motion.div>
      <p className="fixed text-3xl z-10 inset-0 flex justify-center items-center text-white">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
