/** @jsxImportSource @emotion/react */
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FactoryContext } from "@/src/context/factoryContext";
import FactoryDocComp from "@/src/components/factoryDetailsComp";
import DeclarationPopup from "./comps/declaration_popup";
import { success_message, error_message } from "@/src/components/toasts";
const VisitationLetterComp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [willAmmend, setWillAmmend] = useState(false);

  const factory = useContext(FactoryContext);
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
  } = useSWR(`${main_url}/dosh/incident/${router.query.id}`, fetcher);

  console.log(single_factory);
  const approve_incident = () => {
    setLoading(true);

    axios
      .get(
        `${main_url}/dosh/incident/approve?id=${router.query.id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        success_message(response?.data.message);
        // factory.set_tab("Inspection report");
        console.log(response.data);
        setTimeout(function () {
          router.push("/incident");
        }, 2000); //Time before execution
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);

        setLoading(false);
      });

    // console.log("ade");
  };
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div
        css={{
          width: "90%",
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
            Inspection Form
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              css={{
                width: "100%",
              }}
            >
              <div
                css={(theme) => ({
                  marginTop: 54,

                  border: `1px solid ${theme.colors.Primary_100}`,
                  padding: "54px 40px",

                  borderRadius: 8,
                })}
              >
                <div
                  css={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <div
                    css={{
                      textAlign: "left",
                      width: 180,
                      fontSize: 14,
                      lineHeight: "20px",
                    }}
                  >
                    _______________________ 
                    _______________________<br/>
                    _______________________
                  </div>
                </div>
                <div
                  css={{
                    marginTop: 102,
                  }}
                >
                  <div
                    css={{
                      textAlign: "left",
                      fontSize: 14,
                      lineHeight: "20px",
                    }}
                  >
                    ___________________________________________________________
                    ___________________________________________________________<br/>
                    ___________________________________________________________
                    ___________________________________________________________<br/>
                    ___________________________________________________________
                    ___________________________________________________________<br/>
                    ___________________________________________________________
                    ___________________________________________________________<br/>
                    ___________________________________________________________
                    ___________________________________________________________<br/>
                    ___________________________________________________________
                    ___________________________________________________________<br/>
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
              setWillAmmend(true);
            }}
          >
            <div
              css={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>Verify & continue</div>
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
                  approve_incident();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitationLetterComp;
