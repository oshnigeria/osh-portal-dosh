/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { success_message, error_message } from "../../toasts";
import useSWR, { useSWRConfig, mutate } from "swr";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));


const DeleteAccountComp = (props) => {
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
// console.log("ade")
      axios
        .delete(
          `${main_url}/dosh/account/user?type=${props.type}&id=${props.id}`,
         
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get(cookies_id)}`,
            },
          }
        )
        .then(function (response) {
          console.log("ade")
          console.log(response.data);
          success_message(response.data.message);
          setLoading(false);
          setConfirm_Password("");
          setOld_password("");
          setPassword("");
mutate(`${main_url}/dosh/account/users`)
          props.close();
          //Time before execution

          // router.push("/signin");
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
   

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
          css={(theme) => mq({
            color: theme.colors.Gray_800,
            fontSize: [20,20,24],
            fontWeight: 700,
            textAlign: "center",
            flex: "flex",
            justifyContent: "center",
            width: "100%",
          })}
        >
          <div>Delete Account</div>
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
              css={(theme) => mq({
                fontSize: [16, 16,20],
                color: theme.colors.Gray_800,
                textAlign: "center",
              })}
            >
              {props.content}
             
            </div>
            <div
              css={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                css={(theme) => mq({
                  width: [150,200,325],
                  height: 56,
                  borderRadius: 30,
                  marginTop: 65,
                  padding: "16px 24px",
                  cursor: "pointer",
                  fontSize: [14, 14,16],
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
              css={(theme) => mq({
                marginTop: 36,
                fontSize: [14,14,16],
                color: theme.colors.Error_600,
                fontWeight: theme.font_weight.size_500,
                textAlign: "center",
                cursor: "pointer",
              })}
              onClick={() => {
                props.close();
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

export default DeleteAccountComp;
