/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { main_url, cookies_id } from "@/src/details";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import DashboadWrapperComp from "../dosh_admin_portal/nav_wrapper";
import AccountComp from "./comps/accounts";
import AddUserComp from "./manage_account_popup";
import CertificateComp from "./comps/certificate";

import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const SettingsComp = () => {
  const [add_factory, setAdd_factory] = useState(false);
  const [search, setSearch] = useState("");
  const [willAmmend, setWillAmmend] = useState(false);

  const router = useRouter();
  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get(cookies_id)}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error:", error);
      });

  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/account/users`, fetcher);

  console.log(users);
  function formatDateToCustom(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  // console.log(
  //   factory.data.factories.filter(
  //     (item) => item.occupier_name.toLowerCase() === search.toLowerCase()
  //   )
  // );
  const tabs = [
    {
      title: "Account settings",
      route: "account",
      state: () => {
        setProgress({
          min: 90,
          max: 94,
        });
      },
    },
    // {
    //   title: "Ongoing",
    //   route: "ongoing",
    //   state: () => {
    //     setProgress({
    //       min: 70,
    //       max: 79,
    //     });
    //   },
    // },
    {
      title: "Certificate settings",
      route: "certificate",
      state: () => {
        setProgress({
          min: 95,
          max: 101,
        });
      },
    },
  ];

  useEffect(() => {
    router.push("?tab=account");
  }, []);
  return (
    <DashboadWrapperComp>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <div>
        <div
          css={mq({
            display: "flex",
            // justifyContent: "right",
            marginTop: [32, 32, 72],
            width: ["100%", "100%", "50%"],
          })}
        >
          {tabs.map((tab) => (
            <div
              key={tab.title}
              css={{
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`?tab=${tab.route}`);
              }}
            >
              <div
                css={(theme) =>
                  mq({
                    color:
                      router.query.tab === tab.route
                        ? theme.colors.Primary_500
                        : theme.colors.Gray_800,
                    fontSize: [12, 12, 20],
                    fontWeight: 600,

                    textAlign: "center",
                  })
                }
              >
                {tab.title}
              </div>
              <div
                css={{
                  // position: "absolute",
                  // bottom: -16,
                  // left: 0,
                  // right: 0,
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  css={(theme) => ({
                    display: "block",
                    height: 4,
                    width: 72,
                    marginTop: 8,
                    borderRadius: "4px 4px 0px 0px",

                    backgroundColor: theme.colors.Primary_500,
                  })}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {router.query.tab === "account" && <AccountComp />}
          {router.query.tab === "certificate" && <CertificateComp />}
        </div>

        <AnimatePresence initial={false}>
          {willAmmend && (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.4,
                }}
                css={{
                  position: "fixed",
                  width: "100vw",
                  height: "100vh",
                  // zIndex: 2,
                  zIndex: 3,
                  backgroundColor: "rgb(0,0,0,0.1)",
                  right: 0,
                  top: 0,
                  opacity: 0,
                }}
                onClick={() => {
                  setAdd_factory(false);
                  router.push("/dashboard/account");
                }}
              >
                {" "}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  ease: "easeInOut",
                  // duration: 0.4,
                }}
                id="location"
                css={(theme) => ({
                  position: "fixed",
                  overflowY: "scroll",
                  overflowX: "hidden",

                  width: 525,
                  height: 600,
                  borderRadius: 14,
                  zIndex: 5,
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  margin: "auto",
                  // display: "flex",
                  // justifyContent: "center",
                  backgroundColor: "#fff",
                })}
              >
                {/* <CreateRiderAccount close={() => router.back()} /> */}
                <AddUserComp close={() => setWillAmmend(false)} />
                {/* <div>ade</div> */}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboadWrapperComp>
  );
};

export default SettingsComp;
