/** @jsxImportSource @emotion/react */
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

import DashboadWrapperComp from "../nav_wrapper";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext, useEffect } from "react";
import facepaint from "facepaint";
import CreateLiftingsCertComp from "./comps/popups/create_lifting_cert_popup";
import SingleCofaComp from "./comps/single_cofa_details";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const AuthorizationComp = () => {
  const [progress, setProgress] = useState({
    min: 0,
    max: 50,
  });
    const [search, setSearch] = useState("");
  const [willCheck, setWillcheck] = useState(false);
  const [willAmmend, setWillAmmend] = useState(false);
  const [single_cofa_popup, setSingleCofaPopup] = useState(false);

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
  } = useSWR(`${main_url}/lifting/dosh/certificates`, fetcher);

  
  console.log(factory);
  const router = useRouter();

  const handleToggleCreateCertPopup = () => {
    setWillAmmend(!willAmmend)
  }
  // const handleToggleSingleCofa = () => {
  // }
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

  
const handleSingleCofa = (id) => {
  console.log(id)
    console.log("id")

   router.push(`${router.asPath}&single_id=${id}`);
//    router.push({
//   pathname: '/lifting-certification/authorization',
//   query: {
//     ...router.query,
//     single_id: id,
//   },
// });
       setSingleCofaPopup(!single_cofa_popup)

}

const handleCloseSingleCofa = () => {
  router.back();
  setSingleCofaPopup(!single_cofa_popup)
}

  useEffect(() => {
    router.push("?tab=ongoing");
  }, []);
  return (
    <DashboadWrapperComp>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          marginTop: [22, 22, 0],
          marginLeft: [22, 22, 0],
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
          Certificate of Authorization
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

                  color: theme.colors.Gray_300,
                },
              })}
              placeholder="Search Company Name or Certificate No."
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
              width: 253.8856201171875,
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
            handleToggleCreateCertPopup()
          }}
        >
          <img
            css={{
              width: 24,
              height: 24,
              marginRight: 16,
            }}
            src="/svg/factory/plus.svg"
          />
          <div>Add new certificate</div>
        </button> */}

      </div>
      <div
        css={(theme) =>
          mq({
            marginTop: [0, 0, 82],
            // border: [0, 0, `1px solid ${theme.colors.Gray_200}`],
            //   padding: "42px 66px",
            borderRadius: 8,
            width: "100%",
          })
        }
      >
        <div
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
        </div>
        <div>
          {
            isLoading ?  <div css={{
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
<div  css={{
    display: "grid",
     gridTemplateColumns: `repeat(2, 1fr)`,
     alignItems:"top",
         gap: 24,

  }}>
    {
      factory?.data?.map((data, index) => (
          <div key={index} css={ (theme) => ({
            backgroundColor:theme.colors.Primary_50,
            padding:"16px 12px",
            borderRadius:10
          })}
          onClick={() => {
            handleSingleCofa(data?._id)
          }}
          >
            <div css={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}>
            <div>
            <div css={(theme) =>
                    mq({
                      fontSize: [10, 10, 16],
                      fontWeight: 500,
                    
                      color: theme.colors.Gray_900
                          
                    })
                  }>
              {data.company_name}
              </div>
               <div  css={(theme) =>
                    mq({
                      marginTop:8,
                      fontSize: [10, 10, 14],
                      fontWeight: 600,
                    
                      color: theme.colors.Primary_500
                          
                    })
                  }>
              {data.entitled_as}
              </div></div>
              
              
              <div><img
            css={{
              width: 24,
              height: 24,
              
            }}
            src="/svg/lifting/circle-right-arrow.svg"
          /></div>
              </div>
              </div>
      ))
    }
          
</div>
          </div>
          }
         
          
            
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
                width: ["90vw", 524, "80vw"],
                height: "90vh",
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
              <CreateLiftingsCertComp
                close={() => setWillAmmend(false)}
                ammend={() => {
                  handleFormSubmit();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
         <AnimatePresence initial={false}>
        {single_cofa_popup && (
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
              onClick={() => handleCloseSingleCofa()}
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
                width: ["90vw", 524, "80vw"],
                height: "90vh",
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
              <SingleCofaComp
                close={() => handleCloseSingleCofa()}
                ammend={() => {
                  handleFormSubmit();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboadWrapperComp>
  );
};

export default AuthorizationComp;
