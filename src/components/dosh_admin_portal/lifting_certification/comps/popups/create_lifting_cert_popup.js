/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import React, { useState, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useSWR, { useSWRConfig, mutate } from "swr";
import { AuthContext } from "@/src/context/authContext";
import { success_message, error_message } from "@/src/components/toasts";
import DeclarationPopup from "../../../factory_component/tabs/comps/declaration_popup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import { compliance_with_options, entitled_as_options } from "../details";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const CreateLiftingsCertComp = () => {
  if (typeof window !== "undefined") null;
  const router = useRouter();
  const auth = useContext(AuthContext);
  console.log(auth.dec_token);
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
  const [cert_no, setCert_no] = useState("");

  const [willAmmend, setWillAmmend] = useState(false);
  const [factory, setFactory] = useState("");
   const [file_key, setFileKey] = useState("");


  const [natureOfWorkDone, setNatureOfWorkDone] = useState(""); // Required
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionSummary, setInspectionSummary] = useState("");
  const [healthSafetyReport, setHealthSafetyReport] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [state, setState] = useState("");
  const [event, setEvent] = useState(router.query.type);
  const [loading, setLoading] = useState(false);


const [selectedFiles, setSelectedFiles] = useState([]);

  const [COAR, setCOAR] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [treasure_receipt_number, setTreasureRecieptNumber] = useState("");
  const [location, setLocation] = useState("");
  const [compliance_with, setComplianceWith] = useState("");
  const [entitled_as, setEntitledAs] = useState("");
  const [identification_num, setIdentificationNum] = useState("");
  const [area_of_specialization, setAreaOfSpecialization] = useState("");
  const [validity_period, setValidityPeriod] = useState("");
    const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const [authorization_doc, setAuthorizationDoc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
 const files = Array.from(e.target.files); // convert FileList → array

  setSelectedFiles(files);

  // // store file names
  // const fileNames = files.map((file) => file.name);
  // setAuthorizationDocs(fileNames);

  // console.log(files);

  
  };

const uploadFiles = async (url, files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file); 
    // "files" = field name (your backend must expect this)
  });

  try {
    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload success:", res.data);
    return res.data;
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
};
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();





   const upsert_cofa = (id) => {
    setLoading(true);

    axios
      .post(
        `${main_url}/lifting/certificate`,
        {

  
  certificate_of_authorization_on_regulation: COAR,
  treasury_receipt_no: treasure_receipt_number,
  company_name: company_name,
  location: location,
  compliance_with: compliance_with,
  entitled_as: entitled_as,
  identification_no: identification_num,
  area_of_specialisation: area_of_specialization,
  period_of_validity_of_authorisation: {
    start_date: start_date,
    end_date: end_date
  
}
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        },
      )
      .then(function (response) {
        success_message(response?.data.message);
        setFactory(response?.data?.data?._id);
        handleUploadFlow()
        // router.push("/");
        console.log("fac");
        console.log(response?.data);

        console.log("fac");
        if (response?.data?.factory === null) {
          setFactory(null);
        } else {
          setFactory(response?.data?.data?.factory?._id);
        }

        setState(response?.data?.data?.factory?.state);
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);

        setLoading(false);
      });

    // console.log("ade");
  };
 
  const handleFormSubmit = () => {
  

    upsert_cofa()
  };

  const get_upload_url = async () => {
  try {
    const res = await axios.get(
      `${main_url}/lifting/certificate/doc/upload-url`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get(cookies_id)}`,
        },
      }
    );

    return res.data.data; // 👈 return everything (url, file_key, etc.)
  } catch (error) {
    error_message(error?.response?.data?.message);
    throw error;
  }
};

  const save_uploaded_doc = async (title, file_path, certificate_id) => {
  try {
    const res = await axios.post(
      `${main_url}/lifting/certificate/doc/upload-url`,
      {
        title,
        file_path,
        certificate_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get(cookies_id)}`,
        },
      }
    );
