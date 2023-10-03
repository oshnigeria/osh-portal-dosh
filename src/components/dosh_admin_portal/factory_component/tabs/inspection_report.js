/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import React, { useState, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import useSWR, { useSWRConfig, mutate } from "swr";
import { success_message, error_message } from "@/src/components/toasts";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import EmployeeInfoComp from "./regsitration_components/employee_info_comp";
import { main_url, cookies_id } from "@/src/details";
import DeclarationPopup from "./comps/declaration_popup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FactoryContext } from "@/src/context/factoryContext";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const InspectionReportComp = () => {
  const [value, setValue] = useState("");
  const [willAmmend, setWillAmmend] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const factory = useContext(FactoryContext);
  const router = useRouter();

  const dosh_comments = () => {
    setLoading(true);
    axios
      .patch(
        `${main_url}/dosh/factory/reg-comment`,
        {
          id: router.query.id,
          comment: comment,
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
        setComment("");
        success_message(response?.data.message);

        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });
  };
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

  console.log(single_factory);

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
        <div>
          <div
            css={(theme) => ({
              marginTop: 54,

              border: `1px solid ${theme.colors.Primary_100}`,
              padding: "50px 32px",
              width: "90%",
              borderRadius: 8,
            })}
          >
            <div
              css={{
                fontSize: 32,
              }}
            >
              Inspection report
            </div>
            <div
              css={{
                marginTop: 80,
              }}
            >
              <div>
                <div
                  css={{
                    display: "grid",
                    gridTemplateColumns: `repeat(2, 1fr)`,
                    rowGap: 48,
                    columnGap: 50,
                    marginTop: 24,
                  }}
                >
                  <div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Name of undertaking
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory._occupier_name}
                    </div>
                  </div>

                  <div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Phone number of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.phone_number}
                    </div>
                  </div>

                  <div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Nature of work
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.type}
                    </div>
                  </div>

                  <div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Postal address of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.postal_address}
                    </div>
                  </div>
                  <div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Inspection date
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {
                        single_factory.data.factory.inspection_report
                          .inspection_date
                      }
                    </div>
                  </div>
                  <div>
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Precise address of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.address}
                    </div>
                  </div>
                </div>
                <div
                  css={{
                    borderBottom: "1px solid #EAECF0",
                    margin: "48px 0px",
                  }}
                ></div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Employee Information
                  </div>
                  <div
                    css={{
                      display: "grid",
                      gridTemplateColumns: `repeat(3, 1fr)`,
                      alignItems: "center",
                      width: "50%",
                      height: "auto",
                      rowGap: 48,
                      marginTop: 24,
                      columnGap: 50,
                    }}
                  >
                    {" "}
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Adults
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {single_factory.data.factory.total_employees.adult.male}
                      </div>
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Female
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {
                          single_factory.data.factory.total_employees.adult
                            .female
                        }
                      </div>
                    </div>
                  </div>

                  <div
                    css={{
                      display: "grid",
                      gridTemplateColumns: `repeat(3, 1fr)`,
                      alignItems: "center",
                      width: "50%",
                      height: "auto",
                      rowGap: 48,
                      marginTop: 24,
                      columnGap: 50,
                    }}
                  >
                    {" "}
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Youths
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {single_factory.data.factory.total_employees.adult.male}
                      </div>
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Female
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {
                          single_factory.data.factory.total_employees.adult
                            .female
                        }
                      </div>
                    </div>
                  </div>

                  <div
                    css={{
                      display: "grid",
                      gridTemplateColumns: `repeat(3, 1fr)`,
                      alignItems: "center",
                      width: "50%",
                      height: "auto",
                      rowGap: 48,
                      marginTop: 24,
                      columnGap: 50,
                    }}
                  >
                    {" "}
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      Total
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {single_factory.data.factory.total_employees.youth.male}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div
                  css={{
                    borderBottom: "1px solid #EAECF0",
                    margin: "48px 0px",
                  }}
                ></div>

                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Inspection summary
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                    dangerouslySetInnerHTML={{
                      __html:
                        single_factory?.data?.factory?.inspection_report
                          ?.inspection_summary,
                    }}
                  ></div>
                </div>

                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Health and safety report
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                    dangerouslySetInnerHTML={{
                      __html:
                        single_factory?.data.factory?.inspection_report
                          ?.health_safety_report,
                    }}
                  ></div>
                </div>

                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Recomendations
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                    dangerouslySetInnerHTML={{
                      __html:
                        single_factory?.data?.factory?.inspection_report
                          ?.recommendations,
                    }}
                  ></div>
                </div>

                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Comment
                  </div>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <textarea
                      rows={5}
                      css={(theme) => ({
                        padding: "12px 14px",
                        width: ["100%", "100%", 450],
                        fontSize: 20,
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

                        ":focus": {
                          outline: "none",
                          border: `1px solid ${theme.colors.Gray_200}`,

                          padding: "12px 14px",
                          color: theme.colors.Gray_400,
                        },
                        ":placeholder ": {
                          outline: "none",
                          border: "none",

                          padding: "12px 14px",
                          color: theme.colors.Gray_400,
                        },
                      })}
                      {...register("email", { required: true })}
                      placeholder=""
                      type="text"
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                    <div
                      css={{
                        marginTop: 48,
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      <button
                        css={(theme) => ({
                          height: 56,
                          borderRadius: 30,
                          width: 356,
                          //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                          padding: "16px 24px",
                          fontSize: 20,
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
                          dosh_comments();
                        }}
                      >
                        <div
                          css={{
                            display: "flex",
                            marginTop: 4,
                            alignItems: "center",
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
                                css={{
                                  width: 24,
                                  height: 24,
                                }}
                              >
                                <img src="/svg/loader/loader.svg" />
                              </div>
                            </div>
                          ) : (
                            <div>Send comment</div>
                          )}
                        </div>
                      </button>
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
              justifyContent: "right",
            }}
          >
            <button
              css={(theme) => ({
                height: 56,
                borderRadius: 30,
                width: 356,
                //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                padding: "16px 24px",
                fontSize: 20,
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
                // factory_details.add_factory_details(formData);
                factory.set_tab("CoR draft");
              }}
            >
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
                    css={{
                      width: 24,
                      height: 24,
                    }}
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
                ammend={() => {
                  setWillAmmend(false);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InspectionReportComp;
