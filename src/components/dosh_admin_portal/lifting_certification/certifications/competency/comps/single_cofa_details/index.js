/** @jsxImportSource @emotion/react */
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { media_url } from "@/src/details";

import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext, useEffect } from "react";
import facepaint from "facepaint";
import moment from "moment";
import DeclarationPopup from "@/src/components/dosh_admin_portal/factory_component/tabs/comps/declaration_popup";
import CommentCertComp from "../popups/comment";
import { error_message, success_message } from "@/src/components/toasts";
import toast, { Toaster } from "react-hot-toast";
import COFACertComp from "./cert";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const SingleCofaComp = (props) => {
      const router = useRouter();

  const [progress, setProgress] = useState({
    min: 0,
    max: 50,
  });
    const [show_cert, setShow_cert] = useState(false);
  const [willCheck, setWillcheck] = useState(false);
  const [willAmmend, setWillAmmend] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComment = () => {
    setWillcheck(!willCheck)
    
  }

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
    data: single_cofa,

    isLoading: single_cofa_loading,
  } = useSWR(router.query.single_id ? `${main_url}/lifting/competency/dosh/certificate/${router.query.single_id}`: null, fetcher);

  
  console.log(single_cofa);
    console.log("single_cofa");


  const handleToggleCreateCertPopup = () => {
    setWillAmmend(!willAmmend)
  }
  const tabs = [
       {
      title: "Ongoing",
      route: "ongoing",
      state: () => {
        setProgress({
          min: 50,
          max: 60,
        });
      },
    },
    {
      title: "Rejected",
      route: "rejected",
      state: () => {
        setProgress({
          min: 0,
          max: 50,
        });
      },
    },
 
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

  const approveCertificate = async () => {
  try {
    const res = await axios.post(
      `${main_url}/lifting/equipment/dosh/approve/${router.query.single_id}`,
     {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get(cookies_id)}`,
        },
      }
    );

    success_message(res?.data.message);
props.close()
    // return res?.data?.data?._id; // 👈 return certificate ID
  } catch (error) {
    error_message(error?.response?.data?.message);
    throw error;
  }
};

  return (
   
    <div  css={{
        // display: "flex",
        // justifyContent: "center",
        height: "100vh",
        width: "94%",
      }}>
          <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

     
        <div css={(theme) =>
            mq({
              marginTop: [24, 24, 54],
              // border: [0, 0, `1px solid ${theme.colors.Primary_100}`],
              padding: "16px 16px",
          

             
            })
          }>
     <div
            css={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <img
                css={{
                  width: 24.356040954589844,
                  height: 20,
                }}
                src="/svg/lifting/left-arrow.svg"
              />
            </div>
            <div
              css={(theme) =>
                mq({
                  fontSize: [16, 16, 20],
                  color: theme.colors.Gray_700,
                  textTransform: "capitalize",
                  fontWeight: 700,
                 
                })
              }

              
            >
              Equipment Registration Licence
            </div>
            <div></div>
          </div>

      <div
        css={(theme) =>
          mq({
            marginTop: [0, 0, 32],
            // border: [0, 0, `1px solid ${theme.colors.Gray_200}`],
            //   padding: "42px 66px",
            borderRadius: 8,
            width: "100%",
          })
        }
      >
       
        <div css={{
           
        }}>
          {
            single_cofa_loading ?  <div css={{
            display:"flex",
            justifyContent:"center",
            padding:"24px 0px"
          }}>
             <img 
              css={{
                width: 50,
                height: 50,
              }}
              src="/svg/loader/loader-green.svg"
            />
          </div> : <div css={{
            marginTop:24
          }}>

            {
              show_cert ?  <div css={{
                display:"flex",
                justifyContent:"center"
              }}><COFACertComp /></div> : <div  css={{
    display: "grid",
     gridTemplateColumns: `repeat(2, 1fr)`,
     alignItems:"top",
         gap: 24,

  }}>
     {/* <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Certificate of Authorization on Regulation
                    </div>
                    
                   
                  </div>

                  
                   <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.certificate_of_authorization_on_regulation}
                    </div> */}
                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                    {/* Equipment Registration Licence on (Regulation) */}
                     <img 
              css={{
                width: 123.9554672241211,
                height: 154.9443359375,
                borderRadius:4.47
              }}
              src={single_cofa?.data?.certification?.passport_photograph}
            />
                    </div>
                    {/* <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.equipment_registration_licence}
                    </div> */}
                  </div>
                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                     Certificate of Competence on (Regulation)
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.certificate_of_competence_on_regulation}
                    </div>
                  </div>
                   <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                   Categorization
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.categorization
}
                    </div>
                  </div>
                    <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                    Treasury receipt no
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.treasury_receipt_no}
                    </div>
                  </div>
                   <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
               In pursuance of section
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.in_pursuance_of_section}
                    </div>
                  </div>
                    <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                  Name of the competent person
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.name_of_the_competent_person}
                    </div>
                  </div>
                    <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                 Identification no
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.identification_no}
                    </div>
                  </div>
                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
               Address of the person (Company)
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.address_of_the_person_company}
                    </div>
                  </div>
                    <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                Area of specialization
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.area_of_specialization}
                    </div>
                  </div>

                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
               Period of validity of certificate
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      {single_cofa?.data?.certification?.period_of_validity_of_certificate}
                    </div>
                  </div>



                
                     
                   
                   
                 
                  
                   
                   <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                Attached Documents
                    </div>

<div css={{
  marginTop:16
}}>
                    {
                      single_cofa?.data?.documents.map((doc, index) => (
                        <div key={index}
                        css={ (theme) => ({
            backgroundColor:theme.colors.Primary_50,
            padding:"16px 12px",
            borderRadius:10,
             display:"flex",
                          justifyContent:"space-between",
                          alignItems:"center",
                          marginBottom:8
          })} >
                        <div
                      css={(theme) =>
                        mq({
                         
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 16],
                        })
                      }
                    >
                      {doc.title}
                    </div>
                     <a
                        href={
                          `${media_url}/${doc.file_path}`
                           }
                        target="blank">
                     <div ><img
            css={{
              width: 24,
              height: 24,
              
            }}
            src="/svg/lifting/circle-down-arrow.svg"
          /></div></a></div>
                      ))
                    }
                    </div>
                  </div>
          
</div>
            }

          </div>
          }


            <div
          css={{
          
            marginTop: 64,
            paddingBottom: 100,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div css={mq({
            width:"30%",
            display: "flex",
            justifyContent: "left",
          })}>
            {
              show_cert ?   <button
            css={(theme) =>
              mq({
                height: [40, 40, 56],
                borderRadius: 30,
                width: ["100%", "100%", "100%"],
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
              
                setShow_cert(!show_cert)
             
            
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
                <div>Back</div>
                
              </div>
            )}
          </button> :  <button
            css={(theme) =>
              mq({
                height: [40, 40, 56],
                borderRadius: 30,
                width: ["50%", "50%", "100%"],
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
                backgroundColor: theme.colors.Background_Danger_Tertiary,
              })
            }
            type="submit"
            onClick={() => {
             handleComment()
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
                css={theme => ({
                  display: "flex",
                  alignItems: "center",
                  color:theme.colors.Text_Danger_Secondary
                })}
              >
                <div>Reject</div>
                
              </div>
            )}
          </button>
            }
         </div>
          <div css={{
            width:"60%",
             display: "flex",
            justifyContent: "right",
          }}>
          <button
            css={(theme) =>
              mq({
                height: [40, 40, 56],
                borderRadius: 30,
                width: ["100%", "100%", "100%"],
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
              if(show_cert){
  setWillAmmend(true);
              } else{
                setShow_cert(!show_cert)
              }
            
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
                <div>{ show_cert ? "Approve certificate" : "Next"}</div>
                
              </div>
            )}
          </button></div>
        </div>
         
          
            
        </div>
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
                  approveCertificate();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {willCheck && (
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
              onClick={() => handleComment()}
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
                width: ["90vw", 524, "70vw"],
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
              <CommentCertComp
                close={() => handleComment()}
                ammend={() => {
                  approveCertificate();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
   
  );
};

export default SingleCofaComp;
