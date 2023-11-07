/** @jsxImportSource @emotion/react */
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext } from "react";

import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FactoryContext } from "@/src/context/factoryContext";
import FactoryDocComp from "@/src/components/factoryDetailsComp";
import AmmendmentVerifyPayment from "./comps/ammendment_info/verify_payment";
import RenewalVerifyPayment from "./comps/renewal_info/verify_payment";
import ReplacementVerifyPayment from "./comps/replacement_info/verify_payment";
import toast, { Toaster } from "react-hot-toast";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const VerifyPaymentTab = () => {
  const router = useRouter();
  const factory = useContext(FactoryContext);
  const [loading, setLoading] = useState(false);

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get(cookies_id)}`,
        },
      })
      .then((res) => res?.data)
      .catch((error) => {
        console.error("Error:", error);
      });
  const {
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/factory/${router.query.id}`, fetcher);

  const {
    data: single_factory_doc,
    error: doc_error,
    isLoading: doc_isLoading,
  } = useSWR(
    isLoading
      ? null
      : `${main_url}/dosh/factory-docs?factory_id=${single_factory.data.factory._id}`,
    fetcher
  );

  console.log(single_factory_doc);
  console.log(single_factory);

  const update_progress = (progress) => {
    setLoading(true);

    axios
      .patch(
        `${main_url}/dosh/factory/progress`,
        {
          id: router.query.id,
          progress: progress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        // success_message(response?.data.message);
        factory.set_tab("Inspection report");
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // error_message(error?.response?.data?.message);

        setLoading(false);
      });

    // console.log("ade");
  };

  if (router.query.type === "ammendment") return <AmmendmentVerifyPayment />;
  if (router.query.type === "renewal") return <RenewalVerifyPayment />;
  if (router.query.type === "replacement") return <ReplacementVerifyPayment />;
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      {doc_isLoading ? (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <div
            css={{
              width: 64,
              height: 64,
              margin: "50px 0px",
            }}
          >
            <img src="/svg/loader/loader.svg" />
          </div>
        </div>
      ) : (
        <div
          css={{
            width: "90%",
          }}
        >
          <div
            css={(theme) => ({
              marginTop: 54,

              border: `1px solid ${theme.colors.Primary_100}`,
              padding: "50px 32px",

              borderRadius: 8,
            })}
          >
            <div
              css={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {single_factory_doc.data.docs
                .filter((word) => word.doc_type === "payment_reciept")
                .map((doc) => (
                  <div key={doc._id}>
                    <FactoryDocComp name={doc.name} type={doc.file_type} />
                  </div>
                ))}
            </div>
          </div>

          <div
            css={{
              marginTop: 64,
              display: "flex",
              justifyContent: "right",
            }}
          >
            <button
              css={(theme) =>
                mq({
                  height: [40, 40, 56],
                  borderRadius: 30,
                  width: [140, 140, 356],
                  //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                  padding: "16px 24px",
                  fontSize: [12, 12, 20],
                  cursor: "pointer",
                  marginRight: 20,
                  fontWeight: 600,
                  lineHeight: "17px",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  color: "#fff",
                  backgroundColor: theme.colors.Primary_500,
                })
              }
              type="submit"
              onClick={() => {
                // factory_details.add_factory_details(formData);
                update_progress(95);
              }}
            >
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>Verify & continue</div>
                <div
                  css={{
                    marginLeft: 8,
                  }}
                >
                  <img
                    css={{
                      width: 24,
                      height: 24,
                    }}
                    src="/svg/registration/left_arrow.svg"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPaymentTab;
