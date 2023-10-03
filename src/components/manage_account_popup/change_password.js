/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import { error_message, success_message } from "../../toasts";
import { useRouter } from "next/router";

const ChangePasswordComp = (props) => {
  const [old_password, setOld_password] = useState("");
  const [part, setPart] = useState("a");

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
  const change_password = () => {
    setLoading(true);
    if (password === confirm_password) {
      axios
        .patch(
          `${main_url}/account/repo/user/password`,
          {
            id: props.id,
            password: password,
            old_password: old_password,
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
          setLoading(false);
          setConfirm_Password("");
          setOld_password("");
          setPassword("");
          // router.push("/signin");
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      error_message("Password doesn't match");
    }

    // console.log("ade");
  };
  return (
    <div
      css={{
        backgroundColor: "#fff",
        padding: "30px 100px",
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
          <div>Change Password</div>
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

      <div css={{}}>
        <form
          css={{
            display: part === "a" ? "block" : "none",
          }}
          onSubmit={handleSubmit(() => setPart("b"))}
        >
          <div
          // css={{
          //   marginBottom: 174,
          // }}
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
                {...register("old_password", { required: true })}
                placeholder="Old password"
                type="text"
                onChange={(e) => setOld_password(e.target.value)}
                value={old_password}
              />
              {errors.old_password && (
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
                {...register("new_password", { required: true })}
                placeholder="New password"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {errors.new_password && (
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
                  {...register("confirm_passwrod", { required: true })}
                  placeholder="Confirm password"
                  type="text"
                  onChange={(e) => setConfirm_Password(e.target.value)}
                  value={confirm_password}
                />
                {errors.confirm_passwrod && (
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
                  backgroundColor: theme.colors.Primary_500,
                })}
                type="submit"
              >
                {loading ? "Changing password..." : "Change password"}
              </button>
            </div>
          </div>
        </form>

        <div
          css={{
            display: part === "b" ? "flex" : "none",
            justifyContent: "center",
            marginTop: 64,
          }}
        >
          <div>
            <div
              css={(theme) => ({
                fontSize: 20,
                color: theme.colors.Gray_800,
                textAlign: "center",
              })}
            >
              Are you sure you want to change the password?
            </div>
            <div
              css={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                css={(theme) => ({
                  width: 325,
                  height: 56,
                  borderRadius: 30,
                  marginTop: 65,
                  padding: "16px 24px",
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "17px",
                  border: "none",
                  color: theme.colors.Gray_50,
                  backgroundColor: theme.colors.Primary_500,
                })}
                onClick={() => {
                  change_password();
                }}
              >
                Yes, continue
              </button>
            </div>
            <div
              css={(theme) => ({
                marginTop: 36,
                fontSize: 16,
                color: theme.colors.Error_600,
                fontWeight: theme.font_weight.size_500,
                textAlign: "center",
                cursor: "pointer",
              })}
              onClick={() => {
                setPart("a");
              }}
            >
              No, cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordComp;
