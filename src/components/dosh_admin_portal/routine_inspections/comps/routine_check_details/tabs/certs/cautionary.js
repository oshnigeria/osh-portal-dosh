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
import moment from "moment";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const CautionaryCertComp = (props) => {
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

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`${main_url}/state-officer/info`, fetcher);


  const {
    data: routine_details,
    error: routine_error,
    isLoading:routine_isloading,
  } = useSWR(
    `${main_url}/inventory/factory/routine-check?id=${router.query.id}`,
    fetcher
  );


  // console.log(user);
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
                    // height: 880,
                  })
                }
              >
                <div
                  ref={componentRef}
                  css={(theme) => ({
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "Times New Roman",
                   backgroundPosition: "center center",
 background:theme.colors.Primary_25,
 background: "linear-gradient(90deg,#D1E5E0 0%, rgba(255, 255, 255, 1) 50%, #D1E5E0 100%)",
                    backgroundRepeat: "no-repeat",
                    //   width: "100vw",
                  
                    border: "20px inset #66A898",
                      padding:"24px 0px"
                    //   width: "100vw",
                    // height: "100vh",
                  })}
                >
                  <div
                    css={{
                      width: "80%",
                    }}
                  >
                                        <div>
                                           <div
                                css={{
                                  display:"flex",
                                  justifyContent:"center"
                                }}
                              >
                                <img css={{
                                  width: 100,
                                  height: 80,
                                 
                                }} src="/cert/coat_of_arms.png" />
                              </div>
                              <div css={theme => ({
                                textAlign:"center",
                                textTransform:"uppercase",
                               
                                              color: theme.colors.Primary_700,
                                              fontWeight:700,
                                              marginTop:12,
                                              fontSize:20
                                          
                              })}>
                                federal ministry of labour and employment
                              </div>
                              <div css={{
                                 textAlign:"center",
                                textTransform:"capitalize",
                                 fontWeight:700,
                                   marginTop:4,
                                   color:"#111"
                              }}>
                               Occupational Safety and Health Department
                              </div>
                    
                              <div css={{
                                 marginTop:2,
                                fontSize:12,
                    fontWeight:600,
                      textAlign:"center",
                       color:"#1a1a1a"
                              }}>
                                <span css={{
                                textTransform:"capitalize",
                    
                                }}>federal secretariat complex, phase 1, shehu shagari way, abuja,</span> Tel: 09011127853, Email doshlabourhqrs@gmail.com
                                </div>
                                        </div>
                    <div
                      css={{
                        marginTop: 44,
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
                          fontSize: 14,
                          textAlign: "right",
                          fontFamily: "Times New Roman",
                          // fontWeight: 700,
                        }}
                      >
                        Ref No:{" "}
                        <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >
                          {routine_details.data?.report?.reference_number}
                        </span>
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "right",
                          fontFamily: "Times New Roman",
                          // fontWeight: 700,
                        }}
                      >
                        Date:{" "}
                        <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >
                          {moment(routine_details.data?.report?.inspection_date).format("YYYY-MM-DD")}
                        </span>
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          fontWeight: 700,
                        }}
                      >
                        The Managing Director,
                      </div>
                      <div
                        css={{
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",

                          // fontWeight: 700,
                        }}
                      >
                        {routine_details.data?.report?.factory_name},
                      </div>
                      <div
                        css={{
                          marginBottom: 20,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          // fontWeight: 700,
                        }}
                      >
                        {routine_details.data?.report?.location}
                      </div>

                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          // fontWeight: 700,
                        }}
                      >
                        Dear Sir/Ma
                      </div>
                    </div>

                    {/* <div
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
                    </div> */}
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
                          marginTop: [10, 10, 10],
                          fontSize: 16,
                          textAlign: "center",
                          fontFamily: "Times New Roman",
                          fontWeight: 700,
                          color: theme.colors.Warning_700,
                        })
                      }
                    >
                      {routine_details.data?.report?.factory_name}
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          textAlign: "center",
                          marginTop: [10, 10, 10],
                          fontFamily: "Times New Roman",
                          color: theme.colors.Primary_400,
                          fontSize: [14, 14, 18],
                          fontWeight: 700,
                          color: "#000",
                        })
                      }
                    >
                    
                      <span
                        css={(theme) => ({
                          color: theme.colors.Primary_700,
                        })}
                      >
                        {routine_details.data?.report?.letter_type}
                      </span>
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
                              fontSize: 14,
                            lineHeight:"20px"
                          }}
                        >
                         
                          Refer to our letter dated{" "}
                          <span
                            css={(theme) => ({
                              fontWeight: 600,
                              color: theme.colors.Primary_700,
                            })}
                          >
                            {" "}
                            {"  "}
                            {routine_details.data?.report?.date_of_last_inspection}
                          </span>{" "}
                          with Ref. No.{" "}
                          <span
                            css={(theme) => ({
                              fontWeight: 600,
                              color: theme.colors.Primary_700,
                            })}
                          >
                            {routine_details.data?.report?.previous_notice_reference_number}{" "}
                          </span>{" "}
                          requesting you to address the following;{" "}
                          <span
                            css={(theme) => ({
                              fontWeight: 600,
                              color: theme.colors.Primary_700,
                            })}
                          >
                            {routine_details.data?.report?.areas_to_improve}.{" "}
                          </span>

                          <p>


                          This is in pursuance of the provision of section
                          17(3c) of the constitution of the Laws of the Federation of Nigeria and mandate of  <span> {" "} THE FEDERAL MINISTRY OF LABOUR
                          AND EMPLOYMENT</span> on protection of health, Safety and
                          Welfare of person at work. </p>


<p>
                          Following your failure to
                          comply since{" "}
                          <span
                            css={(theme) => ({
                              fontWeight: 600,
                              color: theme.colors.Primary_700,
                            })}
                          >
                            {" "}
                            {"  "}
                            {routine_details.data?.report?.date_of_last_inspection}
                          </span>{" "}
                          you are by this notice required to rectify the
                          contravention(s) within   <span
                                                      css={(theme) => ({
                                                        fontWeight: 600,
                                                        color: theme.colors.Primary_700,
                                                      })}
                                                    >{moment(routine_details.data?.report?.inspection_date).format("YYYY-MM-DD")} <span css={{
                                                      color:"#111"
                                                    }}>--</span> {moment(routine_details.data?.report?.inspection_date).add(routine_details.data?.report?.no_of_weeks_for_deadline, "weeks").format("YYYY-MM-DD")} ({routine_details.data?.report?.no_of_weeks_for_deadline} weeks)</span>
                                                    {" "} or
                          you will be sanctioned. </p>

                          <p>
                            Kindly regard this as a
                          CAUTION to comply with the provisions of the Factories
                          Act CAP F1 LAW OF FEDERAL REPUBLIC OF NIGERIA 2004 to
                          protect Health, Safety and Welfare of workers.
                          </p>
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
                            src={routine_details.data?.report?.state_officer_signature}
                            css={{
                              width: 60,
                              height: 20,
                            }}
                          />
                        </div>
                        <div
                          css={{
                            marginTop: 8,
                            fontSize: 14,
                            fontWeight: 700,
                            textAlign: "center",
                          }}
                        >
                          {routine_details.data?.report?.state_officer_name}
                        </div>
                       <div
                          css={(theme) => ({
                            marginTop: 8,
                            fontSize: 14,
                            textAlign: "center",
                            fontStyle: "italic",
                          })}
                        >
                          Head of Factories, <span css={{
                            textTransform:"capitalize"
                          }}>{user?.data.state_officer.state}</span>
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

export default CautionaryCertComp;
