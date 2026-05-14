/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import React, { useState, useContext, useRef } from "react";
import axios from "axios";

import ReactToPrint from "react-to-print";
import { motion, AnimatePresence, AnimateSharedLayout, color } from "framer-motion";
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
  } = useSWR(router.query.single_id ? `${main_url}/lifting/competency/dosh/certificate/${router.query.single_id}`: null, fetcher);

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
                    width: ["100%", "100%", 780],
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
  alignItems: "center",
  // fontFamily: "Times New Roman",

  backgroundImage: "url(/cert/bg_competency.png)",
  backgroundSize: "100% 100%", // ✅ stretches to fill
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",

  padding: "40px",

                 

 

                  })}
                >
                
                  <div
                    css={{
                      width: "80%",
                      
                      padding:"40px 0px"
                    }}
                  >
                                        <div>
                                           <div
                                // css={{
                                //   display:"flex",
                                //   justifyContent:"space-between"
                                // }}
                                css={{
                display: "grid",
                gridTemplateColumns: `repeat(3, 1fr)`,
                alignItems: "top",
                gap: 24,
              }}
                              >
                                <div></div>
                                <div   css={{
                                  display:"flex",
                                  justifyContent:"center",
                                  
                                 
                                }} >
                                <img css={{
                                  width: 100,
                                  height: 80,
                                 
                                }} src="/cert/coat_of_arms.png" /></div>
                                <div css={(theme) =>
                        mq({
                          textAlign: "right",
                          marginTop: [8, 8, 8],
                          
                          color: theme.colors.Primary_400,
                          fontSize: [10, 10, 10],
                          fontWeight: 500,
                          color: "#000",
                        })
                      }>Form Lab/F/27
                        <div
                      css={(theme) =>
                        mq({
                       
                       position:"relative"
                        })
                      }
                    >
                    {/* Equipment Registration Licence on (Regulation) */}
                     <img 
              css={{
                width: 100,
                height: 130,
                // borderRadius:4.47,
                objectFit:"contain",
                objectPosition:"top center",
                 position:"absolute",
                 right:-8,
                 top:8,
              }}
              src={`https://media.osh.gov.ng/osh-bucket/${single_cofa?.data?.certification?.passport_photograph}`}
            />
                    </div>
                       </div>
                     
                              </div>
                              <div css={theme => ({
                                textAlign:"center",
                                textTransform:"uppercase",
                               
                                              color: theme.colors.Gray_900,
                                              fontWeight:900,
                                              marginTop:14,
                                              fontSize:14
                                          
                              })}>
                              FEDERAL REPUBLIC OF NIGERIA
                              </div>
                              {/* <div css={{
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
                                </div> */}

                                 <div
                      css={(theme) =>
                        mq({
                          textAlign: "center",
                          marginTop: [8, 8, 8],
                          
                          color: theme.colors.Primary_400,
                          fontSize: [10, 10, 10],
                          fontWeight: 500,
                          color: "#000",
                        })
                      }
                    >
                    The  Factories Act, CAP F1 LFN 2004
                    </div>

                     <div
                      css={(theme) =>
                        mq({
                          textAlign: "center",
                          marginTop: [14, 14, 18],
                          fontFamily: "Almendra",
                          color: "#bf1e2e",
                          fontSize: [20, 20, 20],
                          fontWeight: 700,
                        
                          textTransform:"uppercase"
                        })
                      }
                    >
                     CERTIFICATE OF COMPETENCE
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          textAlign: "center",
                          marginTop: [10, 10, 10],
                         
                          color: theme.colors.Primary_500,
                          fontSize: [12, 12, 12],
                          fontWeight: 700,
                        textTransform:"uppercase"
                          
                        })
                      }
                    >
                   {single_cofa?.data?.certification?.equipment_registration_licence}
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
                          marginBottom: 16,
                          fontSize: 14,
                          textAlign: "left",
                        
                          color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Treasury Receipt No:  <span
                          css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_500,
                             fontSize: 14,
                          })}
                        >{single_cofa?.data?.certification?.treasury_receipt_no}</span>
                      </div>
                      <div
                        css={{
                          marginBottom: 16,
                          fontSize: 14,
                           textAlign: "left",
                       
                          color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Certificate No:  <span
                          css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_500,
                          })}
                        > {single_cofa?.data?.certification?.certificate_no}</span>
                      </div>
                      <div
                        css={{
                          marginBottom: 16,
                          fontSize: 14,
                          textAlign: "left",
                          
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        Date: <span
                          css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_500,
                          })}
                        >{moment(single_cofa?.data?.certification?.period_of_validity_of_authorisation?.start_date).format("YYYY-MM-DD")}</span>
                      </div></div>
