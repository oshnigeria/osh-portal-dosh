/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useState, useContext } from "react";
import AuthNavWrapper from "../auth_nav";
import { useForm } from "react-hook-form";
import facepaint from "facepaint";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { success_message, error_message } from "../toasts";
import toast, { Toaster } from "react-hot-toast";
import { main_url, cookies_id } from "@/src/details";
import { AuthContext } from "@/src/context/authContext";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const SignInComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authen = useContext(AuthContext);

  const login = (e) => {
    setLoading(true);

    axios
      .post(
        `${main_url}/dosh/account/wr/sign-in`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        success_message(response?.data.message);
        Cookies.set(`${cookies_id}`, `${response.data.token}`, {
          expires: 1,
        });
        authen.set_token();
        setLoading(false);
        setTimeout(function () {
          router.push("/");
        }, 2000);
      })
      .catch(function (error) {
        error_message(error.response.data.message);
        console.log(error);
        setLoading(false);
      });

    // console.log("ade");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <AuthNavWrapper>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div
        css={mq({
          padding: ["16px 16px", "16px 16px", " 40px 146px"],
        })}
      >
        <div>
          <div
            css={mq({
              display: ["none", "none", "flex"],

              width: "100%",
            })}
          >
            <div>
              <img src={"/svg/auth/arrow_left.svg"} />
            </div>
            <div
              css={(theme) => ({
                textAlign: "center",
                width: "100%",
                fontSize: 24,
                fontWeight: 700,
              })}
            >
              Dosh registration portal
            </div>
          </div>
          <div
            css={(theme) =>
              mq({
                colors: theme.colors.Gray_600,
                marginTop: [30, 30, 50],
                textAlign: ["left", "left", "center"],
                width: "100%",
                fontSize: [20, 20, 40],
                fontWeight: 700,
              })
            }
          >
            Welcome back
          </div>
          <form onSubmit={handleSubmit((e) => login(e))}>
            <div
              css={mq({
                display: ["block", "block", "flex"],
                justifyContent: ["left", "left", "center"],
                alignItems: "center",

                marginTop: 28,
              })}
            >
              <div>
                <div>
                  <label
                    css={(theme) => ({
                      colors: theme.colors.Gray_600,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Email
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
                          width: ["90%", "90%", 450],
                          fontSize: 18,
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
                      {...register("email", { required: true })}
                      placeholder="olivia@untitledui.com"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  {errors.email && (
                    <span
                      css={{
                        fontSize: 12,
                        marginTop: 12,
                        color: "red",
                      }}
                    >
                      * this field is required
                    </span>
                  )}
                </div>

                <div
                  css={{
                    marginTop: 40,
                  }}
                >
                  <label
                    css={(theme) => ({
                      colors: theme.colors.Gray_600,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Create password
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
                          width: ["90%", "90%", 450],
                          fontSize: 18,
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
                      {...register("password", { required: true })}
                      placeholder="*****"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  {errors.password && (
                    <span
                      css={{
                        fontSize: 12,
                        marginTop: 12,
                        color: "red",
                      }}
                    >
                      * this field is required
                    </span>
                  )}
                </div>
                <div
                  css={(theme) =>
                    mq({
                      color: theme.colors.Primary_500,
                      fontSize: [12, 12, 20],
                      marginTop: 20,
                      fontWeight: 700,
                      textAlign: "right",
                    })
                  }
                >
                  Forgot password?
                </div>
                <div
                  css={mq({
                    marginTop: 72,
                    display: "flex",
                    justifyContent: "center",
                  })}
                >
                  <button
                    css={(theme) =>
                      mq({
                        width: ["100%", "100%", 450],
                        height: 56,
                        borderRadius: 30,
                        padding: ["10px 16px", "10px 16px", "16px 24px"],
                        fontSize: [14, 14, 16],
                        fontWeight: 600,
                        lineHeight: "17px",
                        border: "none",
                        color: theme.colors.Gray_50,
                        backgroundColor:
                          email && password
                            ? theme.colors.Primary_800
                            : theme.colors.Primary_300,
                      })
                    }
                    type="submit"
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
                      <div>Log in</div>
                    )}
                  </button>
                </div>
                <div
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_800,
                      fontSize: [14, 14, 20],
                      marginTop: [51, 51, 74],
                      fontWeight: 400,
                      textAlign: "center",
                    })
                  }
                >
                  Don’t have an account?{" "}
                  <span
                    css={(theme) =>
                      mq({
                        color: theme.colors.Primary_500,
                        fontSize: [14, 14, 20],
                        cursor: "pointer",
                        fontWeight: 700,
                      })
                    }
                    onClick={() => router.push("/signup")}
                  >
                    Create account
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthNavWrapper>
  );
};

export default SignInComp;
