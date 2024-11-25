import { motion, stagger, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { setCursor, setShowMenu } from "../redux/myslice";
import { AppDispatch, RootState } from "../store";
import { cn } from "../utils/cn";

const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/about",
    label: "About",
  },
  {
    path: "/projectsandskills",
    label: "Projects & Skills",
  },
  {
    path: "/contact",
    label: "Contact",
  },
];

const Nav = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showMenu } = useSelector((state: RootState) => state.sliceOne);
  const { pathname } = useLocation();
  const ulRef = useRef<HTMLUListElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickHandler = async (e: MouseEvent) => {
      if (!ulRef.current?.contains(e.target as Node) && showMenu) {
        await animate(
          "#mynav > li",
          { y: [0, -100], opacity: [1, 0] },
          { duration: 1, type: "spring", delay: stagger(0.2) }
        );
        dispatch(setShowMenu(false));
      }
    };
    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [dispatch, showMenu]);

  const showMenuHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (showMenu) {
      await animate(
        "#mynav > li",
        { y: [0, -100], opacity: [1, 0] },
        { duration: 1.3, type: "spring", delay: stagger(0.3) }
      );
      dispatch(setShowMenu(false));
      return;
    }
    dispatch(setShowMenu(true));

    animate(
      "#mynav > li",
      { y: [-100, 0], opacity: [0, 1] },
      { duration: 1.4, type: "spring", delay: stagger(0.3) }
    );
    return;
  };
  return (
    <>
      <AnimatePresence>
        <nav
          className={cn(
            "flex justify-between items-center rounded-full pl-[2%] pr-[10%] shadow-md selection:bg-red-400 selection:text-white fixed top-0 left-0 right-0 z-40"
          )}
        >
          <motion.div
            className="rounded-full"
            onHoverStart={() => dispatch(setCursor(false))}
            onHoverEnd={() => dispatch(setCursor(true))}
          >
            <motion.img
              src={"/images/logoFive-removebg-preview.png"}
              alt="logo"
              className={cn(" h-14 md:h-20 cursor-pointer")}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [0.8, 0.5, 1, 1.3, 1] }}
              transition={{ duration: 2, type: "spring", repeat: Infinity }}
            />
          </motion.div>
          <motion.ul
            id="mynav"
            className={cn(
              " hidden z-10 md:z-0 fixed top-10 right-0 md:static md:flex justify-between gap-10 ",
              {
                "flex flex-col opacity-100 md:flex-row  z-20 mr-4": showMenu,
              }
            )}
            ref={ulRef}
            layout="preserve-aspect"
          >
            {routes.map((route, index) => {
              return (
                <motion.li
                  key={route.path}
                  className={cn(
                    "flex items-center justify-center overflow-hidden  h-[3rem]  w-[5rem] relative md:bg-transparent  group cursor-pointer",
                    { "w-[10rem]": index === 2 }
                  )}
                  onMouseOver={() => dispatch(setCursor(false))}
                  onMouseOut={() => dispatch(setCursor(true))}
                  // whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                  variants={{
                    initial: { y: -100, opacity: 0 },
                    animate: (index: number) => ({
                      y: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.2 * index,
                      },
                    }),
                  }}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  transition={{ type: "spring" }}
                >
                  <NavLink
                    to={route.path}
                    className={({ isActive }) => {
                      return cn(
                        "text-zinc-500 grid place-content-center font-semibold font-['Nunito_Sans'] text-lg group-hover:text-red-700 !mix-blend-difference p-1 md:p-2 h-full w-full text-center",
                        {
                          "font-extrabold text-zinc-800": isActive,
                        },

                        {
                          "text-white ": pathname === "/" && isActive,
                        }
                      );
                    }}
                  >
                    {route.label}
                  </NavLink>
                  {/* route indicator */}
                  {pathname === route.path && (
                    <motion.span
                      className={cn(
                        "absolute hidden md:block w-full h-1 bg-red-500 bottom-0 rounded "
                      )}
                      layoutId="routeIndicator"
                    ></motion.span>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
          {/* menu icon */}
          <motion.div
            className={cn(
              "grid grid-cols-2 grid-rows-2 md:hidden gap-1  p-2 rounded-full group border-2 border-red-500 hover:bg-red-500 z-[999] cursor-pointer transition-colors duration-500"
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{
              scale: 0.8,
              rotate: showMenu ? -180 : 180,
              transition: { duration: 0.5 },
            }}
            onHoverStart={() => dispatch(setCursor(false))}
            onHoverEnd={() => dispatch(setCursor(true))}
            transition={{ type: "spring" }}
            onClick={showMenuHandler}
            ref={iconRef}
          >
            {[1, 2, 3, 4].map((item) => {
              return (
                <motion.span
                  className={cn(
                    "h-2 w-2  bg-red-500 rounded-full flex-none cursor-pointer group-hover:bg-white "
                  )}
                  key={item}
                  variants={{
                    initial: { scale: 0 },
                    pop: {
                      scale: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                      },
                    },
                  }}
                  initial="initial"
                  animate="pop"
                />
              );
            })}
          </motion.div>
        </nav>
      </AnimatePresence>
    </>
  );
};

export default Nav;
