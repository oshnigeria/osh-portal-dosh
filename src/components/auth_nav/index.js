/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { cookies_id } from "@/src/details";
import { AuthContext } from "@/src/context/authContext";

import facepaint from "facepaint";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const AuthNavWrapper = (props) => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  return (
    <div>
      <div
        css={(theme) =>
          mq({
            backgroundColor: [
              theme.colors.Primary_500,
              theme.colors.Primary_500,
              theme.colors.Primary_500,
            ],
            padding: ["16px 16px", "16px 16px", "40px 140px"],
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })
        }
      >
        <div>
          <img
            css={mq({
              width: ["auto", "auto", 266],
              height: [32, 40, 50],
            })}
            src={"/svg/auth/logo_white.svg"}
          />
        </div>
        <div>
          {auth.isLoggedin ? (
            <div
              css={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                css={{
                  marginRight: 42,
                }}
              >
                <img
                  css={{
                    width: 32,
                    height: 32,
                  }}
                  src={"/svg/auth/notification.svg"}
                />
              </div>
              <div onClick={() => auth.remove_token()}>
                <img
                  css={{
                    width: 32,
                    height: 32,
                  }}
                  src={"/svg/auth/account.svg"}
                />
              </div>
            </div>
          ) : (
            <div>
              <button
                css={(theme) =>
                  mq({
                    width: [100, 100, 192],
                    height: 56,
                    borderRadius: 30,
                    //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                    fontSize: [14, 14, 16],
                    cursor: "pointer",

                    fontWeight: 600,
                    lineHeight: "17px",
                    border: "none",
                    color: theme.colors.Primary_500,
                    backgroundColor: "#fff",
                  })
                }
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default AuthNavWrapper;
