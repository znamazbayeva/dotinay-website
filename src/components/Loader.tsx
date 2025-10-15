"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(25px)",
        background: "rgba(240, 248, 255, 0.6)", // translucent blue-white
        WebkitBackdropFilter: "blur(25px)",
        overflow: "hidden",
      }}
    >
      {/* Subtle background halo */}
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(173, 216, 255, 0.4), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Rotating star */}
      <motion.div
        initial={{ rotate: 0, scale: 0.9 }}
        animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
        transition={{
          rotate: { repeat: Infinity, duration: 4, ease: "linear" },
          scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
        }}
        style={{
          width: 140,
          height: 140,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "drop-shadow(0 0 20px #A4D7FF) drop-shadow(0 0 40px #89CFF0)",
        }}
      >
        <Image
          src="/star.png"
          alt="Spinning Star"
          width={140}
          height={140}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
