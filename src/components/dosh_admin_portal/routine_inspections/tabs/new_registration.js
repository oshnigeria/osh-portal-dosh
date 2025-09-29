/** @jsxImportSource @emotion/react */
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";

import DashboadWrapperComp from "../../nav_wrapper";
import { main_url, cookies_id } from "@/src/details";
import facepaint from "facepaint";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const NewRegistrationComp = () => {
  const [progress, setProgress] = useState({
    min: 0,
    max: 50,
  });
  const [search, setSearch] = useState("");

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

  const { data: routine_checks, isLoading } = useSWR(
    `${main_url}/dosh/routine-check`,
    fetcher
  );
  const router = useRouter();
  console.log(routine_checks);
  console.log(router.query.tab);
  const tabs = [
    {
      title: "Pending",
      route: "pending",
      state: () => {
        setProgress({
          min: 70,
          max: 90,
        });
      },
    },
    {
      title: "Ongoing",
      route: "ongoing",
      state: () => {
        setProgress({
          min: 71,
          max: 80,
        });
      },
    },
    {
      title: "Completed",
      route: "completed",
      state: () => {
        setProgress({
          min: 91,
          max: 100,
        });
      },
    },
  ];
  useEffect(() => {
    router.push("?tab=pending");
  }, []);
  const table = [
    {
      title: "Occupier name",
    },
    {
      title: "State",
    },
    {
      title: "Date Issued",
    },
    {
      title: "Status",
    },
  ];

  function getStatusColors(status) {
    const colors = {
      pending: {
        backgroundColor: "#FEF0C7",
        fontColor: "#DC6803",
      },
      completed: {
        backgroundColor: "#D1E5DD",
        fontColor: "#166854",
      },
      cancelled: {
        backgroundColor: "#F1D4CB",
        fontColor: "#FE5B4E",
      },
    };

    return colors[status] || null;
  }
  function formatDateToCustom(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }
  return (
    <DashboadWrapperComp>
      <div
        css={mq({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: [22, 22, 0],
          marginLeft: [22, 22, 0],
        })}
      >
        <div
          css={{
            display: "flex",

            alignItems: "center",
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
            Welcome, Director
          </div>
          <div>
            <img
              css={mq({
                width: [14, 14, 34],
                height: [14, 14, 32],

                marginLeft: 8,
              })}
              src="/svg/factory/waving_hand_sign.svg"
            />
          </div>
        </div>
        <div>
          <img
            css={mq({
              width: [14, 14, 34],
              height: [14, 14, 32],

              marginLeft: 8,
            })}
            src="/svg/dashboard/combined_space.svg"
          />
        </div>
      </div>
      <div
        css={mq({
          marginTop: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: ["16px 24px", "16px 24px", 0],
        })}
      >
        <div
          css={{
            display: "flex",
          }}
        >
          <div
            css={mq({
              width: 38,
              height: 38,
              border: "1px solid #1A7D65",
              borderRadius: 12,
              display: ["flex", "flex", "none"],
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <img
              css={{
                width: 16,
                height: 16,
              }}
              src="/svg/dashboard/search.svg"
            />
          </div>
          <div
            css={mq({
              width: 38,
              height: 38,
              border: "1px solid #1A7D65",
              borderRadius: 12,
              display: ["flex", "flex", "none"],
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            })}
          >
            <img
              css={{
                width: 16,
                height: 16,
              }}
              src="/svg/dashboard/filter.svg"
            />
          </div>
          <div
            css={mq({
              position: "relative",
              display: ["none", "none", "block"],
            })}
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
        {/* <button
          css={(theme) =>
            mq({
              width: 200,
              height: 56,
              borderRadius: 30,
              padding: ["16px 22px", "16px 22px", "16px 24px"],
              fontSize: [14, 14, 14],
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
            router.push("/create-inspection-report");
          }}
        >
          <img
            css={{
              width: 24,
              height: 24,
              marginRight: 16,
            }}
            src="/svg/factory/add.svg"
          />
          <div>New Report</div>
        </button> */}
      </div>

      {/* <div
        css={mq({
          display: "flex",
          justifyContent: "right",
          marginTop: [0, 0, 58],
        })}
      >
        <button
          css={(theme) =>
            mq({
              width: 200,
              height: 56,
              borderRadius: 30,
              padding: ["16px 22px", "16px 22px", "16px 24px"],
              fontSize: [14, 14, 14],
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
            router.push("/create-inspection-report");
          }}
        >
          <img
            css={{
              width: 24,
              height: 24,
              marginRight: 16,
            }}
            src="/svg/factory/add.svg"
          />
          <div>Add New Report</div>
        </button>
      </div> */}

      <div
        css={(theme) =>
          mq({
            marginTop: [0, 0, 20],
            border: [0, 0, `1px solid ${theme.colors.Gray_200}`],
            //   padding: "42px 66px",
            borderRadius: 8,
            width: "100%",
          })
        }
      >
        {/* <div
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
        </div> */}
        <div>
          <div>
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
                    width: 24,
                    height: 24,
                  }}
                >
                  <img src="/svg/loader/loader.svg" />
                </div>
              </div>
            ) : (
              <div>
                {routine_checks?.data?.reports.length >= 1 ? (
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
                          gridTemplateColumns: `repeat(${table.length}, 1fr)`,

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
                      {routine_checks?.data?.reports
                        ?.filter((item) =>
                          item.factory_name.toLowerCase().includes(search)
                        )
                        .map((factory) => (
                          <div
                            key={factory._id}
                            css={(theme) => ({
                              display: "grid",
                              gridTemplateColumns: `repeat(${table.length}, 1fr)`,
                              cursor: "pointer",
                              rowGap: 0,
                              columnGap: 64,
                              borderBottom: `1px solid ${theme.colors.Gray_200}`,
                              padding: "24px 40px",
                            })}
                            onClick={() =>
                              router.push(`/routine_inspection/${factory._id}`)
                            }
                          >
                            <div>
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
                              {factory.factory_name}
                            </div>
                             <div css={(theme) =>
                                mq({
                                  marginTop:4,
                                  textAlign: "left",
                                  color: theme.colors.Primary_500,

                                  textTransform: "capitalize",

                                  fontSize: [10, 10, 12],
                                 
                                  fontWeight: [600, 600, 600],
                                })
                              }> 
                              ({factory.letter_type})
                            </div>
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
                              {formatDateToCustom(factory.inspection_date)}
                            </div>
                            <div
                              css={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                css={(theme) =>
                                  mq({
                                    textAlign: "left",
                                    color: getStatusColors(factory.status)
                                      .fontColor,
                                    textTransform: "capitalize",
                                    fontSize: [10, 10, 10],
                                    lineHeight: ["14px", "14px", "22px"],
                                    padding: "4px 30px",
                                    fontWeight: [600, 600, 600],
                                    backgroundColor: getStatusColors(
                                      factory.status
                                    ).backgroundColor,
                                    borderRadius: 8,
                                  })
                                }
                              >
                                {factory.status}
                              </div>
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
        </div>
      </div>
    </DashboadWrapperComp>
  );
};

export default NewRegistrationComp;
