/** @jsxImportSource @emotion/react */
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import DashboadWrapperComp from "../../nav_wrapper";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext, useEffect } from "react";
import facepaint from "facepaint";
import { states, months, zones } from "@/src/details";
import { success_message, error_message } from "@/src/components/toasts";
import { color } from "framer-motion";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const SystemAnalyticsComp = () => {
  const [progress, setProgress] = useState({
    min: 0,
    max: 50,
  });
  const [state, setState] = useState("lagos");
  const [month, setMonth] = useState("January");
  const [sel_year, setSelYear] = useState("");
  const [analy_data, setAnalyData] = useState(null);

  const [loading, setLoading] = useState(false);
  console.log("analy_data");
  console.log(analy_data);

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
  } = useSWR(
    `${main_url}/dosh/factory/certificate/mutations?event=renewal`,
    fetcher
  );
  const {
    data: completed,

    isLoading: factory_isLoading,
  } = useSWR(
    `${main_url}/dosh/factory/certificate/mutations/completed?event=renewal`,
    fetcher
  );
  const router = useRouter();
  console.log(factory);

  const handle_search_report = (e) => {
    setLoading(true);

    axios
      .post(
        `${main_url}/dosh/analytics`,
        {
          zone: state,
          month: Number(month),
          year: Number(sel_year),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setAnalyData(response.data);
        success_message(response?.data.message);
      })
      .catch(function (error) {
        error_message(error.response.data.message);
        console.log(error);
        setLoading(false);
      });

    // console.log("ade");
  };

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
        css={mq({
          display: "flex",
          alignItems: "center",
          marginTop: [22, 22, 0],
          marginLeft: [22, 22, 0],
        })}
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
          Monthly reports
        </div>
        {/* <div>
          <img
            css={mq({
              width: [14, 14, 34],
              height: [14, 14, 32],

              marginLeft: 8,
            })}
            src="/svg/state_admin_portal/waving_hand_sign.svg"
          />
        </div> */}
      </div>

      <div
        css={{
          marginTop: 48,
        }}
      >
        <div>
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              rowGap: 0,
              columnGap: 8,
              width: "100%",
              height: "auto",
              alignItems: "end",
            }}
          >
            <div>
              <label
                css={(theme) =>
                  mq({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: [14, 20],
                    textTransform: "capitalize",
                  })
                }
              >
                State
              </label>
              <div
                css={{
                  marginTop: 20,
                }}
              >
                <select
                  css={(theme) =>
                    mq({
                      padding: "12px 14px",
                      width: ["100%", "100%", "100%"],
                      fontSize: [14, 18],
                      color: theme.colors.Gray_400,
                      border: `1px solid ${theme.colors.Gray_200}`,
                      borderRadius: 8,
                      textTransform: "capitalize",
                      ":focus": {
                        outline: "none",
                        border: `1px solid ${theme.colors.Gray_400}`,

                        padding: "12px 14px",
                        color: theme.colors.Gray_800,
                      },
                      ":placeholder ": {
                        outline: "none",
                        border: "none",

                        padding: "12px 14px",
                        color: theme.colors.Gray_400,
                      },
                    })
                  }
                  // {...register("state", { required: true })}
                  placeholder=""
                  type="text"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                >
                  <option
                    css={{
                      textTransform: "capitalize",
                    }}
                  >
                    select a zone
                  </option>
                  {zones.map((state) => (
                    <option
                      css={{
                        textTransform: "capitalize",
                      }}
                      value={state}
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              {/* {errors.state && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )} */}
            </div>
            <div>
              <label
                css={(theme) =>
                  mq({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: [14, 20],
                    textTransform: "capitalize",
                  })
                }
              >
                Month
              </label>
              <div
                css={{
                  marginTop: 20,
                }}
              >
                <select
                  css={(theme) =>
                    mq({
                      padding: "12px 14px",
                      width: ["100%", "100%", "100%"],
                      fontSize: [14, 18],
                      color: theme.colors.Gray_400,
                      border: `1px solid ${theme.colors.Gray_200}`,
                      borderRadius: 8,
                      textTransform: "capitalize",
                      ":focus": {
                        outline: "none",
                        border: `1px solid ${theme.colors.Gray_400}`,

                        padding: "12px 14px",
                        color: theme.colors.Gray_800,
                      },
                      ":placeholder ": {
                        outline: "none",
                        border: "none",

                        padding: "12px 14px",
                        color: theme.colors.Gray_400,
                      },
                    })
                  }
                  // {...register("state", { required: true })}
                  placeholder=""
                  type="text"
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  <option
                    css={{
                      textTransform: "capitalize",
                    }}
                  >
                    select a month
                  </option>
                  {months.map((state, index) => (
                    <option
                      css={{
                        textTransform: "capitalize",
                      }}
                      value={index + 1}
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              {/* {errors.state && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )} */}
            </div>
            <div>
              <label
                css={(theme) =>
                  mq({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: [14, 20],
                    textTransform: "capitalize",
                  })
                }
              >
                Year
              </label>
              <div
                css={{
                  marginTop: 20,
                }}
              >
                <input
                  css={(theme) =>
                    mq({
                      padding: "12px 14px",
                      width: ["100%", "100%", "100%"],
                      fontSize: [14, 18],
                      color: theme.colors.Gray_400,
                      border: `1px solid ${theme.colors.Gray_200}`,
                      borderRadius: 8,
                      textTransform: "capitalize",
                      ":focus": {
                        outline: "none",
                        border: `1px solid ${theme.colors.Gray_400}`,

                        padding: "12px 14px",
                        color: theme.colors.Gray_800,
                      },
                      ":placeholder ": {
                        outline: "none",
                        border: "none",

                        padding: "12px 14px",
                        color: theme.colors.Gray_400,
                      },
                    })
                  }
                  placeholder=""
                  type="number"
                  onChange={(e) => setSelYear(e.target.value)}
                  value={sel_year}
                ></input>
              </div>
            </div>

            <div>
              <div
                css={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <button
                  css={(theme) =>
                    mq({
                      width: ["100%", "100%", "70%"],
                      height: 48,
                      borderRadius: 10,
                      // padding: ["10px 16px", "10px 16px", "16px 24px"],
                      fontSize: [14, 14, 16],
                      fontWeight: 600,

                      border: "none",
                      color: theme.colors.Gray_50,
                      backgroundColor: theme.colors.Primary_500,
                    })
                  }
                  onClick={() => handle_search_report()}
                >
                  <div>Search</div>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              {analy_data ? 
            <div> 
            <div
              css={{
                marginTop: 50,
                display: "grid",
                gridTemplateColumns: "repeat(2, 40% 60%)",
                rowGap: 0,
                columnGap: 50,
                width: "100%",
                height: "auto",
                //    alignItems:"end"
              }}
            >
              <div>
                <div
                  css={(theme) => ({
                    width: "100%",
                    // height:85,
                    borderRadius: 8,
                    backgroundColor: theme.colors.Primary_50,
                    padding: 16,
                  })}
                >
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        css={mq({
                          width: [14, 14, 18],
                          height: [14, 14, 18],

                          marginRight: 4,
                        })}
                        src="/svg/analytics/system/inspectors.svg"
                      />
                    </div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Primary_500,
                        fontSize: 14,
                      })}
                    >
                      Number of Inspectors
                    </div>
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_700,
                      fontSize: 24,
                      fontWeight: 600,
                      marginTop: 8,
                    })}
                  >
                    {analy_data?.data?.analytics?.values?.no_inspectors ?? 0}
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 14,
                    width: "100%",
                    // height:85,
                    borderRadius: 8,
                    backgroundColor: theme.colors.Primary_50,
                    padding: 16,
                  })}
                >
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        css={mq({
                          width: [14, 14, 18],
                          height: [14, 14, 18],

                          marginRight: 4,
                        })}
                        src="/svg/analytics/system/inspections.svg"
                      />
                    </div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Primary_500,
                        fontSize: 14,
                      })}
                    >
                      Number of Inspections
                    </div>
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_700,
                      fontSize: 24,
                      fontWeight: 600,
                      marginTop: 8,
                    })}
                  >
                    {analy_data?.data?.analytics?.values?.no_inspections ?? 0}
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 14,
                    width: "100%",
                    // height:85,
                    borderRadius: 8,
                    backgroundColor: theme.colors.Primary_50,
                    padding: 16,
                  })}
                >
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        css={mq({
                          width: [14, 14, 18],
                          height: [14, 14, 18],

                          marginRight: 4,
                        })}
                        src="/svg/analytics/system/factory.svg"
                      />
                    </div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Primary_500,
                        fontSize: 14,
                      })}
                    >
                      Number of Registered Factories
                    </div>
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_700,
                      fontSize: 24,
                      fontWeight: 600,
                      marginTop: 8,
                    })}
                  >
                    {analy_data?.data?.analytics?.values
                      ?.no_registered_factories ?? 0}
                  </div>
                </div>
              </div>
              <div
                css={(theme) => ({
                  backgroundColor: theme.colors.Primary_25,
                  borderRadius: "8px 8px 0px 0px",
                  width:"90%"
                })}
              >
                <div
                  css={(theme) => ({
                    position: "relative",
                    height: 64,
                    borderRadius: "8px 8px 0px 0px",
                    backgroundColor: theme.colors.Primary_50,
                    padding: 16,
                    overflow: "hidden",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Primary_500,
                      fontSize: 16,
                      fontWeight: 600,
                    })}
                  >
                    Certification
                  </div>
                  <div>
                    <img
                      css={mq({
                        width: [90, 90, 95.66000316166716],
                        height: [90, 90, 95.66000316166716],
                        position: "absolute",
                        width: "100%",
                        top: 0,
                        right: -174,
                        marginRight: 4,
                      })}
                      src="/svg/analytics/system/certificate.svg"
                    />
                  </div>
                </div>

                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Registered Factories
                  </div>

                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values
                      ?.no_registered_factories ?? 0}
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Certificate Renewal
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values?.no_cert_renewal ?? 0}
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Certificate Replacement
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values?.no_cert_replacement ??
                      0}
                  </div>
                </div>
              </div>
            </div>

            <div
              css={{
                marginTop: 50,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                rowGap: 0,
                columnGap: 16,
                width: "100%",
                height: "auto",
                //    alignItems:"end"
              }}
            >
              <div
                css={(theme) => ({
                  backgroundColor: theme.colors.Primary_25,
                  borderRadius: "8px 8px 0px 0px",
                })}
              >
                <div
                  css={(theme) => ({
                    position: "relative",
                    height: 64,
                    borderRadius: "8px 8px 0px 0px",
                    backgroundColor: theme.colors.Primary_50,
                    padding: 16,
                    overflow: "hidden",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Primary_500,
                      fontSize: 16,
                      fontWeight: 600,
                    })}
                  >
                    Warnings
                  </div>
                  <div>
                    <img
                      css={mq({
                        width: [90, 90, 95.66000316166716],
                        height: [90, 90, 95.66000316166716],
                        position: "absolute",
                        width: "100%",
                        top: 0,
                        right: -160,
                        marginRight: 4,
                      })}
                      src="/svg/analytics/system/warning.svg"
                    />
                  </div>
                </div>

                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Warning Notice Requested
                  </div>

                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values
                      ?.no_of_warning_notice_requested ?? 0}
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Warning Notice Approved
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values?.no_of_warning_notice_approved ?? 0}
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Prohibition Notice 
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values?.no_of_prohibition_notice ??
                      0}
                  </div>
                </div>
              </div>
              <div
                css={(theme) => ({
                  backgroundColor: theme.colors.Primary_25,
                  borderRadius: "8px 8px 0px 0px",
                })}
              >
                <div
                  css={(theme) => ({
                    position: "relative",
                    height: 64,
                    borderRadius: "8px 8px 0px 0px",
                    backgroundColor: theme.colors.Primary_50,
                    padding: 16,
                    overflow: "hidden",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Primary_500,
                      fontSize: 16,
                      fontWeight: 600,
                    })}
                  >
                    Incidents
                  </div>
                  <div>
                    <img
                      css={mq({
                        width: [90, 90, 95.66000316166716],
                        height: [90, 90, 95.66000316166716],
                        position: "absolute",
                        width: "100%",
                        top: 0,
                        right: -160,
                        marginRight: 4,
                      })}
                      src="/svg/analytics/system/incidents.svg"
                    />
                  </div>
                </div>

                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Dangerous Occurrence Recorded
                  </div>

                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values
                      ?.no_of_dangerous_recorded ?? 0}
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Accident Incidents
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values?.no_accident_incidents ?? 0}
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    padding: "26px 16px",
                    border: "none",
                    borderBottom: "1px solid #B3D4CC",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    Number of Occupational Diseases
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_500,
                      fontSize: 16,
                    })}
                  >
                    {analy_data?.data?.analytics?.values?.no_occupational_diseases ??
                      0}
                  </div>
                </div>
              </div>
            </div></div> : <div  css={(theme) => ({
                      color: theme.colors.Gray_400,
                      fontSize: 16,
                      
                      textAlign:"center",
                      marginTop:50
                    })}>
              ---Filter to display report---</div>}</div>
          </div>
        </div>
      </div>
    </DashboadWrapperComp>
  );
};

export default SystemAnalyticsComp;
