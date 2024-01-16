/** @jsxImportSource @emotion/react */
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import DashboadWrapperComp from "../../nav_wrapper";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext, useEffect } from "react";
import facepaint from "facepaint";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const AmmendmentComp = () => {
  const [progress, setProgress] = useState({
    min: 0,
    max: 50,
  });
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
    data: factory,

    isLoading,
  } = useSWR(`${main_url}/state-officer/factory/ammendments`, fetcher);

  const {
    data: completed,

    isLoading: factory_isLoading,
  } = useSWR(
    `${main_url}/state-officer/factory/ammendments/completed`,
    fetcher
  );
  console.log(completed);
  const router = useRouter();
  const tabs = [
    {
      title: "Pending",
      route: "pending",
      state: () => {
        setProgress({
          min: 0,
          max: 50,
        });
      },
    },
    // {
    //   title: "Ongoing",
    //   route: "ongoing",
    //   state: () => {
    //     setProgress({
    //       min: 50,
    //       max: 60,
    //     });
    //   },
    // },
    {
      title: "Completed",
      route: "completed",
      state: () => {
        setProgress({
          min: 60,
          max: 101,
        });
      },
    },
  ];

  const table = [
    {
      title: "Occupier name",
    },
    {
      title: "State",
    },
    {
      title: "Reg. date",
    },
  ];

  function formatDateToCustom(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }
  useEffect(() => {
    router.push("?tab=pending");
  }, []);
  return (
    <DashboadWrapperComp>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          marginTop: [22, 22, 0],
          marginLeft: [22, 22, 0],
        }}
      >
        <div
          css={(theme) =>
            mq({
              color: theme.colors.Gray_700,
              fontSize: [16, 16, 32],
              lineHeight: "28px",
              fontWeight: 700,
            })
          }
        >
          Welcome, State officer
        </div>
        <div>
          <img
            css={mq({
              width: [14, 14, 34],
              height: [14, 14, 32],

              marginLeft: 8,
            })}
            src="/svg/state_admin_portal/waving_hand_sign.svg"
          />
        </div>
      </div>

      <div
        css={(theme) =>
          mq({
            marginTop: [0, 0, 82],
            border: [0, 0, `1px solid ${theme.colors.Gray_200}`],
            //   padding: "42px 66px",
            borderRadius: 8,
            width: "100%",
          })
        }
      >
        <div
          css={(theme) =>
            mq({
              marginTop: [28, 28, 62],
              border: "none",
              borderBottom: [0, 0, `1px solid ${theme.colors.Gray_200}`],
              padding: "0px 66px",
              paddingBottom: 16,
            })
          }
        >
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              rowGap: 0,
              columnGap: 64,
              width: "60%",
              height: "auto",
            }}
          >
            {tabs.map((tab) => (
              <div
                css={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  cursor: "pointer",
                }}
                key={tab.title}
                onClick={() => {
                  tab.state();
                  router.push(`?tab=${tab.route}`);
                }}
              >
                <div
                  css={(theme) =>
                    mq({
                      fontSize: [10, 10, 20],
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "center",
                      textAlign: "center",
                      color:
                        router.query.tab == `${tab.route}`
                          ? theme.colors.Primary_500
                          : theme.colors.Primary_50,
                    })
                  }
                >
                  {tab.title}
                </div>
                <div
                  css={{
                    position: "absolute",
                    bottom: -16,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    // width: "100%",
                  }}
                >
                  <div
                    css={(theme) => ({
                      display:
                        router.query.tab == `${tab.route}` ? "block" : "none",
                      height: 4,
                      width: 72,

                      borderRadius: "4px 4px 0px 0px",

                      backgroundColor: theme.colors.Primary_500,
                    })}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            {isLoading && factory_isLoading ? (
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                <div
                  css={{
                    width: 24,
                    height: 24,
                  }}
                >
                  <img src="/svg/loader/loader.svg" />
                </div>
              </div>
            ) : (
              <div>
                {router.query.tab === "completed" ? (
                  <div>
                    {completed?.data?.ammendments?.length >= 1 ? (
                      <div>
                        <div
                          css={{
                            marginTop: 32,
                            padding: "24px 40px",
                          }}
                        >
                          <div
                            css={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",

                              rowGap: 0,
                              columnGap: 64,
                            }}
                          >
                            {table.map((tab) => (
                              <div
                                css={(theme) =>
                                  mq({
                                    color: theme.colors.Gray_500,
                                    fontSize: [12, 12, 18],
                                    lineHeight: ["14px", "14px", "22px"],
                                    fontWeight: [600, 600, 400],
                                  })
                                }
                              >
                                {tab.title}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          {completed?.data?.ammendments?.map((factory) => (
                            <div
                              key={factory.factory._id}
                              css={(theme) => ({
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                cursor: "pointer",
                                rowGap: 0,
                                columnGap: 64,
                                borderBottom: `1px solid ${theme.colors.Gray_200}`,
                                padding: "24px 40px",
                              })}
                              onClick={() =>
                                router.push(
                                  `/factory/${factory.factory._id}?type=ammendment`
                                )
                              }
                            >
                              <div
                                css={(theme) =>
                                  mq({
                                    textAlign: "left",
                                    color: theme.colors.Gray_700,

                                    textTransform: "capitalize",

                                    fontSize: [12, 12, 18],
                                    lineHeight: ["14px", "14px", "22px"],
                                    fontWeight: [600, 600, 400],
                                  })
                                }
                              >
                                {factory.factory.occupier_name}
                              </div>
                              <div
                                css={(theme) =>
                                  mq({
                                    textAlign: "left",
                                    color: theme.colors.Gray_700,
                                    textTransform: "capitalize",
                                    fontSize: [12, 12, 18],
                                    lineHeight: ["14px", "14px", "22px"],
                                    fontWeight: [600, 600, 400],
                                  })
                                }
                              >
                                {factory.state}
                              </div>
                              <div
                                css={(theme) =>
                                  mq({
                                    textAlign: "left",
                                    color: theme.colors.Gray_700,
                                    fontSize: [12, 12, 18],
                                    lineHeight: ["14px", "14px", "22px"],
                                    fontWeight: [600, 600, 400],
                                  })
                                }
                              >
                                {formatDateToCustom(factory.createdAt)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          css={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {" "}
                          <div
                            css={{
                              margin: "50px 0px",
                            }}
                          >
                            <img
                              css={mq({
                                width: [50, 50, 100],
                                height: [50, 50, 100],
                              })}
                              src="/svg/dashboard/empty.svg"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {factory?.data?.ammendments?.length >= 1 ? (
                      <div>
                        <div
                          css={{
                            marginTop: 32,
                            padding: "24px 40px",
                          }}
                        >
                          <div
                            css={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",

                              rowGap: 0,
                              columnGap: 64,
                            }}
                          >
                            {table.map((tab) => (
                              <div
                                css={(theme) =>
                                  mq({
                                    color: theme.colors.Gray_500,
                                    fontSize: [12, 12, 18],
                                    lineHeight: ["14px", "14px", "22px"],
                                    fontWeight: [600, 600, 400],
                                  })
                                }
                              >
                                {tab.title}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          {factory?.data?.ammendments?.map((factory) => (
                            <div
                              key={factory._id}
                              css={(theme) => ({
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                cursor: "pointer",
                                rowGap: 0,
                                columnGap: 64,
                                borderBottom: `1px solid ${theme.colors.Gray_200}`,
                                padding: "24px 40px",
                              })}
                              onClick={() =>
                                router.push(
                                  `/factory/${factory.factory._id}?type=ammendment`
                                )
                              }
                            >
                              <div
                                css={(theme) =>
                                  mq({
                                    textAlign: "left",
                                    color: theme.colors.Gray_700,

                                    textTransform: "capitalize",

                                    fontSize: [12, 12, 18],
                                    lineHeight: ["14px", "14px", "22px"],
                                    fontWeight: [600, 600, 400],
                                  })
                                }
                              >
                                {factory.factory.occupier_name}
                              </div>
                              <div
                                css={(theme) =>
                                  mq({
                                    textAlign: "left",
                                    color: theme.colors.Gray_700,
                                    textTransform: "capitalize",
                                    fontSize: [12, 12, 18],
                                    lineHeight: ["14px", "14px", "22px"],
                                    fontWeight: [600, 600, 400],
                                  })
                                }
                              >
                                {factory.state}
                              </div>
                              <div
                                css={(theme) =>
                                  mq({
                                    textAlign: "left",
                                    color: theme.colors.Gray_700,
                                    fontSize: [12, 12, 18],
                                    lineHeight: ["14px", "14px", "22px"],
                                    fontWeight: [600, 600, 400],
                                  })
                                }
                              >
                                {formatDateToCustom(factory.createdAt)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          css={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {" "}
                          <div
                            css={{
                              margin: "50px 0px",
                            }}
                          >
                            <img
                              css={mq({
                                width: [50, 50, 100],
                                height: [50, 50, 100],
                              })}
                              src="/svg/dashboard/empty.svg"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboadWrapperComp>
  );
};

export default AmmendmentComp;
