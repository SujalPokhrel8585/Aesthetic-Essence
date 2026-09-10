import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "motion/react";

/* ---------------------------------------------------------------
 *    Message, fades in once the circle wipe has mostly landed
 * ------------------------------------------------------------- */
export function MessageDisplay() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const fade: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : 1.2,
      },
    },
  };

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="show"
      className="pointer-events-none absolute z-[100] flex h-[90%] w-[90%] flex-col items-center justify-center"
    >
      <div className="m-[1%] text-[35px] font-semibold text-white">
        Page Not Found
      </div>
      <div className="m-[1%] text-[80px] font-bold text-white">404</div>
      <div className="m-[1%] w-1/2 min-w-[40%] text-center text-[15px] text-white">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </div>
      <div className="pointer-events-auto mt-8 flex gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(-1)}
          className="flex h-auto items-center gap-2 border-2 border-white px-6 py-2 text-base font-medium text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          <ArrowLeft size={20} />
          Go Back
        </motion.button>

        <Link to="/">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex h-auto items-center gap-2 bg-white px-6 py-2 text-base font-medium text-black transition-all duration-300 ease-in-out hover:bg-gray-200"
          >
            <Home size={20} />
            Go Home
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}
