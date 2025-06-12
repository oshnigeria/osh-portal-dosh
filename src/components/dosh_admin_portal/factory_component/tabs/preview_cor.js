/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import React, { useState, useContext, useRef } from "react";
import axios from "axios";

import ReactToPrint from "react-to-print";
import { motion, AnimatePresence, AnimateSharedLayout, color, m } from "framer-motion";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import EmployeeInfoComp from "./regsitration_components/employee_info_comp";
import { main_url, cookies_id } from "@/src/details";
import DeclarationPopup from "./comps/declaration_popup";
import PDFComp from "./comps/certificate";
import { success_message, error_message } from "@/src/components/toasts";
import toast, { Toaster } from "react-hot-toast";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const PreviewCorComp = () => {
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

  const dosh_send_certificate = () => {
    setLoading(true);
    axios
      .patch(
        `${main_url}/dosh/factory/certificate`,
        {
          factory: router.query.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response.data);

        success_message(response?.data.message);
        setTimeout(function () {
          router.push("/?tab=pending");
        }, 2000);
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });
  };

  const zonal_approve_ammendment = () => {
    setLoading(true);

    axios
      .get(
        `${main_url}/dosh/factory/ammendment/approve?factory=${router.query.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        success_message(response?.data.message);
        if (router.query.type) {
          router.push(`/${router.query.type}`);
        } else {
          router.push("/");
        }
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);

        setLoading(false);
      });
  };

  const zonal_approve_replacements_renewals = (event) => {
    setLoading(true);

    axios
      .get(
        `${main_url}/dosh/factory/certificate/mutation/approve?event=${router.query.type}&factory=${router.query.id}
        `,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        success_message(response?.data.message);
        if (router.query.type) {
          router.push(`/${router.query.type}`);
        } else {
          router.push("/");
        }
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);

        setLoading(false);
      });
  };
  const {
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/factory/${router.query.id}`, fetcher);

  const {
    data: single_factory_doc,
    error: doc_error,
    isLoading: doc_isLoading,
  } = useSWR(
    isLoading
      ? null
      : `${main_url}/dosh/factory-docs?factory_id=${single_factory.data.factory._id}`,
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

  console.log(single_factory)
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
            css={(theme) => ({
              marginTop: 54,

              border: `1px solid ${theme.colors.Primary_100}`,
              padding: "50px 32px",

              borderRadius: 8,
            })}
          >
            <div
              css={{
                fontSize: 32,
              }}
            >
              CoR Preview
            </div>
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
 background:theme.colors.Primary_25,
 background: "linear-gradient(90deg,#D1E5E0 0%, rgba(255, 255, 255, 1) 50%, #D1E5E0 100%)",
                    backgroundRepeat: "no-repeat",
                    //   width: "100vw",
                    height: 900,
                    border: "20px inset #66A898"
                  })}
                >
                  <div
                    css={{
                      width: "60%",
                    }}
                  >
                    <div
                      css={{
                        display: "grid",
                        gridTemplateColumns: `repeat(3, 1fr)`,
                        rowGap: 48,
                        alignItems: "center",
                        columnGap: 50,
                        marginTop: 0,
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
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 40,
                        }}
                      >
                        <img
                          src="/cert/coat_of_arms.png"
                          css={mq({
                            width: 102,
                            // height: [42, 42, 82],
                          })}
                        />
                      </div>
                      <div
                        css={{
                          marginBottom: 8,
                          fontSize: 10,
                          textAlign: "right",
                          fontFamily: "Times New Roman",
                          fontWeight: 700,
                          color:"#111"
                        }}
                      >
                        Form LAB/F/2
                      </div>
                    </div>

                    <div
                      css={{
                        textAlign: "center",
                        marginTop: 12,
                        fontFamily: "Times New Roman",
                        fontWeight: 700,
                        fontSize: 12,
                        color:"#111"
                      }}
                    >
                      FEDERAL REPUBLIC OF NIGERIA
                    </div>
                    <div
                      css={{
                        textAlign: "center",
                        marginTop: 4,
                        fontFamily: "Times New Roman",
color:"#111",
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
                        })
                      }
                    >
                      CERTIFICATE OF REGISTRATION OF FACTORY
                    </div>
                    <div
                      css={(theme) => ({
                        textAlign: "center",
                        marginTop: 8,
                        fontFamily: "Times New Roman",
                        color: theme.colors.Gray_800,
                        fontSize: 12,
                        color:"#111"
                      })}
                    >
                      Section 2(2) ; 3 (2)
                    </div>
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "right",
                        marginTop: 18,
                        color:"#111"
                      }}
                    >
                      <div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Treasury Reciept No :
                          <span
                            css={{
                              fontWeight: 700,
                              marginLeft: 24,
                            }}
                          >
                            {
                              single_factory?.data?.factory
                                ?.treasure_reciept_number
                            }
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Certificate Number :{" "}
                          <span
                            css={{
                              fontWeight: 700,
                              marginLeft: 24,
                            }}
                          >
                            {
                              single_factory?.data?.factory
                                ?.cert_no
                            }
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Date of issue :{" "}
                          <span
                            css={{
                              fontWeight: 700,
                              marginLeft: 24,
                            }}
                          >
                            {formatDateToCustom(
                              single_factory?.data?.factory
                                ?.year_of_last_renewal
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div
                      css={(theme) => ({
                        marginTop: 28,
                        fontFamily: "Times New Roman",
                        color: theme.colors.Gray_800,
                        fontSize: 18,
                        textAlign:"center",
                        fontWeight:500
                      })}
                    >
                      The Registrar - Federal Ministry of Labour and Employment
                     
                    </div>

                    <div css={(theme) => ({
                        marginTop: 16,
                        fontFamily: "Times New Roman",
                        color: theme.colors.Gray_800,
                        fontSize: 12,
                        fontStyle: "italic",
                        textAlign:"center",
                        fontWeight:700
                      })}>
                      Certificate of Recognition awarded to
                      </div> */}
                    <div
                      css={theme => ({
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 18,
                        fontFamily: "Times New Roman",
                          color: theme.colors.Gray_800,
                      })}
                    >
                      <div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Name of Occupier :{" "}
                          <span
                            css={ theme => ({
                              fontWeight: 700,
                              marginLeft: 16,
                              color: theme.colors.Warning_600,
                            })}
                          >
                            {single_factory?.data?.factory?.occupier_name}
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          
                          
                          }}
                        >
                          Registration No :{" "}
                          <span
                            css={{
                              fontWeight: 700,
                              marginLeft: 16,
                            }}
                          >
                            {
                             ""
                            }
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Postal Address of Occupier :{" "}
                          <span
                            css={{
                              fontWeight: 700,
                              marginLeft: 16,
                            }}
                          >
                            {single_factory?.data?.factory?.postal_address}
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Location of Factory :{" "}
                          <span
                            css={{
                              fontWeight: 700,
                              marginLeft: 16,
                            }}
                          >
                            {single_factory?.data?.factory?.address}
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Purpose or work in respect of which premises have been
                          registered :
                          <span
                            css={{
                              fontWeight: 700,
                              marginLeft: 16,
                            }}
                          >
                            {single_factory?.data?.factory?.type}
                          </span>
                        </div>
                        <div
                          css={{
                            marginBottom: 8,
                            fontSize: 12,
                          }}
                        >
                          Period of validity of Certificate :{" "}
                          <span
                            css={{
                              fontWeight: 700,
                              marginLeft: 16,
                            }}
                          >
                            3 years
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "right",
                        marginTop: 30,
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
                            src="/cert/Union.svg"
                            css={{
                              width: 60,
                              height: 20,
                            }}
                          />
                        </div>
                        <div
                          css={theme => ({
                            marginTop: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            textAlign: "center",
                              color: theme.colors.Gray_800,
                          })}
                        >
                          Director’s name here
                        </div>
                        <div
                          css={ theme => ({
                            marginTop: 8,
                            fontSize: 12,
                            textAlign: "center",
                              color: theme.colors.Gray_800,
                          })}
                        >
                          Director’s name here
                        </div>
                      </div>
                    </div>

                    <div
                      css={{
                        marginTop: 24,
                        // marginBottom:-50
                      }}
                    >
                      <div
                        css={theme =>( {
                          marginTop: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          textAlign: "center",
                            color: theme.colors.Primary_400,
                        })}
                      >
                        NOTES
                      </div>
                      <ol
                        css={theme => ({
                          fontFamily: "Times New Roman",
                          fontSize: 12,
                            color: theme.colors.Gray_800,
                        })}
                      >
                        <li>
                          This Certificate is issued under and solely for the
                          purpose of the Factories Act; 2004 and valid only in
                          respect of the factory occupier and purpose or work
                          name above.
                        </li>
                        <li>
                          If at any time after the issue of this Certificate any
                          change occurs in respect of the particulars set out
                          above, the occupier to which this notice relates must
                          inform the Director of Factories Forthwith, in
                          writing, of such changes. Failure to do so is a
                          punishable offence under this Act.{" "}
                        </li>

                        <li>
                          This Certificate must be attached to a flap at the
                          front of the General Register, abd the Number and Date
                          of issue of ths Certificate entered in paragraph 4 of
                          Past 1 of hte General Register{" "}
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            css={{
              marginTop: 64,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ReactToPrint
              trigger={() => (
                <button
                  css={(theme) => ({
                    height: [40, 40, 56],
                    borderRadius: 30,
                    width: [140, 140, 356],
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

            <button
              css={(theme) => ({
                height: [40, 40, 56],
                borderRadius: 30,
                width: [140, 140, 356],
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
              onClick={() => {
                setWillAmmend(true);
              }}
            >
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>Send certificate</div>
                <div
                  css={{
                    marginLeft: 8,
                  }}
                >
                  <img
                    css={mq({
                      width: [12, 12, 24],
                      height: [16, 16, 24],
                    })}
                    src="/svg/registration/left_arrow.svg"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

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
                loading={isLoading}
                ammend={() => {
                  switch (router.query.type) {
                    case "amendment":
                      zonal_approve_ammendment();
                      break;
                    case "renewal":
                      zonal_approve_replacements_renewals(router.query.id);
                      break;
                    case "replacement":
                      zonal_approve_replacements_renewals(router.query.id);
                      break;
                    default:
                      dosh_send_certificate();
                  }
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreviewCorComp;
