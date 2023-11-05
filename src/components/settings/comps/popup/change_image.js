/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import useSWR, { useSWRConfig } from "swr";

import { error_message, success_message } from "@/src/components/toasts";
import { useRouter } from "next/router";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const ChangeImage = (props) => {
  const [old_password, setOld_password] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [loading, setLoading] = useState(false);
  const [signature_image, setSignature_image] = useState({
    file: null,
    filename: "",
  });
  const handleFileChange = (e, doc_type) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const uploadedFilename = file.name;
    setSignature_image({ file, filename: uploadedFilename });

    // const fileType = file.type;
    // setSelectedFileType(fileType);
  };
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
  console.log(signature?.data?.name);
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
      formData.append("signature", signature_image.file);
      //   formData.append("name", signature?.data?.name);
      axios
        .patch(`${main_url}/dosh/signature`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        })
        .then(function (response) {
          console.log(response.data);
          success_message(response.data.message);
          setLoading(false);
          setName("");
          props.close();
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
              css={mq({
                marginTop: [8, 20],
              })}
            >
              <div
                css={mq({
                  position: "relative",
                  width: ["100%", "100%", "100%"],
                })}
              >
                <input
                  css={(theme) =>
                    mq({
                      padding: "12px 4px",
                      width: "100%",
                      fontSize: [14, 16],
                      borderRadius: 8,
                      color: theme.colors.Gray_500,
                      // border: "none",
                      border: `1px solid ${theme.colors.Gray_200}`,
                      ":focus": {
                        outline: "none",
                        border: `1px solid ${theme.colors.Gray_200}`,
                        padding: "12px 4px",
                        color: theme.colors.Gray_500,
                      },
                      ":placeholder ": {
                        outline: "none",
                        border: `1px solid ${theme.colors.Gray_200}`,
                        padding: "12px 4px",
                        color: theme.colors.Gray_500,
                      },
                    })
                  }
                  placeholder=""
                  value={signature_image.filename}
                />

                <label
                  css={{
                    cursor: "pointer",
                  }}
                >
                  <input
                    css={{
                      display: "none",
                    }}
                    type="file"
                    accept=".jpg,.img"
                    {...register("list_of_equipments", { required: true })}
                    onChange={(e) => {
                      handleFileChange(e, "cac_certificate");
                    }}
                  />
                  <div
                    css={(theme) => ({
                      backgroundColor: theme.colors.Primary_50,
                      position: "absolute",
                      color: theme.colors.Primary_500,
                      right: 0,
                      bottom: 12,
                      fontSize: 12,
                      borderRadius: 4,
                      padding: "4px 24px",
                    })}
                  >
                    Browse
                  </div>
                </label>
              </div>
              {errors.list_of_equipments && (
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
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                css={(theme) =>
                  mq({
                    width: [180, 180, 325],
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
                Change Signature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeImage;
