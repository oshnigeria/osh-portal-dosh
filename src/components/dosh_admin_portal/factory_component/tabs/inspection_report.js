/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
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
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

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
            css={(theme) =>
              mq({
                marginTop: [24, 24, 54],

                border: [0, 0, `1px solid ${theme.colors.Primary_100}`],
                padding: [0, 0, "50px 32px"],
                width: "90%",
                borderRadius: 8,
              })
            }
          >
            <div
              css={(theme) =>
                mq({
                  fontSize: [16, 16, 32],
                  color: theme.colors.Gray_700,
                  textTransform: "capitalize",
                })
              }
            >
              Inspection report
            </div>
            <div
              css={mq({
                marginTop: [40, 40, 80],
              })}
            >
              <div>
                <div
                  css={{
                    display: "grid",
                    gridTemplateColumns: `repeat(2, 1fr)`,
                    rowGap: [10, 10, 48],
                    columnGap: [8, 8, 50],
                    marginTop: 24,
                  }}
                >
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
                      Name of undertaking
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
                      {single_factory.data.factory._occupier_name}
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
                      Phone number of occupier
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
                      {single_factory.data.factory.phone_number}
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
                      Nature of work
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
                      {
                        single_factory?.data?.factory?.inspection_report
                          ?.nature_of_work_done
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
                      Postal address of occupier
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
                      {single_factory.data.factory.postal_address}
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
                      Inspection date
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
                      {
                        single_factory.data.factory.inspection_report
                          .inspection_date
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
                      Precise address of occupier
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
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
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
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Adults
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          backgroundColor: theme.colors.Gray_100,
                          //   height: 67,
                          color: theme.colors.Gray_700,
                          borderRadius: 8,
                          width: ["70%", "70%", "100%"],
                          padding: "12px 14px",
                        })
                      }
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={mq({
                          fontSize: [14, 14, 20],
                        })}
                      >
                        {single_factory.data.factory.total_employees.adult.male}
                      </div>
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          backgroundColor: theme.colors.Gray_100,
                          //   height: 67,
                          color: theme.colors.Gray_700,
                          borderRadius: 8,
                          width: ["70%", "70%", "100%"],
                          padding: "12px 14px",
                        })
                      }
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Female
                      </div>
                      <div
                        css={mq({
                          fontSize: [14, 14, 20],
                        })}
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
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Youths
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          backgroundColor: theme.colors.Gray_100,
                          //   height: 67,
                          color: theme.colors.Gray_700,
                          borderRadius: 8,
                          width: ["70%", "70%", "100%"],
                          padding: "12px 14px",
                        })
                      }
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={mq({
                          fontSize: [14, 14, 20],
                        })}
                      >
                        {single_factory.data.factory.total_employees.adult.male}
                      </div>
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          backgroundColor: theme.colors.Gray_100,
                          //   height: 67,
                          color: theme.colors.Gray_700,
                          borderRadius: 8,
                          width: ["70%", "70%", "100%"],
                          padding: "12px 14px",
                        })
                      }
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Female
                      </div>
                      <div
                        css={mq({
                          fontSize: [14, 14, 20],
                        })}
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
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Total
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          backgroundColor: theme.colors.Gray_100,
                          //   height: 67,
                          color: theme.colors.Gray_700,
                          borderRadius: 8,
                          width: ["70%", "70%", "100%"],
                          padding: "12px 14px",
                        })
                      }
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={mq({
                          fontSize: [14, 14, 20],
                        })}
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
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Inspection summary
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
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Health and safety report
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
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Recomendations
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
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
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
                      css={(theme) =>
                        mq({
                          padding: "12px 14px",
                          width: ["100%", "100%", 450],
                          fontSize: [14, 14, 20],
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
                        })
                      }
                      {...register("email", { required: true })}
                      placeholder=""
                      type="text"
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_500,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      State reason why document was flagged
                    </div>
                    <div
                      css={{
                        marginTop: 48,
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      <button
                        css={(theme) =>
                          mq({
                            height: [40, 40, 56],
                            borderRadius: 30,
                            width: [140, 140, 356],
                            //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                            padding: "16px 24px",
                            fontSize: [12, 12, 16],
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
              css={(theme) =>
                mq({
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
                })
              }
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
              css={(theme) =>
                mq({
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
                })
              }
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
