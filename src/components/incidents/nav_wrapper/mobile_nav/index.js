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
  const auth = useContext(AuthContext);
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
                      padding: "24px 44px",
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
                      <div
                        css={(theme) => ({
                          fontSize: 12,
                          fontWeight: 500,
                          color: theme.colors.Gray_500,
                        })}
                      >
                        John Doe
                      </div>
                      <div
                        css={(theme) => ({
                          fontSize: 10,
                          fontWeight: 500,
                          color: theme.colors.Gray_500,
                          lineHeight: "18px",
                        })}
                      >
                        jogndoe@gmail.com
                      </div>
                    </div>
                  </div>

                  {menu.map((menu_option) => (
                    <div
                      css={{
                        padding: "24px 44px",
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
