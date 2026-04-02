import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import RoomExperience from "@/components/RoomExperience";
import SplashScreen from "@/components/SplashScreen";

const WALL_COUNT = 4;
const SCROLL_HEIGHT_VH = 800;

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen key="splash" onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Fixed navbar */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* The 3D room is fixed, scroll drives rotation */}
        <RoomExperience />

        {/* Scroll spacer - creates the scrollable area */}
        <div style={{ height: `${SCROLL_HEIGHT_VH}vh` }} />
      </motion.div>
    </>
  );
};

export default Index;