</div>





                      <div
                        css={theme =>( {
                          marginBottom: 16,
                          fontSize: 14,
                          textAlign: "left",
                         
                          fontWeight: 500,
                            // color:"#000"
                               color: theme.colors.Gray_900,
                        })}
                      >
                        I hereby certify that the person whose name appears below has beed duly authorized to carry out inspection ( examination and testing ) of the equipment listed above in pursuance of section 
                      </div>

  
                      
                       
                      <div
                        css={(theme) => ({
                          marginBottom: 16,
                          fontSize: 14,
                          textAlign: "left",
                         color: theme.colors.Primary_800,
                          //  color:"#000"
                          fontWeight: 700,
                        })}
                      >
                        Name of Competent person: <span
                          css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_500,
                             textTransform:"uppercase",
                             fontSize: 14,
                          })}
                        >{single_cofa?.data?.certification?.name_of_the_competent_person}</span>
                      </div>

                   
                      <div
                        css={(theme) => ({
                          marginBottom: 16,
                          fontSize: 14,
                          textAlign: "left",
                         color: theme.colors.Primary_800,
                          //  color:"#000"
                          fontWeight: 700,
                        })}
                      >
                        Identification No: <span
                          css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_500,
                             textTransform:"uppercase",
                             fontSize: 14,
                          })}
                        >{single_cofa?.data?.certification?.identification_no}</span>
                      </div>

                         <div
                        css={(theme) => ({
                          marginBottom: 44,
                          fontSize: 14,
                          textAlign: "left",
                         color: theme.colors.Primary_800,
                          //  color:"#000"
                          fontWeight: 700,
                        })}
                      >
                        Postal address of compentent person: <span
                          css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_500,
                             textTransform:"uppercase",
                             fontSize: 14,
                          })}
                        >{single_cofa?.data?.certification?.address_of_the_person_company}</span>
                      </div>

                       <div
                        css={(theme) => ({
                          marginBottom: 44,
                          fontSize: 14,
                          textAlign: "left",
                         color: theme.colors.Primary_800,
                          //  color:"#000"
                          fontWeight: 700,
                        })}
                      >
                        Area of specialization in respect of which certificate of authorization has been issued: <span
                          css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_500,
                             textTransform:"uppercase",
                             fontSize: 14,
                          })}
                        >{single_cofa?.data?.certification?.area_of_specialization}</span>
                      </div>

                    
                    </div>        

<div
                       css={(theme) => ({
                        marginTop:16,
                          marginBottom: 44,
                          fontSize: 14,
                          textAlign: "left",
                         color: theme.colors.Primary_800,
                          //  color:"#000"
                          fontWeight: 700,
                        })}
                      >
                        Period of validity of authorization: <span
                          css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_500,
                            textTransform:"uppercase",
                             fontSize: 14,
                          })}
                        >{single_cofa?.data?.certification?.period_of_validity_of_certificate}</span>
                      </div>

                      {single_cofa?.data?.certification?.seal_no && <div
                      css={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 10,
                        color: "#000",
                      }}
                    >
                     <div
                                
                              >
                              

                                                  <div  css={(theme) => ({
                                                       width: 80,
                                  height: 80,

                   display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // fontFamily: "Times New Roman",

  backgroundImage: "url(/cert/stamp.png)",
  backgroundSize: "100% 100%", // ✅ stretches to fill
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",

  padding: "40px",
color:"#ffa4a4",
marginLeft:-62,
fontSize:14
 
                  })}>
                                                   
                                 <div>
                                  {/* <div css={{
                                    textAlign:"center"
                                  }}>
                                  SEAL NO </div> */}
                                   <div css={{
                                    textAlign:"center"
                                  }}>{single_cofa?.data?.certification?.seal_no}</div> </div>                 </div>

                              </div>
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
                    </div> }
                    

                     <div
                        css={{
                          marginTop: 4,
                          fontSize: 12,
                          textAlign: "left",
                        
                           color:"#000"
                          // fontWeight: 700,
                        }}
                      >
                        <span css={(theme) => ({
                           
                            color:"#f25656"
                          })}>NOTE: </span> To verify certificate go to <span css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_700,
                          })}>Seal verification</span> on the <span css={(theme) => ({
                            fontWeight: 700,
                            color: theme.colors.Primary_700,
                          })}>portal.osh.gov.ng</span>, input the Seal number for confirmation of Authorization
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
                          backgroundColor: theme.colors.Gray_900,
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
