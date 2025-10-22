/** @jsxImportSource @emotion/react */
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import DashboadWrapperComp from "../../nav_wrapper";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext, useEffect } from "react";
import facepaint from "facepaint";
import { states, months } from "@/src/details";
import { success_message, error_message } from "@/src/components/toasts";
import { backOut } from "framer-motion";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const StateReportComp = () => {
  const [progress, setProgress] = useState({
    min: 0,
    max: 50,
  });
  const [state, setState] = useState("lagos");
    const [month, setMonth] = useState("January");
    const [sel_year, setSelYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [analy_data, setAnalyData] = useState(null);

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
        `${main_url}/dosh/report`,
        {
           state: state,
    month: Number(month),
    year: Number(sel_year)
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

  const data = {
  
}
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

     <div css={{
        marginTop:48
     }}>
        <div css={{
            display: "grid",
             gridTemplateColumns: "repeat(2, 30% 70%)",
              rowGap: 0,
              columnGap: 24,
        }}>
            <div
            css={{
              // display: "grid",
              // gridTemplateColumns: "repeat(4, 1fr)",
             
              width: "100%",
              height: "auto",
               alignItems:"end"
            }}
          >
             <div
              
            >
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
                  onChange={(e) =>  setState(e.target.value)}
                  value={state}
                >
                  <option
                    css={{
                      textTransform: "capitalize",
                    }}
                  >
                    select a state
                  </option>
                  {states.map((state) => (
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
             <div
              css={{
                marginTop:20
              }}
            >
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
                  onChange={(e) =>  setMonth(e.target.value)}
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
                      value={index+1}
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
             <div
               css={{
                marginTop:20
              }}
            >
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
                      width: ["100%", "100%", "90%"],
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
                  onChange={(e) =>  setSelYear(e.target.value)}
                  value={sel_year}
                >
                  
                </input>
              </div>
              
            </div>

<div>

    <div  css={{
                marginTop:20
              }}>
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
                  </button></div>
</div>
            </div>
            <div css={{
              border:"1px solid #B3D4CC",
              borderRadius:16
            }}>
              
              {
                analy_data ? null :  <div  css={(theme) => ({
                                  color: theme.colors.Gray_400,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                  marginTop:50
                                })}>
                          ---Filter to display report---</div>
              }
             
                          

{ analy_data ?
     <div css={{
      display:"flex",
      justifyContent:"center",
      marginTop:50
     }}>
      <div css={{
    width:"70%",
   
     }}>
      <div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
    marginBottom:40

}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
New Factories Registered
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.new_factories_registered ?? 0}
    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Certificates Renewed
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.certificates_renewed ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Certificates Amended  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.certificates_amended ?? 0}
    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Replaced Lost Certificates
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.replaced_lost_certificates ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Certificates Revoked 
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.certificates_revoked ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Revenue Generated
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.revenue_generated ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Total Certificates Issued
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.total_certificates_issued ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Warning Notices Requested
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_warning_notices_requested ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Warning Notices Issued
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_warning_notices_issued ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Prohibitions 
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_prohibitions ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Prosecutions 
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_prosecutions ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Dangerous Occurrences
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_dangerous_occurrences ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Accident Reported
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_accidents_reported ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Accident Investigated
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_accidents_investigated ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Occupational Diseases Reported  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_occupational_diseases_reported ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Total man Days Lost to Accident
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.total_man_days_lost_to_accident ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Fatalities
  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_fatalities ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of NISCN Activities  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_niscn_activities ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Revocations  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_revocations ?? 0}

    </div>

  </div>
</div>
<div css={{
  display:"flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginBottom:40
}}>
  <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 
                                })}>
Number of Temporary Shutdowns  </div>
   <div>
    <div css={(theme) => ({
                                  color: theme.colors.Gray_700,
                                  fontSize: 16,
                                  
                                  textAlign:"center",
                                 padding:"12px 14px",
                                 backgroundColor: theme.colors.Gray_100,
                                 borderRadius:8
                                })}>
{analy_data?.data?.state_report?.number_of_temporary_shutdowns ?? 0}

    </div>

  </div>
</div>





</div>
      </div>
      </div>    : null   }               


                          </div>
        </div>
     </div>
    </DashboadWrapperComp>
  );
};

export default StateReportComp;
