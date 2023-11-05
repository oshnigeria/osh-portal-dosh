/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import useSWR, { useSWRConfig, mutate } from "swr";

import { error_message, success_message } from "@/src/components/toasts";
import { useRouter } from "next/router";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const ChangeName = (props) => {
  const [old_password, setOld_password] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
    data: signature,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/signature`, fetcher);

  console.log(signature);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const change_password = () => {
    setLoading(true);
    if (true) {
      const formData = new FormData();
      formData.append("signature", signature.data.url);
      formData.append("name", name);
      axios
        .patch(
          `${main_url}/dosh/signature`,
          {
            // signature: signature.data.url,
            name: name,
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
          setName("");
          props.close();
          mutate(`${main_url}/dosh/signature`);
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
      css={mq({
        backgroundColor: "#fff",
        padding: ["14px 16px", "14px 16px", "30px 40px"],
      })}
    >
      <div
        css={(theme) => ({
          display: "grid",
          gridTemplateColumns: "repeat(2, 90% 10%)",

          justifyContent: "space-between",
          rowGap: 0,
          columnGap: 0,
          width: "100%",
          height: "auto",
        })}
      >
        {/* <div></div> */}
        <div
          css={(theme) =>
            mq({
              color: theme.colors.Gray_800,
              fontSize: [20, 20, 24],
              fontWeight: 700,
              textAlign: "center",
              flex: "flex",
              justifyContent: "center",
              width: "100%",
            })
          }
        >
          <div>Change signatory name</div>
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
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            marginTop: 64,
          }}
        >
          <div>
            <div
              css={{
                marginTop: 40,
                // display: "flex",
                // justifyContent: "center",
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 8px",
                  width: "100%",
                  fontSize: 18,
                  color: theme.colors.Gray_500,
                  borderRadius: 8,
                  border: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    // border: "none",
                    borderRadius: 8,
                    border: `2px solid ${theme.colors.Gray_400}`,
                    padding: "12px 8px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    // border: "none",
                    borderRadius: 8,
                    border: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 9px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder=""
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div
              css={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                css={(theme) =>
                  mq({
                    width: [140, 140, 325],
                    height: 56,
                    borderRadius: 30,
                    marginTop: [32, 32, 64],
                    padding: "16px 24px",
                    cursor: "pointer",
                    fontSize: [12, 12, 16],
                    fontWeight: 600,
                    lineHeight: "17px",
                    border: "none",
                    color: theme.colors.Gray_50,
                    backgroundColor: theme.colors.Primary_500,
                  })
                }
                onClick={() => {
                  change_password();
                }}
              >
                Change name
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeName;
