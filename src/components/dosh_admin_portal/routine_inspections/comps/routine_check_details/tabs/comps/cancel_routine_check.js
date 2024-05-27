/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React, { useState, useContext } from "react";
import facepaint from "facepaint";
import Cookies from "js-cookie";
import axios from "axios";
import { success_message, error_message } from "@/src/components/toasts";
import { useRouter } from "next/router";
import { cookies_id, main_url } from "@/src/details";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const CancelRoutineCheckPopup = (props) => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const zonal_comments = () => {
    setLoading(true);
    axios
      .patch(
        `${main_url}/dosh/routine-check/cancel`,
        {
          id: router.query.id,
          reason: comment,
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
        props.close();
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    zonal_comments();
  };
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          width: "70%",
        }}
      >
        <div
          css={(theme) => ({
            fontSize: 20,
            fontWeight: 700,
            color: theme.colors.Gray_700,
            textAlign: "center",
          })}
        >
          What is the reason for canceling report?
        </div>
        <div>
          <div
            css={{
              //   marginTop: 28,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              css={{
                marginTop: 20,
              }}
            >
              <textarea
                rows={4}
                css={(theme) =>
                  mq({
                    padding: "12px 14px",
                    width: ["100%", "100%", "100%"],
                    fontSize: [14, 14, 20],
                    color: theme.colors.Gray_400,
                    border: `1px solid ${theme.colors.Gray_200}`,
                    borderRadius: 8,

                    ":focus": {
                      outline: "none",
                      border: `1px solid ${theme.colors.Gray_200}`,

                      padding: "12px 14px",
                      color: theme.colors.Gray_600,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",

                      padding: "12px 14px",
                      color: theme.colors.Gray_400,
                    },
                  })
                }
                placeholder="e.g incorrect notice"
                type="text"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />

              <div
                css={{
                  marginTop: 38,
                  display: "flex",
                  justifyContent: "center",
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
                    handleSubmit();
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
                      <div>Send</div>
                    )}
                  </div>
                </button>
              </div>
              <div
                css={(theme) =>
                  mq({
                    color: theme.colors.Cancel_800,
                    lineHeight: "20px",
                    fontSize: [14, 14, 20],
                    textAlign: "center",
                    fontWeight: 600,
                    marginTop: 36,
                    cursor: "pointer",
                  })
                }
                onClick={() => {
                  props.close();
                }}
              >
                cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelRoutineCheckPopup;
