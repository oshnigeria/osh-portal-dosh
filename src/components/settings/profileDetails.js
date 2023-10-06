/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { main_url, cookies_id } from "@/src/details";
import DashboadWrapperComp from "../nav_wrapper";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import ChangePasswordComp from "./manage_account_popup/change_password";
import DisableAccountComp from "./manage_account_popup/disable_account";
const ProfileDetailsComp = (props) => {
  const [change_password, setChange_password] = useState(false);
  const [disable_account, setDisable_account] = useState(false);

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
    data: user,
    error,
    isLoading,
  } = useSWR(
    `${main_url}/account/repo/user/${router.query.id}
  `,
    fetcher
  );
  function formatDateToCustom(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }
  console.log(user);
  console.log("user");

  return (
    <DashboadWrapperComp>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          css={{
            cursor: "pointer",
            marginRight: 24,
          }}
          onClick={() => router.back()}
        >
          <img
            css={{
              width: 32,
              height: 28,
            }}
            src="/svg/dashboard/arrow_left.svg"
          />
        </div>
        <div
          css={(theme) => ({
            color: theme.colors.Gray_800,
            fontSize: 32,
            fontWeight: 700,
            lineHeight: "38px",
          })}
        >
          Profile
        </div>
      </div>

      {isLoading ? null : (
        <div
          css={(theme) => ({
            backgroundColor: theme.colors.Gray_25,
            padding: "54px 25px",
            marginTop: 64,
          })}
        >
          <div
            css={(theme) => ({
              padding: "24px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 16,
              border: `1px solid ${theme.colors.Gray_200}`,
            })}
          >
            <div>
              <div
                css={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <img
                  css={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    marginRight: 24,
                  }}
                  src="/svg/dashboard/profilepick.svg"
                />
                <div>
                  <div
                    css={(theme) => ({
                      fontSize: 28,
                      fontWeight: theme.font_weight.size_700,
                      color: theme.colors.Gray_800,
                      marginBottom: 8,
                    })}
                  >
                    {user.data.user.name}
                  </div>
                  <div>{user.data.user.username}</div>
                </div>{" "}
              </div>
            </div>
            <div>
              <div
                css={{
                  display: "flex",
                }}
              >
                <div
                  css={(theme) => ({
                    color: theme.colors.Primary_500,
                    fontSize: 20,
                    fontWeight: theme.font_weight.size_500,
                    lineHeight: "24px",
                    cursor: "pointer",
                    marginRight: 48,
                  })}
                  onClick={() => {
                    setChange_password(true);
                  }}
                >
                  Change password
                </div>
                <div
                  css={(theme) => ({
                    color: theme.colors.Error_500,
                    fontSize: 20,
                    fontWeight: theme.font_weight.size_500,
                    lineHeight: "24px",
                    cursor: "pointer",
                  })}
                  onClick={() => {
                    setDisable_account(true);
                  }}
                >
                  Disable account
                </div>
              </div>
            </div>
          </div>
          <div
            css={(theme) => ({
              padding: "24px 24px",

              borderRadius: 16,
              marginTop: 40,
              border: `1px solid ${theme.colors.Gray_200}`,
            })}
          >
            <div
              css={(theme) => ({
                color: theme.colors.Gray_800,
                fontSize: 24,
                fontWeight: theme.font_weight.size_500,
                lineHeight: "24px",
                marginRight: 48,
              })}
            >
              Personal information
            </div>
            <div
              css={{
                marginTop: 32,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                rowGap: 0,
                columnGap: 48,
                justifyContent: "space-between",
                width: "70%",
              }}
            >
              <div>
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    fontWeight: theme.font_weight.size_500,
                    fontSize: 20,
                  })}
                >
                  Full name{" "}
                </div>
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_800,
                    fontWeight: theme.font_weight.size_500,
                    fontSize: 20,
                    marginTop: 12,
                  })}
                >
                  {user.data.user.name}
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      fontWeight: theme.font_weight.size_500,
                      fontSize: 20,
                      marginTop: 48,
                    })}
                  >
                    Email{" "}
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_800,
                      fontWeight: theme.font_weight.size_500,
                      fontSize: 20,
                      marginTop: 12,
                    })}
                  >
                    {user.data.user.email}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      fontWeight: theme.font_weight.size_500,
                      fontSize: 20,
                    })}
                  >
                    Password{" "}
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_800,
                      fontWeight: theme.font_weight.size_500,
                      fontSize: 20,
                      marginTop: 12,
                    })}
                  >
                    ******
                  </div>
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      fontWeight: theme.font_weight.size_500,
                      fontSize: 20,
                      marginTop: 48,
                    })}
                  >
                    Permission level{" "}
                  </div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_800,
                      fontWeight: theme.font_weight.size_500,
                      fontSize: 20,
                      marginTop: 12,
                    })}
                  >
                    <select
                      css={(theme) => ({
                        padding: "12px 4px",
                        width: 200,
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
                      defaultValue={user.data.user.role}
                      // value={reported_by}
                      // onChange={(e) => {
                      //   setReported_by(e.target.value);
                      //   // console.log(e.target.value);
                      //   // console.log(catId);
                      // }}
                    >
                      {/* <option value={"victim"}>Victim</option> */}
                      <option value={"lv-1"}>LV 1</option>
                      <option value={"lv-2"}>LV 2</option>
                      <option value={"lv-3"}>LV 3</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div
              css={{
                marginTop: 32,
                display: "flex",
                justifyContent: "space-between",
                width: "70%",
              }}
            ></div>
          </div>
          <div
            css={(theme) => ({
              padding: "24px 24px",

              borderRadius: 16,
              marginTop: 40,
              border: `1px solid ${theme.colors.Gray_200}`,
            })}
          >
            <div
              css={(theme) => ({
                color: theme.colors.Gray_800,
                fontSize: 24,
                fontWeight: theme.font_weight.size_500,
                lineHeight: "24px",
                marginRight: 48,
              })}
            >
              Account activity
            </div>
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 32,
              }}
            >
              <div>
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_800,
                    fontWeight: theme.font_weight.size_500,
                    fontSize: 20,
                  })}
                >
                  Account Created
                </div>
                {/* <div
                  css={(theme) => ({
                    color: theme.colors.Gray_800,
                    fontWeight: theme.font_weight.size_500,
                    fontSize: 20,
                    marginTop: 24,
                  })}
                >
                  File upload
                </div> */}
              </div>
              <div>
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_500,
                    fontWeight: theme.font_weight.size_500,
                    fontSize: 20,
                  })}
                >
                  {formatDateToCustom(user.data.user.createdAt)}
                </div>
                {/* <div
                  css={(theme) => ({
                    color: theme.colors.Gray_500,
                    fontWeight: theme.font_weight.size_500,
                    fontSize: 20,
                    marginTop: 24,
                  })}
                >
                  02/12/2020
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {change_password && (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.4,
              }}
              css={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                // zIndex: 2,
                zIndex: 3,
                backgroundColor: "rgb(0,0,0,0.1)",
                right: 0,
                top: 0,
                opacity: 0,
              }}
              onClick={() => {
                setChange_password(false);
                // router.push("/dashboard/account");
              }}
            >
              {" "}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                ease: "easeInOut",
                // duration: 0.4,
              }}
              id="location"
              css={(theme) => ({
                position: "fixed",
                overflowY: "scroll",
                overflowX: "hidden",

                width: 525,
                height: 500,
                borderRadius: 14,
                zIndex: 5,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: "auto",
                // display: "flex",
                // justifyContent: "center",
                backgroundColor: "#fff",
              })}
            >
              {/* <CreateRiderAccount close={() => router.back()} /> */}
              <ChangePasswordComp
                id={router.query.id}
                close={() => setChange_password(false)}
              />
              {/* <div>ade</div> */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {disable_account && (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.4,
              }}
              css={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                // zIndex: 2,
                zIndex: 3,
                backgroundColor: "rgb(0,0,0,0.1)",
                right: 0,
                top: 0,
                opacity: 0,
              }}
              onClick={() => {
                setDisable_account(false);
                // router.push("/dashboard/account");
              }}
            >
              {" "}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                ease: "easeInOut",
                // duration: 0.4,
              }}
              id="location"
              css={(theme) => ({
                position: "fixed",
                overflowY: "scroll",
                overflowX: "hidden",

                width: 525,
                height: 500,
                borderRadius: 14,
                zIndex: 5,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: "auto",
                // display: "flex",
                // justifyContent: "center",
                backgroundColor: "#fff",
              })}
            >
              {/* <CreateRiderAccount close={() => router.back()} /> */}
              <DisableAccountComp
                id={router.query.id}
                close={() => setDisable_account(false)}
              />
              {/* <div>ade</div> */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboadWrapperComp>
  );
};

export default ProfileDetailsComp;
