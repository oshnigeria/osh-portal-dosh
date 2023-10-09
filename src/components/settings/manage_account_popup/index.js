/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { main_url, cookies_id, states } from "@/src/details";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { success_message, error_message } from "../../toasts";
import { mutate } from "swr";

const AddUserComp = (props) => {
  const [option, setOption] = useState("a");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");

  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const login_account = () => {
    setLoading(true);
    axios
      .post(
        `${main_url}/dosh/account`,
        {
          state: state,
          password: password,

          type: level,
          email: email,
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
        success_message(response.data.message);
        mutate(`${main_url}/account/repo/users`);
        setLoading(false);
        props.close();
        // router.push("/signin");
      })
      .catch(function (error) {
        error_message(error.response.data.message);
        console.log(error);
        setLoading(false);
      });
    // console.log("ade");
  };
  return (
    <div
      css={{
        backgroundColor: "#fff",
        padding: "30px 80px",
      }}
    >
      <div
        css={(theme) => ({
          display: "grid",
          gridTemplateColumns: "repeat(2, 80% 20%)",

          justifyContent: "space-between",
          rowGap: 0,
          columnGap: 0,
          width: "100%",
          height: "auto",
        })}
      >
        {/* <div></div> */}
        <div
          css={(theme) => ({
            color: theme.colors.Gray_800,
            fontSize: 24,
            fontWeight: 700,
            textAlign: "center",
            flex: "flex",
            justifyContent: "center",
            width: "100%",
          })}
        >
          <div>Create account</div>
        </div>
        <div
          css={{
            width: "100%",

            display: "flex",
            justifyContent: "right",
          }}
        >
          {" "}
          <div
            css={{
              cursor: "pointer",
            }}
            onClick={() => props.close()}
          >
            <img
              css={{
                width: 16,
                height: 16,
              }}
              src="/svg/dashboard/cancel.svg"
            />
          </div>
        </div>
      </div>

      <div
        css={
          {
            // display: "flex",
            // justifyContent: "center",
            // width: 325,
          }
        }
      >
        <form onSubmit={handleSubmit(() => login_account())}>
          <div
            css={{
              marginBottom: 174,
            }}
          >
            <div
              css={{
                marginTop: 40,
              }}
            >
              <div
                css={(theme) => ({
                  colors: theme.colors.Gray_500,
                  lineHeight: "20px",
                  fontSize: 20,
                  marginBottom: 20,
                })}
              >
                Email
              </div>
              <input
                css={(theme) => ({
                  padding: "12px 14px",
                  width: "90%",
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
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
              <div
                css={(theme) => ({
                  colors: theme.colors.Gray_500,
                  lineHeight: "20px",
                  fontSize: 20,
                  marginBottom: 20,
                })}
              >
                Permission level
              </div>
              <select
                css={(theme) => ({
                  padding: "12px 14px",
                  width: "100%",
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
                placeholder=""
                defaultValue="state_officer"
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  // console.log(e.target.value);
                  // console.log(catId);
                }}
              >
                {/* <option value={"victim"}>Victim</option> */}
                <option value={"state_officer"}>State officer</option>
                <option value={"zonal_officer"}>Zonal officer</option>
              </select>
            </div>

            <div
              css={{
                marginTop: 40,
              }}
            >
              <div
                css={(theme) => ({
                  colors: theme.colors.Gray_500,
                  lineHeight: "20px",
                  fontSize: 20,
                  marginBottom: 20,
                })}
              >
                State
              </div>
              <div
                css={{
                  marginTop: 20,
                }}
              >
                <select
                  css={(theme) => ({
                    padding: "12px 14px",
                    width: "100%",
                    fontSize: 18,
                    color: theme.colors.Gray_400,
                    border: `1px solid ${theme.colors.Gray_200}`,
                    borderRadius: 8,
                    textTransform: "capitalize",
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
                  })}
                  // {...register("state", { required: true })}
                  placeholder=""
                  type="text"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    // console.log(e.target.value);
                    // console.log(catId);
                  }}
                >
                  {states.map((state) => (
                    <option
                      css={{
                        textTransform: "capitalize",
                      }}
                      value={state}
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              css={{
                marginTop: 40,
              }}
            >
              <div
                css={(theme) => ({
                  colors: theme.colors.Gray_500,
                  lineHeight: "20px",
                  fontSize: 20,
                  marginBottom: 20,
                })}
              >
                Password
              </div>
              <div>
                <input
                  css={(theme) => ({
                    padding: "12px 14px",
                    width: "90%",
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
                  {...register("password", { required: true })}
                  placeholder=""
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
              <div
                css={(theme) => ({
                  colors: theme.colors.Gray_500,
                  lineHeight: "20px",
                  fontSize: 20,
                  marginBottom: 20,
                })}
              >
                Confirm Password
              </div>
              <div>
                <input
                  css={(theme) => ({
                    padding: "12px 14px",
                    width: "90%",
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
                  {...register("confirmpassword", { required: true })}
                  placeholder=""
                  type="password"
                  onChange={(e) => setConfirm_Password(e.target.value)}
                  value={confirm_password}
                />
              </div>
              {errors.confirmpassword && (
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
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                css={(theme) => ({
                  width: 450,
                  height: 56,
                  borderRadius: 30,
                  padding: "16px 24px",
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "17px",
                  border: "none",
                  color: theme.colors.Gray_50,
                  backgroundColor:
                    state && password && level && email && confirm_password
                      ? theme.colors.Primary_800
                      : theme.colors.Primary_300,
                })}
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
                  <div>Create Account</div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserComp;
