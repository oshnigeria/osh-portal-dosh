/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { main_url, cookies_id } from "@/src/details";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import ChangeName from "./popup/change_name";
import ChangeImage from "./popup/change_image";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const CertificateComp = () => {
  const [will_change_name, setWill_change_name] = useState(false);
  const [will_change_image, setWill_change_image] = useState(false);

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
    data: users,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/signature`, fetcher);

  console.log(users);
  return (
    <div
      css={mq({
        backgroundColor: "#fff",
        marginTop: [21, 21, 48],
        padding: ["34px 16px", "34px 16px", "96px 34px"],
        borderRadius: 16,
      })}
    >
      {isLoading ? (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <div
            css={{
              width: 32,
              height: 32,
            }}
          >
            <img src="/svg/loader/loader-green.svg" />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div
              css={(theme) => ({
                color: theme.colors.Gray_400,
                fontSize: [14, 14, 20],
                fontWeight: 500,
              })}
            >
              Signatory name{" "}
            </div>
            <div
              css={mq({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: ["100%", "100%", "50%"],
                marginTop: 12,
                fontWeight: 500,
              })}
            >
              <div
                css={(theme) => ({
                  color: theme.colors.Gray_800,
                  fontSize: [14, 14, 20],
                  fontWeight: 500,
                })}
              >
                {users?.data?.name}
              </div>
              <div
                css={(theme) =>
                  mq({
                    color: theme.colors.Primary_500,
                    fontSize: [14, 14, 16],
                    fontWeight: 500,
                    cursor: "pointer",
                  })
                }
                onClick={() => setWill_change_name(!will_change_name)}
              >
                Change
              </div>
            </div>
          </div>

          <div
            css={{
              marginTop: 48,
            }}
          >
            <div
              css={(theme) => ({
                color: theme.colors.Gray_400,
                fontSize: [14, 14, 20],
                fontWeight: 500,
              })}
            >
              Signature
            </div>
            <div
              css={mq({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: ["100%", "100%", "50%"],
                marginTop: 12,
                fontWeight: 500,
              })}
            >
              <div
              // css={{
              //   width: 100,
              //   height: 100,
              // }}
              >
                <img
                  css={{
                    width: 100,
                    height: 100,
                  }}
                  src={users?.data?.url}
                />
              </div>

              <div
                css={(theme) =>
                  mq({
                    color: theme.colors.Primary_500,
                    fontSize: [14, 14, 16],
                    fontWeight: 500,
                    cursor: "pointer",
                  })
                }
                onClick={() => setWill_change_image(!will_change_image)}
              >
                Change
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {will_change_name && (
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
              onClick={() => setWill_change_name(false)}
            >
              {" "}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 900 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 900 }}
              transition={{
                ease: "easeInOut",
                // duration: 0.4,
              }}
              id="location"
              css={(theme) => ({
                position: "fixed",
                width: ["90vw", 524, 524],
                height: 427,
                borderRadius: 14,
                zIndex: 5,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              })}
            >
              {/* <CreateRiderAccount close={() => router.back()} /> */}
              <ChangeName
                close={() => setWill_change_name(false)}
                loading={isLoading}
                ammend={() => {
                  switch (router.query.type) {
                    case "ammendment":
                      zonal_approve_ammendment();
                      break;
                    case "renewal":
                      zonal_approve_replacements_renewals(router.query.id);
                      break;
                    case "replacement":
                      zonal_approve_replacements_renewals(router.query.id);
                      break;
                    default:
                      dosh_send_certificate();
                  }
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {will_change_image && (
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
              onClick={() => setWill_change_image(false)}
            >
              {" "}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 900 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 900 }}
              transition={{
                ease: "easeInOut",
                // duration: 0.4,
              }}
              id="location"
              css={(theme) => ({
                position: "fixed",
                width: ["90vw", 524, 524],
                height: 427,
                borderRadius: 14,
                zIndex: 5,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              })}
            >
              {/* <CreateRiderAccount close={() => router.back()} /> */}
              <ChangeImage
                close={() => setWill_change_image(false)}
                loading={isLoading}
                ammend={() => {
                  switch (router.query.type) {
                    case "ammendment":
                      zonal_approve_ammendment();
                      break;
                    case "renewal":
                      zonal_approve_replacements_renewals(router.query.id);
                      break;
                    case "replacement":
                      zonal_approve_replacements_renewals(router.query.id);
                      break;
                    default:
                      dosh_send_certificate();
                  }
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificateComp;
