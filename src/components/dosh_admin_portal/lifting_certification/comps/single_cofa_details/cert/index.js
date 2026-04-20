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
const COFACertComp = (props) => {
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
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/signature`, fetcher);



  const {
    data: single_cofa,
error: single_cofa_error,
    isLoading: single_cofa_loading,
  } = useSWR(router.query.single_id ? `${main_url}/lifting/dosh/certificate/${router.query.single_id}`: null, fetcher);

  console.log(single_cofa)
  console.log(single_factory)
  

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
          {single_cofa_loading || single_cofa_error ? null : <div
          // css={(theme) => ({
          //   marginTop: 54,

          //   border: `1px solid ${theme.colors.Primary_100}`,
          //   padding: "50px 32px",

          //   borderRadius: 8,
          // })}
          >
            <div
            //   css={{
            //     marginTop: 48,
            //   }}
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
                    // border: `1px solid ${theme.colors.Gray_100}`,
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
                  
                    border: "4px inset #66A898",
  

                    // //   width: "100vw",
                    // // height: "100vh",
                    // padding:"24px 0px"



                     padding: "40px 0",

  // 👇 container styling
  // borderRadius: "20px",
  position: "relative",

  // 👇 soft outer border glow
  // boxShadow: `
  //   0 0 0 2px #66A898,
  //   0 10px 30px rgba(102,168,152,0.25)
  // `,

  // 👇 subtle inner highlight
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "6px",
    borderRadius: "14px",
    border: "1px solid rgba(102,168,152,0.3)",
    pointerEvents: "none"
  }

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
                                              marginTop:14,
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

                                 <div
                      css={(theme) =>
                        mq({
                          textAlign: "center",
                          marginTop: [12, 12, 12],
                          fontFamily: "Times New Roman",
                          color: theme.colors.Primary_400,
                          fontSize: [14, 14, 14],
                          fontWeight: 400,
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
                          color: theme.colors.Warning_800,
                          fontSize: [14, 14, 18],
                          fontWeight: 700,
                        
                          textTransform:"uppercase"
                        })
                      }
                    >
                     {single_cofa?.data?.certification?.certificate_of_authorization_on_regulation}
                    </div>
                                        </div>
                    <div
                      css={{
                        marginTop: 44,
                      }}
                    >
                      


<div css={{
  display:"flex",
  justifyContent:"right"
}}>
  <div>
                     <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Treasury Receipt No:  <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{single_cofa?.data?.certification?.treasury_receipt_no}</span>
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                           textAlign: "left",
                          fontFamily: "Times New Roman",
                          color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Certificate No:  <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        > {single_cofa?.data?.certification?.certificate_no}</span>
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Date: <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{moment(single_cofa?.data?.certification?.period_of_validity_of_authorisation?.start_date).format("YYYY-MM-DD")}</span>
                      </div></div>
</div>

                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          fontWeight: 700,
                            color:"#000"
                        }}
                      >
                        I hereby certify that,
                      </div>
                       
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Company: <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{single_cofa?.data?.certification?.company_name}</span>
                      </div>

                     <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Situated at: <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{single_cofa?.data?.certification?.location}</span>
                      </div>
                    </div>

                    
                    
                    
                    {/* <div
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
                    </div> */}

                    <div css={{
                        marginTop:24
                    }}>
                         <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        has demonstraded compliance with <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{single_cofa?.data?.certification?.compliance_with}</span>
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        and hereby entitled as <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{single_cofa?.data?.certification?.entitled_as}</span>
                      </div>
                    </div>
                       <div css={{
                        marginTop:24
                    }}>
                         <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Identification No: <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{single_cofa?.data?.certification?.identification_no}</span>
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Area of specialisation in restpect of which certificate of authorization has been issued: <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{single_cofa?.data?.certification?.area_of_specialisation}</span>
                      </div>
                    </div>
<div
                        css={{
                            marginTop:48,
                          marginBottom: 8,
                          fontSize: 14,
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Period of validity of authorization: <span
                          css={(theme) => ({
                            fontWeight: 600,
                            color: theme.colors.Warning_700,
                          })}
                        >{moment(single_cofa?.data?.certification?.period_of_validity_of_authorisation?.start_date).format("YYYY-MM-DD")} -- {moment(single_cofa?.data?.certification?.period_of_validity_of_authorisation?.end_date).format("YYYY-MM-DD")}</span>
                      </div>
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "right",
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
                           src={single_factory.data?.url}
                            css={{
                            //   width: 60,
                              height: 100,
                            }}
                          />
                        </div>
                        <div
                          css={{
                            marginTop: -24,
                            fontSize: 14,
                            fontWeight: 700,
                            textAlign: "center",
                          }}
                        >
                       {single_factory.data?.name}
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

        <ReactToPrint
                    trigger={() => (
                      <button
                        css={(theme) => ({
                          height: [40, 40, 56],
                          borderRadius: 30,
                          width: [140, 140, 356],
                          marginTop:24,
                          //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                          padding: "16px 24px",
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
                        })}
                        type="submit"
                        // onClick={() => {
                        //   factory_details.add_factory_details(formData);
                        //   factory.set_tab("Upload document");
                        // }}
                      >
                        <div
                          css={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: 4,
                          }}
                        >
                          <div>Print certificate</div>
                        </div>
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
    </div>
  );
};

export default COFACertComp;
