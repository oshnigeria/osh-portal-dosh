/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { main_url, cookies_id } from "@/src/details";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
import AddUserComp from "../manage_account_popup";
const AccountComp = () => {
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
      route: "pending",
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
      route: "completed",
      state: () => {
        setProgress({
          min: 95,
          max: 101,
        });
      },
    },
  ];
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div>
        <div
          css={mq({
            marginTop: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: ["0px 16px", "0px 16px", 0],
          })}
        >
          <div
            css={mq({
              display: ["none", "none", "flex"],
            })}
          >
            <div
              css={{
                position: "relative",
              }}
            >
              <input
                css={(theme) => ({
                  padding: "16px 16px",
                  paddingLeft: 42,
                  marginRight: 32,
                  width: 252,
                  fontSize: 16,
                  color: theme.colors.Primary_500,
                  backgroundColor: "transparent",
                  outline: "none",
                  borderRadius: 30,
                  border: `1px solid ${theme.colors.Primary_500}`,
                  ":focus": {
                    padding: "16px 16px",
                    paddingLeft: 42,

                    border: `1px solid ${theme.colors.Primary_500}`,

                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    padding: "16px 16px",
                    paddingLeft: 42,
                    border: "none",
                    border: `1px solid ${theme.colors.Primary_500}`,

                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Search files"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <img
                css={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  width: 24,
                  height: 24,
                }}
                src="/svg/dashboard/search.svg"
              />
            </div>
          </div>

          <div
            css={(theme) =>
              mq({
                border: `1px solid ${theme.colors.Primary_500}`,

                width: 38,
                height: 38,
                display: ["flex", "flex", "none"],
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
              })
            }
          >
            {" "}
            <img
              css={{
                width: 24,
                height: 24,
              }}
              src="/svg/dashboard/search.svg"
            />
          </div>
          <button
            css={(theme) =>
              mq({
                width: [174, 174,224],
                height: [40, 40, 56],
                borderRadius: 30,
                padding: ["12px 16px", "12px 16px", "16px 24px"],

                fontSize: [12, 12, 16],
                fontWeight: 600,
                lineHeight: "17px",
                border: "none",
                color: theme.colors.Gray_50,
                backgroundColor: theme.colors.Primary_500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              })
            }
            onClick={() => {
              setWillAmmend(true);
              // router.push("/dashboard/account?tab=a");
            }}
          >
            <img
              css={{
                width: 24,
                height: 24,
                marginRight: 16,
              }}
              src="/svg/dashboard/plus.svg"
            />
            <div> Add new account</div>
          </button>
        </div>
        <div
          css={{
            marginTop: 40,
          }}
        >
          {isLoading ? (
            <div
              css={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <div
                css={{
                  width: 64,
                  height: 64,
                  margin: "50px 0px",
                }}
              >
                <img src="/svg/loader/loader-green.svg" />
              </div>
            </div>
          ) : (
            <div css={{}}>
              {users?.data?.users?.state_officers
                ?.filter((item) => item.email.toLowerCase().includes(search))
                .map((factory) => (
                  <div
                    key={factory._id}
                    css={(theme) =>
                      mq({
                        display:["grid","grid", "grid"],
                        backgroundColor: "#fff",
                       
                        marginBottom: 24,
                        padding: ["16px 16px", "16px 16px","24px 24px"],
                        borderRadius: 16,
                        borderRadius: 16,
                        gridTemplateColumns: "repeat(3, 1fr)",

                        justifyContent: "space-between",
                        rowGap: 0,
                        columnGap: 0,
                        width: "100%",
                        height: "auto",
                        color: theme.colors.Gray_800,
                        fontSize: 18,
                        cursor: "pointer",
                        fontWeight: 500,
                        lineHeight: "22px",
                      })
                    }
                    onClick={() => {
                      router.push(
                        `/settings/user/${factory._id}?type=state_officer`
                      );
                    }}
                  >
                    <div
                      css={(theme) =>
                        mq({
                          fontSize: [12, 12, 16],
                          fontWeight: theme.font_weight.size_500,
                          color: theme.colors.Gray_800,
                          textTransform: "capitalize",
                        })
                      }
                    >
                      {factory.email}
                    </div>
                    <div
                      css={(theme) => ({
                        display: "flex",
                        justifyContent: "center",
                      })}
                    >
                      <div
                        css={(theme) =>
                          mq({
                            textAlign: "center",
                            fontSize: [12, 12, 16],
                            fontWeight: 500,
                            color: theme.colors.Primary_500,
                            backgroundColor: theme.colors.Primary_50,
                            borderRadius: 8,
                            padding: "4px 12px",
                          })
                        }
                      >
                        {" "}
                        State officer
                      </div>
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          display: ["none", "none", "block"],
                          color: factory.is_disabled
                            ? theme.colors.Primary_500
                            : theme.colors.Error_500,
                          fontSize: [12, 12, 16],
                          fontWeight: 500,
                          fontWeight: theme.font_weight.size_500,
                          lineHeight: "24px",
                          cursor: "pointer",
                          textAlign: "right",
                        })
                      }
                      // onClick={() => {
                      //   setDisable_account(true);
                      //   setEmail(factory.email);
                      //   setStatus(factory.is_disabled);
                      // }}
                    >
                      {factory.is_disabled
                        ? "Enable account"
                        : "Disable account"}
                    </div>

                    <div
                     css={mq({
                        display: ["flex", "flex", "none"],
                        justifyContent:"center",
                        width:"100%",
                       
                       
                      })}
                    >
                      <img
                        css={{
                          width: 16,
                          height: 16,
                        }}
                        src="/svg/settings/delete.svg"
                      />
                    </div>
                  </div>
                ))}

              {users?.data?.users?.zonal_officers
                ?.filter((item) => item.email.toLowerCase().includes(search))
                .map((factory) => (
                  <div
                    key={factory._id}
                    css={(theme) =>
                      mq({
                        display: "grid",
                        backgroundColor: "#fff",
                        marginBottom: 24,
                        padding: "24px 24px",
                        borderRadius: 16,
                        borderRadius: 16,
                        gridTemplateColumns: "repeat(3, 1fr)",

                        justifyContent: "space-between",
                        rowGap: 0,
                        columnGap: 0,
                        width: "100%",
                        height: "auto",
                        color: theme.colors.Gray_800,
                        fontSize: 18,
                        cursor: "pointer",
                        fontWeight: 500,
                        lineHeight: "22px",
                      })
                    }
                    onClick={() => {
                      router.push(
                        `/settings/user/${factory._id}?type=zonal_officer`
                      );
                    }}
                  >
                    <div
                      css={(theme) =>
                        mq({
                          fontSize: [12, 12, 16],
                          fontWeight: theme.font_weight.size_500,
                          color: theme.colors.Gray_800,
                          textTransform: "capitalize",
                        })
                      }
                    >
                      {factory.email}
                    </div>
                    <div
                      css={(theme) => ({
                        display: "flex",
                        justifyContent: "center",
                      })}
                    >
                      <div
                        css={(theme) =>
                          mq({
                            textAlign: "center",
                            fontSize: [12, 12, 16],
                            fontWeight: 500,
                            color: theme.colors.Primary_500,
                            backgroundColor: theme.colors.Primary_50,
                            borderRadius: 8,
                            padding: "4px 12px",
                          })
                        }
                      >
                        {" "}
                        Zonal officer
                      </div>
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          display: ["none", "none", "block"],
                          textAlign: "right",
                          fontSize: [12, 12, 16],
                          fontWeight: 500,
                          color: theme.colors.Error_500,
                        })
                      }
                    >
                      Disable account
                    </div>
                    <div
                      css={mq({
                        display: ["flex", "flex", "none"],
                        justifyContent:"center",
                        width:"100%",
                       
                       
                      })}
                    >
                      <img
                        css={{
                          width: 16,
                          height: 16,
                        }}
                        src="/svg/settings/delete.svg"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
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
    </div>
  );
};

export default AccountComp;
