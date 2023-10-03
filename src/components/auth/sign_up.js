/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useState, useContext } from "react";
import AuthNavWrapper from "../auth_nav";
import { useForm } from "react-hook-form";
import facepaint from "facepaint";
import { useRouter } from "next/router";
import { success_message, error_message } from "../toasts";
import toast, { Toaster } from "react-hot-toast";
import { main_url } from "@/src/details";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const SignUpComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setCon_password] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register_account = (e) => {
    setLoading(true);
    if (password === con_password) {
      axios
        .post(
          `${main_url}/account/user/wr/sign-up`,
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
          setLoading(false);
          router.push("/signin");
        })
        .catch(function (error) {
          error_message(error.response.data.message);
          console.log(error);
          setLoading(false);
        });
    } else {
      error_message("passwords don't march");
      setLoading(false);
    }

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
        css={{
          padding: " 40px 146px",
        }}
      >
        <div>
          <div
            css={{
              display: "flex",

              width: "100%",
            }}
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
              Factory registration portal
            </div>
          </div>
          <div
            css={(theme) => ({
              colors: theme.colors.Gray_600,
              marginTop: 50,
              textAlign: "center",
              width: "100%",
              fontSize: 40,
              fontWeight: 700,
            })}
          >
            Create account
          </div>
          <form onSubmit={handleSubmit((e) => register_account(e))}>
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 28,
              }}
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
                          width: ["100%", "100%", 450],
                          fontSize: 20,
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,

                          ":focus": {
                            outline: "none",
                            border: `1px solid ${theme.colors.Gray_200}`,

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
                          width: ["100%", "100%", 450],
                          fontSize: 20,
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,

                          ":focus": {
                            outline: "none",
                            border: `1px solid ${theme.colors.Gray_200}`,

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
                    Comfirm password
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
                          width: ["100%", "100%", 450],
                          fontSize: 20,
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,

                          ":focus": {
                            outline: "none",
                            border: `1px solid ${theme.colors.Gray_200}`,

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
                      {...register("conpassword", { required: true })}
                      placeholder="*****"
                      type="password"
                      onChange={(e) => setCon_password(e.target.value)}
                      value={con_password}
                    />
                  </div>
                  {errors.conpassword && (
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
                          email && password && con_password
                            ? theme.colors.Primary_800
                            : theme.colors.Primary_300,
                      })
                    }
                    type="submit"
                    disabled={email && password && con_password ? false : true}
                    // onClick={(e) => {
                    //   register_account(e);
                    // }}
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
                      <div>Create Account</div>
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

export default SignUpComp;
