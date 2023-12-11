// @import dependencies
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// @import files
import constants from "../../json/constants.json";

const SidebarDrawer = ({ open, close }) => {
  //   const [open, cycleOpen] = useCycle(false, true);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed left-[20%] z-10 inset-0" onClick={close}>
          <div className="sidebar-drawer">
            <motion.aside
              initial={{ width: 0 }}
              animate={{
                width: 250,
              }}
              exit={{
                width: 0,
                transition: { delay: 0, duration: 0.1 },
              }}
            >
              <div
                className={`fixed-sidebar-button cursor-pointer ${
                  location?.pathname === constants.NAVIGATEHOME
                    ? "bg-white text-[#242424]"
                    : "text-[#ffffff] hover:bg-[#999999] hover:opacity-80 hover:text-[#242424]"
                } `}
                onClick={() => navigate(constants.NAVIGATEHOME)}
              >
                <img className="h-7 w-7" src="/assets/png/briefcase.png" />
                <h5 className="text-lg">{constants.DASHBOARD}</h5>
              </div>
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SidebarDrawer;
