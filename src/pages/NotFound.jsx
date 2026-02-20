import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow Animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-brand-red/20 blur-[120px] rounded-full"
      />

      <div className="relative z-10 text-center max-w-2xl">
        {/* Animated 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[90px] md:text-[160px] font-black leading-none text-brand-red"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold mb-4"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-8 text-sm md:text-base"
        >
          Looks like you got lost in the arena. The page you’re looking for
          doesn’t exist or has been moved.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/"
            className="inline-block bg-brand-red px-6 py-3 rounded-lg font-bold uppercase tracking-wide hover:scale-105 transition-transform"
          >
            Back To Home
          </Link>
        </motion.div>

        {/* Floating dots animation */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-10 text-gray-600 text-sm"
        >
          ⚡ RBX ESPORTS SYSTEM ERROR
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
