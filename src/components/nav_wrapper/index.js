/** @jsxImportSource @emotion/react */

import { useRouter } from "next/router";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

import { useEffect, useContext } from "react";
import facepaint from "facepaint";
import { AuthContext } from "@/src/context/authContext";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const DashboadWrapperComp = (props) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
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
    `${main_url}/account/repo/user/${jwt.decode(Cookies.get(cookies_id))?.id}`,
    fetcher
  );
  // console.log(user?.data.user.role);
  // useEffect(() => {
  //   if (Cookies.get(cookies_id)) {
  //     router.push("/dashboard/registration");
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

  const tabs = [
    {
      title: "New Registration",
      route: "/",
      path: "",
      icon: "register",
      active_icon: "register_active",
    },
    {
      title: "Renewal",
      route: "/renewal",
      path: "renewal",
      icon: "renewal",
      active_icon: "renewal_active",
    },
    {
      title: "Amendment",
      route: "/amendment",
      path: "amendment",
      icon: "ammendments",
      active_icon: "ammendments_active",
    },
    {
      title: "Replacement",
      route: "/replacement",
      path: "replacement",
      icon: "replacement",
      active_icon: "replacement_active",
    },
    {
      title: "Incident",
      route: "/incident",
      path: "incident",
      icon: "incident",
      active_icon: "incident_active",
    },
    {
      title: "Settings",
      route: "/settings",
      path: "settings",
      icon: "settings",
      active_icon: "settings_active",
    },
  ];
  return (
    <div
      css={(theme) =>
        mq({
          display: ["block", "block", "grid"],
          gridTemplateColumns: "repeat(2, 30% 70%)",
          backgroundColor:
            router.pathname === `/settings` ? theme.colors.Gray_200 : "#fff",
          justifyContent: "space-between",
          rowGap: 0,
          columnGap: 0,
          width: "100%",
          height: "auto",
        })
      }
    >
      <div
        css={(theme) =>
          mq({
            display: ["none", "none", "block"],
            position: "fixed",
            top: 0,
            left: 0,
            padding: ["16px 16px", "16px 16px", "102px 20px"],
            width: 312,
            height: "100vh",
            background: theme.colors.Primary_500,
          })
        }
      >
        <div>
          <img
            css={{
              width: 268,
              height: 52,
            }}
            src="/auth/fmle_logo_white.png"
          />
        </div>
        <div
          css={{
            marginTop: 30,
          }}
        >
          {tabs.map((tab) => (
            <div
              css={{
                backgroundColor:
                  router.pathname == `/${tab.path}` ? "#FCFCFD" : "transparent",

                display: "flex",
                alignItems: "center",
                marginBottom: 26,
                padding: "16px 36px",
                cursor: "pointer",
                borderRadius: 8,
              }}
              onClick={() => router.push(`/${tab.path}`)}
            >
              <div
                css={(theme) => ({
                  color:
                    router.pathname == `/${tab.path}`
                      ? theme.colors.Primary_500
                      : theme.colors.Primary_50,
                  fontWeight: router.pathname == `/${tab.path}` ? 600 : 500,
                })}
              >
                {tab.title}
              </div>
            </div>
          ))}
        </div>

        <div
          css={{
            position: "fixed",
            bottom: 30,
            left: 60,
          }}
        >
          {isLoading ? null : (
            <div
              css={{
                marginBottom: 12,
              }}
            >
              <div
                css={(theme) => ({
                  fontSize: 16,
                  lineHeight: "24px",
                  color: theme.colors.Gray_25,
                  fontWeight: 500,
                })}
              >
                {user?.data.user.username}
              </div>
              <div
                css={(theme) => ({
                  fontSize: 12,
                  lineHeight: "24px",
                  color: theme.colors.Gray_25,
                  fontWeight: 500,
                })}
              >
                {user?.data.user.email}
              </div>
            </div>
          )}

          <div
            css={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              Cookies.remove(cookies_id);
              router.push("/");
            }}
          >
            <div>
              <img
                css={{
                  width: 24,
                  height: 24,
                  marginTop: 4,
                }}
                src="/svg/dashboard/logout.svg"
              />
            </div>
            <div
              css={(theme) => ({
                color: theme.colors.Primary_50,
                fontSize: 20,
                marginLeft: 16,
                lineHeight: "24px",
              })}
            >
              {" "}
              Log out
            </div>
          </div>
        </div>
        <div
          css={mq({
            marginLeft: [0, 0, 430],
            // width: "100%",
            minHeight: "100vh",
            padding: [0, 0, "36px 0px"],
            paddingRight: [0, 0, 70],
          })}
        >
          {props.children}
        </div>
      </div>
      <div
        css={(theme) =>
          mq({
            display: ["flex", "flex", "none"],
            justifyContent: "space-around",
            backgroundColor: theme.colors.Primary_500,
            position: "fixed",
            bottom: 0,
            width: "100%",
            padding: "16px 0px",
          })
        }
      >
        {tabs.map(
          (tab) =>
            tab.title !== "Settings" && (
              <div
                css={{
                  color: "#fff",
                  fontSize: 8,
                  fontWeight: 400,
                }}
                onClick={() => router.push(`/${tab.path}`)}
              >
                <img
                  src={`/svg/tabs/${
                    router.pathname == `/${tab.path}`
                      ? tab.active_icon
                      : tab.icon
                  }.svg`}
                />
                {/* {tab.icon} */}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default DashboadWrapperComp;
