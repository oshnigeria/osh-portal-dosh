/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React, { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import facepaint from "facepaint";
import { AuthContext } from "@/src/context/authContext";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const MobileNav = () => {
  const [options, setOptions] = useState(false);
   const router = useRouter();
     const [show_lifting_menu, setShowLiftingMenu] = useState(false);
  const auth = useContext(AuthContext);

  const handleToggleLiftingMenu = () => {
    setShowLiftingMenu(!show_lifting_menu)
   }

     const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09, // controls delay between items
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};
  const menu = [
    {
      title: "Settings",
      icon: "setting.svg",
      click: () => {
        router.push("/settings");
        setOptions(false);
      },
    },
    {
      title: "Log out",
      icon: "logout.svg",
      click: () => {
        auth.remove_token();
      },
    },
  ];

   const tabs = [
      {
        title: "New Registration",
        route: "/",
        path: "",
        icon: "register",
        active_icon: "register_active",
      },
      {
        title: "Renewal",
        route: "/renewal",
        path: "renewal",
        icon: "renewal",
        active_icon: "renewal_active",
      },
      {
        title: "Amendment",
        route: "/amendment",
        path: "amendment",
        icon: "ammendments",
        active_icon: "ammendments_active",
      },
      {
        title: "Replacement",
        route: "/replacement",
        path: "replacement",
        icon: "replacement",
        active_icon: "replacement_active",
      },
      {
        title: "Incident",
        route: "/incident",
        path: "incident",
        icon: "incident",
        active_icon: "incident_active",
      },
      {
        title: "Routine inspection",
        route: "routine-inspections",
        path: "routine-inspections",
        icon: "incident",
        active_icon: "incident_active",
      },
      {
        title: "Settings",
        route: "/settings",
        path: "settings",
        icon: "settings",
        active_icon: "settings_active",
      },
      {
        title: "State reports",
        route: "/analytics/state-reports",
        path: "analytics/state-reports",
        icon: "incident",
        active_icon: "incident_active",
      },
      {
        title: "System Analytics",
        route: "/analytics/system-analytics",
        path: "analytics/system-analytics",
        icon: "incident",
        active_icon: "incident_active",
      },
    ];
  
    const lifting_tabs = [
    
      {
        title: "Certificate of Competency",
        route: "/lifting-certification/competency",
        path: "lifting-certification/competency",
       icon: "incident",
        active_icon: "incident_active",
      },
        {
        title: "Certificate of Authorization",
        route: "/lifting-certification/authorization",
        path: "lifting-certification/authorization",
       icon: "incident",
        active_icon: "incident_active",
      },
      {
        title: "Equipment Registration Licence",
        route: "/lifting-certification/equipment_registration",
        path: "lifting-certification/equipment_registration",
        icon: "incident",
        active_icon: "incident_active",
      },
     
    ];
  
  
    useEffect(() => {
    if (
      router.pathname === "/lifting-certification/competency" ||
      router.pathname === "/lifting-certification/authorization" ||
      router.pathname === "/lifting-certification/equipment_registration"
    ) {
      setShowLiftingMenu(true);
    } else {
      setShowLiftingMenu(false);
    }
  }, [router.pathname]);
  
  return (
    <div
      css={(theme) =>
        mq({
          backgroundColor: theme.colors.Primary_500,
          padding: ["16px 16px", "16px 16px", "40px 140px"],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        })
      }
    >
      <div
      // css={mq({
      //   display: ["none", "block", "block"],
      // })}
      >
        <img
          css={mq({
            width: ["auto", "auto", 266],
            height: [32, 40, 50],
          })}
          src={"/svg/auth/logo_white.svg"}
        />
      </div>
      {/* <div
          css={mq({
            display: ["block", "none", "none"],
            marginTop: 56,
          })}
        >
          <img
            css={{
              width: "auto",
              height: 40,
            }}
            src={"/auth/fmle_logo_black.png"}
          />
        </div> */}
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img
            css={mq({
              width: 24,
              height: 24,
            })}
            src={"/svg/nav/notification.svg"}
          />
        </div>
        <div
          css={{
            marginLeft: 24,
            position: "relative",
          }}
        >
          <div
            css={{
              cursor: "pointer",
            }}
            onClick={() => setOptions(!options)}
          >
            <img
              css={mq({
                width: 24,
                height: 24,
              })}
              src={"/svg/nav/menu.svg"}
            />
          </div>

          <AnimatePresence initial={false}>
            {options && (
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                    // duration: 0.4,
                  }}
                  id="location"
                  css={(theme) => ({
                    position: "absolute",
                    borderRadius: 8,

                    width: 206,
                    height: "auto",
                    boxShadow:
                      "0px 0px 0px 0px rgba(107, 133, 127, 0.20), 0px 0px 1px 0px rgba(107, 133, 127, 0.19), 2px 2px 3px 0px rgba(107, 133, 127, 0.17), 4px 4px 4px 0px rgba(107, 133, 127, 0.10), 7px 8px 4px 0px rgba(107, 133, 127, 0.03), 12px 12px 5px 0px rgba(107, 133, 127, 0.00)",
                    zIndex: 50,

                    right: 0,
                    top: 30,

                    margin: "auto",

                    backgroundColor: "#fff",
                  })}
                >
                  <div
                    css={{
                       padding: "16px 16px",
                      cursor: "pointer",
                      display: "flex",
                    }}
                    // onClick={() => auth.remove_token()}
                  >
                    <div
                      css={{
                        marginRight: 4,
                      }}
                    >
                      <img
                        css={mq({
                          width: 36,
                          height: 36,
                        })}
                        src={"/svg/nav/profile.svg"}
                      />
                    </div>
                    <div>
                      {/* <div
                        css={(theme) => ({
                          fontSize: 12,
                          fontWeight: 500,
                          color: theme.colors.Gray_500,
                        })}
                      >
                        John Doe
                      </div> */}
                       <div
                        css={(theme) => ({
                          fontSize: 12,
                          fontWeight: 500,
                          color: theme.colors.Gray_500,
                          lineHeight: "18px",
                           overflowWrap: "break-word",
    wordBreak: "break-word",
                        })}
                      >
                       {auth.dec_token?.email}
                      </div>
                    </div>
                  </div>

                    {
                    tabs.map((menu_items, index) => (
                        <div
                        key={{index}}
                      css={{
                        padding: "16px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        border:"none",
                        borderBottom:"1px solid #f5f5f5"
                      }}
                      onClick={() => router.push(`/${menu_items.path}`)}
                    >
                      
                      <div css={(theme) => ({
                    color:
                      router.pathname == `/${menu_items.path}`
                        ? theme.colors.Primary_500
                        : theme.colors.Gray_900,
                    fontWeight: router.pathname == `/${menu_items.path}` ? 600 : 500,
                    fontSize: 16,
                    textTransform: "capitalize",
                  })}> {menu_items.title}</div>
                    </div>
                    ))
                  }

                  <div>
                  <div>
              <div css={{
                 padding: "16px 16px",
                 display:"flex",
                 justifyContent:"space-between"
              }}>
              <div  css={(theme) => ({
                   
                  })}>
              LAWE & BPV certification
              </div>
               <div onClick={() => handleToggleLiftingMenu()}>
            <motion.img
            animate={{
      rotate: show_lifting_menu ? 180 : 0, // flips up when open
    }}
    transition={{
      duration: 0.25,
      ease: "easeInOut",
    }}
              css={{
                width: 24,
                height: 24,
              }}
              src="/svg/nav/drop_down_arrow_black.svg"
            />
          </div>
              </div>
            </div>
<AnimatePresence>
  {show_lifting_menu && (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
            {lifting_tabs.map((tab) => (
              <motion.div
               key={tab.path}
          variants={itemVariants}
                css={{
                  
 padding: "16px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        border:"none",
                        borderBottom:"1px solid #f5f5f5"
                 
                }}
                onClick={() => router.push(`/${tab.path}`)}
              >
                <div
                  css={(theme) => ({
                    color:
                      router.pathname == `/${tab.path}`
                        ? theme.colors.Primary_500
                        : theme.colors.Gray_900,
                    fontWeight: router.pathname == `/${tab.path}` ? 600 : 500,
                    fontSize: 16,
                    textTransform: "capitalize",
                  })}
                >
                  {tab.title}
                </div>
              </motion.div>
            ))}</motion.div>)}
            </AnimatePresence></div>

                  {menu.map((menu_option) => (
                    <div
                      css={{
                       padding: "16px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => menu_option.click()}
                    >
                      <div
                        css={{
                          marginRight: 24,
                        }}
                      >
                        <img
                          css={mq({
                            width: 24,
                            height: 24,
                          })}
                          src={`/svg/nav/${menu_option.icon}`}
                        />
                      </div>
                      <div> {menu_option.title}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