success_message(`${title} uploaded successfully 🚀`)
    return res.data;
  } catch (error) {
    error_message(error?.response?.data?.message);
    throw error;
  }
};


  const handleUploadFlow = async () => {
  if (!selectedFiles.length) return;

  setLoading(true);

  try {
    for (const file of selectedFiles) {
      // 1️⃣ Get upload URL
      const uploadData = await get_upload_url();

      const uploadUrl = uploadData?.url; // depends on your API
      const fileKey = uploadData?.file_key;

      // 2️⃣ Upload file (single file at a time)
      await uploadFiles(uploadUrl, [file]);

      // 3️⃣ Save document
      await save_uploaded_doc(
        file.name,     // title
        fileKey,       // file_path (usually from step 1)
        factory
      );
      
    }

    console.log("All files uploaded successfully 🚀");
    success_message("All files uploaded successfully 🚀")
  } catch (err) {
    console.error("Upload flow failed:", err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      css={{
        // display: "flex",
        // justifyContent: "center",
        height: "100vh",
        width: "94%",
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

              // border: [0, 0, `1px solid ${theme.colors.Primary_100}`],
              padding: "16px 16px",
              width: "100%",
              borderRadius: 8,
            })
          }
        >
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
              New Certificate of Authorization
            </div>
            <div></div>
          </div>
          <div
            css={mq({
              marginTop: [24, 24, 80],
            })}
          >
            <div
              css={{
                display: "grid",
                gridTemplateColumns: `repeat(2, 1fr)`,
                alignItems: "top",
                gap: 24,
              }}
            >
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
                  Certificate of Authorization on Regulation
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
                    onChange={(e) => setCOAR(e.target.value)}
                    value={COAR}
                  />
                </div>
              </div>
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
                  Treasury Receipt no
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
                    onChange={(e) => setTreasureRecieptNumber(e.target.value)}
                    value={treasure_receipt_number}
                  />
                </div>
              </div>

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
                  Company Name
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
                    onChange={(e) => setCompany_name(e.target.value)}
                    value={company_name}
                  />
                </div>
              </div>

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
                  Location
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
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />
                </div>
              </div>

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
                  Compliance with
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
                    onChange={(e) => setComplianceWith(e.target.value)}
                    value={compliance_with}
                  >

                    <>
                    
                  {compliance_with_options.map((user, index) => (<option  key={index}>
                        {user}
                      </option>))
                      
                  }
                     
                 
                  </>
                  </select>
                </div>
              </div>
            

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
                  Identification no
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
                    onChange={(e) => setIdentificationNum(e.target.value)}
                    value={identification_num}
                  />
                </div>
              </div>
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
                  Entitled as
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
                        width: ["100%", "100%", "70%"],
                         
    maxWidth: "100%",
     overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
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
                    onChange={(e) => setEntitledAs(e.target.value)}
                    value={entitled_as}
                  >

                    <>
                    
                  {entitled_as_options.map((user, index) => (<option  key={index}>
                        {user}
                      </option>))
                      
                  }
                     
                 
                  </>
                  </select>
                </div>
              </div>
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
                  Area of specialisation
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
                    onChange={(e) => setAreaOfSpecialization(e.target.value)}
                    value={area_of_specialization}
                  />
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
                  Period of validity of Authorisation
                </div>
                <div css={{
                  marginTop:20
                }}>
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_500,
                      lineHeight: "20px",
                      fontSize: [14, 14, 16],
                    })
                  }
                >
                  Start date
                </label>
                <div
                  css={{
                    marginTop: 8,
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
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={start_date}
                  />
                </div></div>

                 <div css={{
                  marginTop:20
                }}>
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_500,
                      lineHeight: "20px",
                      fontSize: [14, 14, 16],
                    })
                  }
                >
                  End date
                </label>
                <div
                  css={{
                    marginTop: 8,
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
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={end_date}
                  />
                </div></div>
              </div>
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
                  Add documents
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
                        border: "none",
                        borderRadius: 8,

                        ":focus": {
                          outline: "none",
                          border: "none",

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
                    multiple 
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          css={{
            marginTop: 64,
            paddingBottom: 64,
            display: "flex",
            justifyContent: "center",
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
                  handleFormSubmit();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateLiftingsCertComp;
