/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import React, { useState, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useSWR, { useSWRConfig, mutate } from "swr";

import { success_message, error_message } from "@/src/components/toasts";
import DeclarationPopup from "./comps/declaration_popup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";

import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const InspectionReportComp = () => {
  if (typeof window !== "undefined") null;
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
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/state-officer/factory/${router.query.id}`, fetcher);

  console.log(single_factory?.data.factory);
  const [value, setValue] = useState("");
  const [willAmmend, setWillAmmend] = useState(false);
  const [factory, setFactory] = useState("650b125a69fcacc38ae2b0dd");
  const [natureOfWorkDone, setNatureOfWorkDone] = useState(
    single_factory?.data.factory?.inspection_report?.nature_of_work_done
  ); // Required
  const [inspectionDate, setInspectionDate] = useState(
    single_factory?.data.factory?.inspection_report?.inspection_date
  );
  const [inspectionSummary, setInspectionSummary] = useState(
    single_factory?.data.factory?.inspection_report?.inspection_summary
  );
  const [healthSafetyReport, setHealthSafetyReport] = useState(
    single_factory?.data.factory?.inspection_report?.health_safety_report
  );
  const [recommendations, setRecommendations] = useState(
    single_factory?.data.factory?.inspection_report?.recommendations
  );
  const [state, setState] = useState(single_factory?.data?.factory?.state);
  const [event, setEvent] = useState(router.query.type);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const update_progress = (progress) => {
    setLoading(true);

    axios
      .patch(
        `${main_url}/state-officer/factory/progress`,
        {
          id: router.query.id,
          progress: progress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        success_message(response?.data.message);
        router.push("/");
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);

        setLoading(false);
      });

    // console.log("ade");
  };

  const state_report = () => {
    setLoading(true);

    axios
      .post(
        `${main_url}/state-officer/factory/report`,
        {
          factory: router.query.id,
          nature_of_work_done: natureOfWorkDone,
          inspection_date: inspectionDate,
          inspection_summary: inspectionSummary,
          health_safety_report: healthSafetyReport,
          recommendations: recommendations,
          state: state,
          event: event ?? undefined,
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
        router.push("/");
        setLoading(false);
        success_message(response?.data.message);
        setWillAmmend(false);
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });

    // console.log("ade");
  };
  return (
    <div
      css={{
        display: "center",
        justifyContent: "center",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div>
        <div
          css={(theme) =>
            mq({
              marginTop: [24, 24, 54],

              border: [0, 0, `1px solid ${theme.colors.Primary_100}`],
              padding: ["16px 16px", "16px 16px", "50px 32px"],
              width: "90%",
              borderRadius: 8,
            })
          }
        >
          <div
            css={(theme) =>
              mq({
                fontSize: [16, 16, 32],
                color: theme.colors.Gray_700,
                textTransform: "capitalize",
              })
            }
          >
            Inspection Form
          </div>
          <div
            css={mq({
              marginTop: [24, 24, 80],
            })}
          >
            <div>
              <div>
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Name of Undertaking
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
                        width: ["100%", "100%", "70%"],
                        fontSize: [14, 14, 18],
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

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
                    type="text"
                    //   onChange={(e) => handleFieldChange(e, "occupier_name")}
                    value={single_factory?.data?.factory?.occupier_name}
                  />
                </div>
              </div>

              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Postal address of occupier/intending occupier
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
                        width: ["100%", "100%", "70%"],
                        fontSize: [14, 14, 18],
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

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
                    type="text"
                    //   onChange={(e) => handleFieldChange(e, "occupier_name")}
                    value={single_factory?.data?.factory?.postal_address}
                  />
                </div>
              </div>

              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Phone number of occupier/intending occupier
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
                        width: ["100%", "100%", "70%"],
                        fontSize: [14, 14, 18],
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

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
                    type="text"
                    //   onChange={(e) => handleFieldChange(e, "occupier_name")}
                    value={single_factory?.data?.factory?.phone_number}
                  />
                </div>
              </div>

              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Precise location of the factory
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
                        width: ["100%", "100%", "70%"],
                        fontSize: [14, 14, 18],
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

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
                    type="text"
                    // onChange={(e) => setState(e.target.value)}
                    value={single_factory?.data?.factory?.address}
                  />
                </div>
              </div>
              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Total number of person employed or intended to be employed in
                  the factory
                </label>
                <div
                  css={{
                    width: "50%",
                  }}
                >
                  <div
                    css={{
                      marginTop: 20,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                          marginRight: 28,
                        })
                      }
                    >
                      Adults
                    </div>
                    <input
                      css={(theme) =>
                        mq({
                          padding: "12px 14px",
                          width: ["100%", "100%", "70%"],
                          fontSize: [14, 14, 18],
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,
                          marginRight: 28,
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
                      placeholder="Male"
                      type="text"
                      value={
                        single_factory?.data?.factory?.total_employees?.adult
                          ?.male
                      }
                    />
                    <input
                      css={(theme) =>
                        mq({
                          padding: "12px 14px",
                          width: ["100%", "100%", "70%"],
                          fontSize: [14, 14, 18],
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,

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
                      placeholder="Female"
                      type="text"
                      value={
                        single_factory?.data?.factory?.total_employees?.adult
                          ?.female
                      }
                    />
                  </div>

                  <div
                    css={{
                      marginTop: 20,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                          marginRight: 28,
                        })
                      }
                    >
                      Youths
                    </div>
                    <input
                      css={(theme) =>
                        mq({
                          padding: "12px 14px",
                          width: ["100%", "100%", "70%"],
                          fontSize: [14, 14, 18],
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,
                          marginRight: 28,
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
                      placeholder="Male"
                      type="text"
                      value={
                        single_factory?.data?.factory?.total_employees?.youth
                          ?.male
                      }
                    />
                    <input
                      css={(theme) =>
                        mq({
                          padding: "12px 14px",
                          width: ["100%", "100%", "70%"],
                          fontSize: [14, 14, 18],
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,

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
                      placeholder="Female"
                      type="text"
                      value={
                        single_factory?.data?.factory?.total_employees?.youth
                          ?.female
                      }
                    />
                  </div>

                  <div
                    css={{
                      marginTop: 20,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                          marginRight: 28,
                        })
                      }
                    >
                      Total
                    </div>
                    <input
                      css={(theme) =>
                        mq({
                          padding: "12px 14px",
                          width: ["100%", "100%", "70%"],
                          fontSize: [14, 14, 18],
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,

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
                      {...register("youth_male", { required: true })}
                      placeholder="1000"
                      type="text"
                      value={
                        single_factory?.data?.factory?.total_employees?.adult
                          ?.male +
                        single_factory?.data?.factory?.total_employees?.adult
                          ?.female +
                        single_factory?.data?.factory?.total_employees?.youth
                          ?.male +
                        single_factory?.data?.factory?.total_employees?.youth
                          ?.female
                      }
                    />
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Nature of work carried out on the factory
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
                          width: ["100%", "100%", "70%"],
                          fontSize: [14, 14, 18],
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,

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
                      {...register("nature_of_work", { required: true })}
                      placeholder=""
                      type="text"
                      onChange={(e) => setNatureOfWorkDone(e.target.value)}
                      value={natureOfWorkDone}
                    />
                  </div>
                  {errors.nature_of_work && (
                    <span
                      css={{
                        fontSize: 12,
                        marginTop: 12,
                        color: "red",
                      }}
                    >
                      * this field is required
                    </span>
                  )}
                </div>

                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Inspection date
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
                          width: ["100%", "100%", "70%"],
                          fontSize: [14, 14, 18],
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,

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
                      {...register("inspection_date", { required: true })}
                      placeholder=""
                      type="date"
                      onChange={(e) => setInspectionDate(e.target.value)}
                      value={inspectionDate}
                    />
                  </div>
                  {errors.inspection_date && (
                    <span
                      css={{
                        fontSize: 12,
                        marginTop: 12,
                        color: "red",
                      }}
                    >
                      * this field is required
                    </span>
                  )}
                </div>

                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Inspectionn summary
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                      width: "70%",
                      paddingBottom: 48,
                    }}
                  >
                    {" "}
                    <QuillNoSSRWrapper
                      placeholder="Enter a description..."
                      onChange={(e) => setInspectionSummary(e)}
                      value={inspectionSummary}
                      modules={modules}
                      formats={formats}
                      theme="snow"
                      css={{
                        height: 200,
                      }}
                    />
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Health and safty report
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                      width: "70%",
                      paddingBottom: 48,
                    }}
                  >
                    {" "}
                    <QuillNoSSRWrapper
                      placeholder="Enter a description..."
                      onChange={(e) => setHealthSafetyReport(e)}
                      value={healthSafetyReport}
                      modules={modules}
                      formats={formats}
                      theme="snow"
                      css={{
                        height: 200,
                      }}
                    />
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Recomendations
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                      width: "70%",
                      paddingBottom: 48,
                    }}
                  >
                    {" "}
                    <QuillNoSSRWrapper
                      placeholder="Enter a description..."
                      onChange={(e) => setRecommendations(e)}
                      value={recommendations}
                      modules={modules}
                      formats={formats}
                      theme="snow"
                      css={{
                        height: 200,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          css={{
            marginTop: 64,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <button
            css={(theme) =>
              mq({
                height: [40, 40, 56],
                borderRadius: 30,
                width: ["auto", "auto", 356],
                //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                padding: ["12px 16px", "12px 16px", "16px 24px"],
                fontSize: [12, 12, 20],
                cursor: "pointer",
                marginRight: 20,
                fontWeight: 600,
                lineHeight: "17px",
                border: "none",
                display: "flex",
                justifyContent: "center",
                color: "#fff",
                backgroundColor: theme.colors.Primary_500,
              })
            }
            type="submit"
            onClick={() => {
              setWillAmmend(true);
            }}
          >
            {loading ? (
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                <div
                  css={mq({
                    width: [16, 16, 24],
                    height: [16, 16, 24],
                  })}
                >
                  <img src="/svg/loader/loader.svg" />
                </div>
              </div>
            ) : (
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>Submit report</div>
                <div
                  css={{
                    marginLeft: 8,
                  }}
                >
                  <img
                    css={mq({
                      width: [14, 14, 24],
                      height: [14, 14, 24],
                    })}
                    src="/svg/registration/left_arrow.svg"
                  />
                </div>
              </div>
            )}
          </button>
        </div>
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
              onClick={() => setWillAmmend(false)}
            >
              {" "}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 900 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 900 }}
              transition={{
                ease: "easeInOut",
                // duration: 0.4,
              }}
              id="location"
              css={(theme) => ({
                position: "fixed",
                width: ["90vw", 524, 524],
                height: 427,
                overflowY: "scroll",

                borderRadius: 14,
                zIndex: 5,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              })}
            >
              {/* <CreateRiderAccount close={() => router.back()} /> */}
              <DeclarationPopup
                close={() => setWillAmmend(false)}
                ammend={() => {
                  state_report();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InspectionReportComp;
