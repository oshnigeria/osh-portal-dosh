/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import React, { useState, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useSWR, { useSWRConfig, mutate } from "swr";
import { FactoryContext } from "@/src/context/factoryContext";
import { success_message, error_message } from "@/src/components/toasts";
import DeclarationPopup from "./comps/declaration_popup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const InspectionReportComp = () => {
  if (typeof window !== "undefined") null;
  const router = useRouter();
  const factory = useContext(FactoryContext);
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
  } = useSWR(`${main_url}/dosh/incident/${router.query.id}`, fetcher);
  const handleFieldChange = (event, fieldName) => {
    setFormData({
      ...formData, // Copy the existing state
      [fieldName]: event.target.value, // Update the specific field using computed property syntax
    });
  };

  const handleTextFieldChange = (event, fieldName) => {
    setFormData({
      ...formData, // Copy the existing state
      [fieldName]: event, // Update the specific field using computed property syntax
    });
  };
  // console.log(single_factory?.data.incident);
  const [willAmmend, setWillAmmend] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    investigation_date: "",

    people_interviewed: "",
    preamble: "",
    nature_of_accident: "",
    circumstance_of_accident: "",
    unsafe_act: "",
    unsafe_condition: "",
    root_cause: "",
    contraventions: "",
    recommendations: "",
  });

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
        `${main_url}/dosh/incident/report`,
        {
          investigation_date: formData.investigation_date,
          incident: router.query.id,
          people_interviewed: formData.people_interviewed,
          preamble: formData.preamble,
          nature_of_accident: formData.nature_of_accident,
          circumstance_of_accident: formData.circumstance_of_accident,
          unsafe_act: formData.unsafe_act,
          unsafe_condition: formData.unsafe_condition,
          root_cause: formData.root_cause,
          contraventions: formData.contraventions,
          recomendations: formData.recommendations,
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
        router.push("/incident");
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
      <div
        css={{
          width: "90%",
        }}
      >
        <div
          css={(theme) => ({
            marginTop: 54,

            border: `1px solid ${theme.colors.Primary_100}`,
            padding: "50px 32px",

            borderRadius: 8,
          })}
        >
          <div
            css={{
              fontSize: 32,
            }}
          >
            Investigation Report
          </div>
          <div
            css={{
              marginTop: 80,
            }}
          >
            <div>
              <div>
                <label
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Victim name
                </label>
                <div
                  css={{
                    marginTop: 20,
                  }}
                >
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.victim_name}
                  </div>
                </div>
              </div>

              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Date reported
                </label>
                <div
                  css={{
                    marginTop: 20,
                  }}
                >
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.date_of_incidence}
                  </div>
                </div>
              </div>

              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Date of investigation
                </label>
                <div
                  css={{
                    marginTop: 20,
                  }}
                >
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {
                      single_factory.data.incident?.investigation_report
                        .investigation_date
                    }
                  </div>
                </div>
              </div>

              <div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    People interviewed
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                      dangerouslySetInnerHTML={{
                        __html:
                          single_factory.data.incident?.investigation_report
                            .people_interviewed,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Preamble
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                      dangerouslySetInnerHTML={{
                        __html:
                          single_factory.data.incident?.investigation_report
                            .preamble,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Nature of accident
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {
                        single_factory.data.incident?.investigation_report
                          .investigation_date
                      }
                    </div>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Circumstances of accident
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                      dangerouslySetInnerHTML={{
                        __html: single_factory.data.incident?.acident_report,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Unsafe act
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                      dangerouslySetInnerHTML={{
                        __html:
                          single_factory.data.incident?.investigation_report
                            .unsafe_act,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Unsafe Condition
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                      dangerouslySetInnerHTML={{
                        __html:
                          single_factory.data.incident?.investigation_report
                            .unsafe_condition,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Root cause
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                      dangerouslySetInnerHTML={{
                        __html:
                          single_factory.data.incident?.investigation_report
                            .root_cause,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Contraventions
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                      dangerouslySetInnerHTML={{
                        __html:
                          single_factory.data.incident?.investigation_report
                            .contraventions,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Recommendations
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                      dangerouslySetInnerHTML={{
                        __html:
                          single_factory.data.incident?.investigation_report
                            .recomendations,
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <label
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Comment
                  </label>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <textarea
                      css={(theme) => ({
                        padding: "12px 14px",
                        width: ["100%", "100%", "70%"],
                        height: 140,
                        fontSize: 20,
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

                        ":focus": {
                          outline: "none",
                          border: `1px solid ${theme.colors.Gray_200}`,

                          padding: "12px 14px",
                          color: theme.colors.Gray_400,
                        },
                        ":placeholder ": {
                          outline: "none",
                          border: "none",

                          padding: "12px 14px",
                          color: theme.colors.Gray_400,
                        },
                      })}
                      {...register("occupier_name", { required: true })}
                      placeholder=""
                      type="date"
                      //   onChange={(e) => handleFieldChange(e, "occupier_name")}
                      //   value={formData.occupier_name}
                    />
                  </div>

                  <div
                    css={{
                      marginTop: 64,
                      display: "flex",
                      // justifyContent: "right",
                    }}
                  >
                    <button
                      css={(theme) => ({
                        height: 56,
                        borderRadius: 30,
                        width: 356,
                        //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                        padding: "16px 24px",
                        fontSize: 20,
                        cursor: "pointer",
                        marginRight: 20,
                        fontWeight: 600,
                        lineHeight: "17px",
                        border: "none",
                        display: "flex",
                        justifyContent: "center",
                        color: "#fff",
                        backgroundColor: theme.colors.Primary_500,
                      })}
                      type="submit"
                      // onClick={() => {
                      //   factory.set_tab("Visitation letter");
                      // }}
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
                            css={{
                              width: 24,
                              height: 24,
                            }}
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
                          <div>Send comment</div>
                          <div
                            css={{
                              marginLeft: 8,
                            }}
                          >
                            <img
                              css={{
                                width: 24,
                                height: 24,
                              }}
                              src="/svg/registration/left_arrow.svg"
                            />
                          </div>
                        </div>
                      )}
                    </button>
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
            css={(theme) => ({
              height: 56,
              borderRadius: 30,
              width: 356,
              //   padding: ["10px 16px", "10px 16px", "16px 24px"],
              padding: "16px 24px",
              fontSize: 20,
              cursor: "pointer",
              marginRight: 20,
              fontWeight: 600,
              lineHeight: "17px",
              border: "none",
              display: "flex",
              justifyContent: "center",
              color: "#fff",
              backgroundColor: theme.colors.Primary_500,
            })}
            type="submit"
            onClick={() => {
              factory.set_tab("Visitation letter");
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
                  css={{
                    width: 24,
                    height: 24,
                  }}
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
                    css={{
                      width: 24,
                      height: 24,
                    }}
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
