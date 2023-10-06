/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { success_message, error_message } from "../../toasts";
import { mutate } from "swr";

const AddUserComp = (props) => {
  const [option, setOption] = useState("a");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");

  const [position, setPosition] = useState("");
  const [username, setUsername] = useState("");
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
        `${main_url}/account/repo/create-user`,
        {
          username: username,
          password: password,

          name: name,

          role: level,
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
        success_message("User created");
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
        padding: "30px 30px",
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
                // display: "flex",
                // justifyContent: "center",
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: "100%",
                  fontSize: 20,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `1px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `1px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                {...register("name", { required: true })}
                placeholder="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {errors.name && (
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
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: "100%",
                  fontSize: 20,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `1px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `1px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                {...register("email", { required: true })}
                placeholder="Email"
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
              <select
                css={(theme) => ({
                  padding: "12px 4px",
                  width: "100%",
                  fontSize: 16,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Reported by"
                defaultValue="lv-1"
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  // console.log(e.target.value);
                  // console.log(catId);
                }}
              >
                {/* <option value={"victim"}>Victim</option> */}
                <option value={"lv-1"}>LV 1</option>
                <option value={"lv-2"}>LV 2</option>
                <option value={"lv-3"}>LV 3</option>
              </select>
            </div>

            <div
              css={{
                marginTop: 40,
              }}
            >
              <div>
                <input
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: "100%",
                    fontSize: 20,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `1px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `1px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  {...register("username", { required: true })}
                  placeholder="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                {errors.username && (
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
            </div>
            <div
              css={{
                marginTop: 40,
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: "100%",
                  fontSize: 20,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `1px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `1px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                {...register("password", { required: true })}
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
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
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: "100%",
                  fontSize: 20,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `1px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `1px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                {...register("confirmpassword", { required: true })}
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => setConfirm_Password(e.target.value)}
                value={confirm_password}
              />
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
                    username &&
                    password &&
                    name &&
                    level &&
                    email &&
                    confirm_password
                      ? theme.colors.Primary_800
                      : theme.colors.Primary_300,
                })}
                type="submit"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserComp;
