/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import React, { useState, useContext, useRef } from "react";
import axios from "axios";

import ReactToPrint from "react-to-print";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { main_url, cookies_id } from "@/src/details";
import { success_message, error_message } from "@/src/components/toasts";
import toast, { Toaster } from "react-hot-toast";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const WarningCertComp = (props) => {
  const [value, setValue] = useState("");
  const [willAmmend, setWillAmmend] = useState(false);
  const router = useRouter();
  const componentRef = useRef();
  const [loading, setLoading] = useState(false);

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

  const zonal_approve_comments = () => {
    setLoading(true);
    axios
      .patch(
        `${main_url}/dosh/routine-check`,
        {
          id: router.query.id,
          // comment: comment,
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

        success_message(response?.data.message);
        router.push("/routine-inspections?tab=pending");
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });
  };
  const handleSubmitApprove = () => {
    zonal_approve_comments();
  };
  const {
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/signature`, fetcher);
  function formatDateToCustom(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }
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
            <img src="/svg/loader/loader.svg" />
          </div>
        </div>
      ) : (
        <div
          css={{
            width: "100%",
          }}
        >
          <div
          // css={(theme) => ({
          //   marginTop: 54,

          //   border: `1px solid ${theme.colors.Primary_100}`,
          //   padding: "50px 32px",

          //   borderRadius: 8,
          // })}
          >
            <div
              css={{
                marginTop: 48,
              }}
            >
              {/* <img
                src="/cert/preview.png"
                css={{
                  width: 598,
                  height: 880,
                }}
              /> */}

              <div
                css={(theme) =>
                  mq({
                    width: ["100%", "100%", 598],
                    border: `1px solid ${theme.colors.Gray_100}`,
                    height: 880,
                  })
                }
              >
                <div
                  ref={componentRef}
                  css={(theme) => ({
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "Times New Roman",
                    backgroundImage: "url('/cert/coat_of_arms_light.png')",
                    objectFit: "cover",
                    backgroundPosition: "center center",

                    backgroundRepeat: "no-repeat",
                    //   width: "100vw",
                    height: "100vh",
                  })}
                >
                  <div
                    css={{
                      width: "60%",
                    }}
                  >
                    <div
                      css={{
                        marginTop: 24,
                      }}
                    >
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 12,
                        }}
                      ></div>

                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 10,
                          textAlign: "right",
                          fontFamily: "Times New Roman",
                          // fontWeight: 700,
                        }}
                      >
                        Ref No:
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 10,
                          textAlign: "right",
                          fontFamily: "Times New Roman",
                          // fontWeight: 700,
                        }}
                      >
                        Date:
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 12,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          fontWeight: 700,
                        }}
                      >
                        The Managing Director,
                      </div>
                      <div
                        css={{
                          marginBottom: 20,
                          fontSize: 12,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          // fontWeight: 700,
                        }}
                      >
                        {props.address}
                      </div>

                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 12,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          // fontWeight: 700,
                        }}
                      >
                        Dear Sir/Ma
                      </div>
                    </div>

                    <div
                      css={{
                        textAlign: "center",
                        marginTop: 20,
                        fontFamily: "Times New Roman",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      FEDERAL REPUBLIC OF NIGERIA
                    </div>
                    <div
                      css={{
                        textAlign: "center",
                        marginTop: 4,
                        fontFamily: "Times New Roman",

                        fontSize: 12,
                        fontStyle: "italic",
                      }}
                    >
                      The Factories Act, CAP F1 LFN 2004
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          textAlign: "center",
                          marginTop: [14, 14, 18],
                          fontFamily: "Times New Roman",
                          color: theme.colors.Primary_400,
                          fontSize: [14, 14, 18],
                          fontWeight: 700,
                          color: "#000",
                        })
                      }
                    >
                      FACTORIES ACT CAP F1 L.F.N 2004
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          textAlign: "center",
                          marginTop: [14, 14, 18],
                          fontFamily: "Times New Roman",
                          color: theme.colors.Primary_400,
                          fontSize: [14, 14, 18],
                          fontWeight: 700,
                          color: "#000",
                        })
                      }
                    >
                      NOTICE: {router.query.notice_type}
                    </div>
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "right",
                        marginTop: 18,
                        color: "#000",
                      }}
                    >
                      <div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          It has been brought to the attention of the Director
                          of Factories of the Federation that your organization
                          was found to be in contravention of the following
                          Section(s) of the Act: {" "}
                          <span
                            css={{
                              fontWeight: 700,
                            }}
                          >
                            FACTORIES ACT CAP F1 L.F.N 2004
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Considering the contravention(s) listed above and
                          observation(s) you are hereby required to rectify all
                          defects as pointed out to you by the Chief Inspector
                          of Factories in the State within ONE month of this
                          notice. Failure to do so will result in {" "}
                          <span
                            css={{
                              fontWeight: 700,
                            }}
                          >
                            FURTHER SANCTION(S)
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Kindly regard this as to
                          <span
                            css={{
                              fontWeight: 700,
                            }}
                          >
                            {router.query.notice_type}
                          </span>
                          comply with the provisions of the Factories Act 2004
                          and provide a safe working environment for all
                          operations.
                        </div>
                        <div>
                            <div
                            css={{
                              fontWeight: 600,
                               marginBottom: 8,
                            }}
                          >
                            Sections of Contraventions
                          </div>
                          <div
                            css={{
                              fontSize: 12,
                            }}
                          >
                            {props.sections_of_contraventions}
                          </div>
                        </div>
                      </div>
                    </div>
  <div
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 30,
                        color: "#000",
                      }}
                    >
                      <div>
                        <div
                          css={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={props.state_officer_signature}
                            css={{
                              width: 60,
                              height: 20,
                            }}
                          />
                        </div>
                        <div
                          css={{
                            marginTop: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            textAlign: "center",
                          }}
                        >
                          {props.name}
                        </div>
                        <div
                          css={{
                            marginTop: 8,
                            fontSize: 12,
                            textAlign: "center",
                            fontStyle: "italic",
                          }}
                        >
                          State Officer
                        </div>
                      </div>
                    </div>
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 30,
                        color: "#000",
                      }}
                    >
                      <div>
                        <div
                          css={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={single_factory?.data?.url}
                            css={{
                              width: 60,
                              height: 20,
                            }}
                          />
                        </div>
                        <div
                          css={{
                            marginTop: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            textAlign: "center",
                          }}
                        >
                          {single_factory?.data?.name}
                        </div>
                        <div
                          css={{
                            marginTop: 8,
                            fontSize: 12,
                            textAlign: "center",
                            fontStyle: "italic",
                          }}
                        >
                          Director of the factories of the federation
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarningCertComp;
