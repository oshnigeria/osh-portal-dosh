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

   const {
    data: routine_details,
    error: routine_error,
    isLoading:routine_isloading,
  } = useSWR(
    `${main_url}/inventory/factory/routine-check?id=${router.query.id}`,
    fetcher
  );
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

  // console.log("Props:", props.routine_details);
  return (
    <div
      css={{
        // display: "center",
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
          {routine_isloading || routine_error ? null : <div
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
                    height: "auto",
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
                    //   width: "100vw",
                    // height: "100vh",
                    padding:"24px 0px"
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
                        Ref No:  <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{routine_details.data?.report?.reference_number}</span>
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
                        Date: <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{moment(routine_details.data?.report?.createdAt).format("YYYY-MM-DD")}</span>
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
                      >{routine_details.data?.report?.letter_type}</span>
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
                          It has been brought to the attention of the Director
                          of Factories of the Federation that your organization
                          was found to be in contravention of the following
                          section(s) of the {" "}
                          <span
                            css={{
                              fontWeight: 700,
                            }}
                          >
                           Factories Act CAP F1 Laws of the Federation of Nigeria 2004;
                          </span> {" "}
                          <span  css={(theme) => ({
                                                        fontWeight: 600,
                                                        color: theme.colors.Primary_700,
                                                      })}>{routine_details.data?.report?.sections_of_contraventions}</span>
                        </div>
                         {/* <div>
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
                                  fontSize: 14,
                            lineHeight:"20px"
                            }}
                          >
                            {routine_details.data?.report?.sections_of_contraventions}
                          </div>
                        </div> */}
                        <div
                          css={{
                            marginBottom: 8,
                               fontSize: 14,
                            lineHeight:"20px"
                          }}
                        >
                          Considering the contravention(s) listed above and
                          observation(s) you are hereby required to rectify all
                          defects as pointed out to you by the Head of Factories in the state within <strong>ONE month</strong> of this
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
                                fontSize: 14,
                            lineHeight:"20px"
                          }}
                        >
                          Kindly regard this as a  {" "}
                          <span
                            css={{
                              fontWeight: 700,
                            }}
                          >
                           {routine_details.data?.report?.letter_type}
                          </span> {" "}
                          
                         to comply with the provisions of the Factories Act 2004
                          and provide a safe working environment for all
                          operations.
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
                           src={routine_details.data?.report?.dosh_signature}
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
                       {routine_details.data?.report?.dosh_name}
                        </div>
                        <div
                          css={{
                            marginTop: 8,
                            fontSize: 14,
                            textAlign: "center",
                            fontStyle: "italic",
                        
                          }}
                        >
                          Director of Factories of the Federation
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> }
          
        </div>
      )}
    </div>
  );
};

export default WarningCertComp;
