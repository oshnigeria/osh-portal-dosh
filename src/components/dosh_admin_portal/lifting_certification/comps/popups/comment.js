/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
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

const CommentCertComp = (props) => {
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


  const [comments, setComments] = useState(""); // Required
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





   const add_comments = () => {
    setLoading(true);

    axios
      .post(
        `${main_url}/lifting/dosh/comment`,
        {

  
  id: router.query.single_id,
    comment: comments

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
        props.close()
        setWillAmmend(false)
        // setFactory(response?.data?.data?._id);
        // handleUploadFlow()
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
  

    add_comments()
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
        height: "100%",
        width: "100%",
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
              padding: "0px 0px",
              width: "100%",
              borderRadius: 8,
            })
          }
        >
          <div
            css={{
              display: "flex",
              justifyContent: "center",
            }}
          >
           
            <div
              css={(theme) =>
                mq({
                  fontSize: [16, 16, 16],
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
              marginTop: 16,
            })}
          >
            <div
              css={{
                display:"flex",
                justifyContent:"center"
              }}
            >
             
                
                <div
                  css={{
                  width:"70%"
                  }}
                >
                  <textarea
                  rows={10}
                //   col={20}
                    css={(theme) =>
                      mq({
                        padding: "12px 14px",
                        width: ["100%", "100%", "100%"],
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
                    placeholder="Add a comment..."
                    type="text"
                    onChange={(e) => setComments(e.target.value)}
                    value={comments}
                  />
                </div>
            
              

              
                
              
             
            </div>
          </div>
        </div>
        <div
          css={{
            marginTop: 16,
            paddingBottom: 64,
            display: "flex",
            justifyContent: "center",
            width:"100%",
          }}
        >
          <button
            css={(theme) =>
              mq({
                height: [40, 40, 48],
                borderRadius: 30,
                width: ["auto", "auto", "70%"],
                //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                padding: ["12px 16px", "12px 16px", "16px 24px"],
                fontSize: [12, 12, 20],
                cursor: "pointer",
              marginLeft:24,
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
                <div css={{
                    fontSize:16
                }}>Send comment</div>
               
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

export default CommentCertComp;
