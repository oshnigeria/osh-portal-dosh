/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { main_url } from "@/src/details";
import { cookies_id } from "@/src/details";
import { success_message, error_message } from "../toasts";
import { useRouter } from "next/router";
import facepaint from "facepaint";
import axios from "axios";
import Cookies from "js-cookie";

import { FactoryContext } from "@/src/context/factoryContext";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const FactoryDocComp = (props) => {
  const [options, setOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const flag_document = () => {
    setLoading(true);
    axios
      .patch(
        `${main_url}/dosh/factory-docs?id=${router.query.id}&is_flagged=false`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        success_message(response?.data.message);
        setTimeout(function () {
          router.push("/");
        }, 2000);
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div
        css={(theme) => ({
          width: "auto",
          height: "auto",
          borderRadius: 16,
          marginBottom: 22,
          marginRight: 20,
          padding: "18px 18px",
          backgroundColor: theme.colors.Primary_50,
        })}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              css={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  css={{
                    width: 18,
                    height: 20,
                  }}
                  src="/svg/dashboard/document.svg"
                />
              </div>
              <div
                css={(theme) =>
                  mq({
                    marginLeft: 16,
                    fontSize: [12, 12, 16],
                    color: theme.colors.Gray_700,
                  })
                }
              >
                {props.name}.{props.type}
              </div>
            </div>
          </div>

          <div
            css={{
              position: "relative",
            }}
            onClick={() => setOptions(!options)}
          >
            <img
              css={{
                width: 24,
                height: 24,
              }}
              src="/svg/dashboard/more_circle.svg"
            />
            <AnimatePresence initial={false}>
              {options && (
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      ease: "easeInOut",
                      // duration: 0.4,
                    }}
                    id="location"
                    css={(theme) => ({
                      position: "absolute",
                      borderRadius: 4,

                      width: "auto",
                      height: "auto",
                      boxShadow:
                        "0px 0px 0px 0px rgba(107, 133, 127, 0.20), 0px 0px 1px 0px rgba(107, 133, 127, 0.19), 2px 2px 3px 0px rgba(107, 133, 127, 0.17), 4px 4px 4px 0px rgba(107, 133, 127, 0.10), 7px 8px 4px 0px rgba(107, 133, 127, 0.03), 12px 12px 5px 0px rgba(107, 133, 127, 0.00)",
                      zIndex: 50,

                      right: 24,
                      top: 12,

                      margin: "auto",

                      backgroundColor: "#fff",
                    })}
                  >
                    <div
                      css={{
                        padding: "24px 44px",
                      }}
                    >
                      <a
                        href={
                          router.query.type === "incident"
                            ? `${main_url}/inventory/incident/wr/file?incident_id=${props.factory_id}&file_key=${props.file_key}&doc_type=${props.doc_type}`
                            : `${main_url}/inventory/factory/wr/file?factory_id=${props.factory_id}&file_key=${props.file_key}&doc_type=${props.doc_type}`
                        }
                        target="blank"
                        css={(theme) => ({
                          display: "flex",
                          cursor: "pointer",
                          textDecoration: "none",
                          color: theme.colors.Gray_900,
                        })}
                        // onClick={() => {
                        //   props.download();
                        // }}
                      >
                        Download
                      </a>
                    </div>
                    {/* <div
                      css={{
                        padding: "24px 44px",
                        cursor: "pointer",
                        display:
                          router.pathname == "/dashboard/trash"
                            ? "none"
                            : "block",
                      }}
                      onClick={() => props.delete()}
                    >
                      Delete
                    </div> */}
                    <div
                      css={{
                        padding: "24px 44px",
                        cursor: "pointer",
                        display:
                          router.pathname == "/dashboard/trash"
                            ? "block"
                            : "none",
                      }}
                      onClick={() => props.restore()}
                    >
                      Restore
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          css={(theme) =>
            mq({
              height: [40, 56],
              borderRadius: 30,
              width: [140, 356],
              marginBottom: 22,
              //   padding: ["10px 16px", "10px 16px", "16px 24px"],
              padding: "16px 24px",
              fontSize: [12, 14],
              alignItems: "center",
              cursor: "pointer",
              marginRight: 20,
              fontWeight: 600,
              lineHeight: "17px",
              border: `1px solid ${theme.colors.Primary_500}`,
              display: "flex",
              justifyContent: "center",
              color: theme.colors.Primary_500,
              backgroundColor: "#fff",
            })
          }
          onClick={() => {
            flag_document();
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>Flag</div>
          </div>
        </button>

        {/* <button
          css={(theme) =>
            mq({
              height: [40, 56],
              borderRadius: 30,
              width: [140, 356],
              //   padding: ["10px 16px", "10px 16px", "16px 24px"],
              padding: "16px 24px",
              fontSize: [12, 14],
              alignItems: "center",
              cursor: "pointer",
              marginRight: 20,
              fontWeight: 600,
              lineHeight: "17px",
              border: 0,
              display: "flex",
              justifyContent: "center",
              color: "#fff",
              backgroundColor: theme.colors.Primary_500,
            })
          }
          onClick={() => {
            factory_details.set_tab("Upload document");
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>Approve</div>
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default FactoryDocComp;
