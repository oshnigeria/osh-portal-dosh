/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from "react";
import FactoryRegistration from "./tabs/registration";
import { useRouter } from "next/router";
import DashboadWrapperComp from "../nav_wrapper";
import useSWR, { useSWRConfig, mutate } from "swr";
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import { FactoryContext } from "@/src/context/factoryContext";
import DocumentUploadTab from "./tabs/document";
import VerifyPaymentTab from "./tabs/verify_payment";
// import InspectionReportComp from "./tabs/inspection_report";
// import CorDraftComp from "./tabs/cor_draft";
// import PreviewCorComp from "./tabs/preview_cor";
import dynamic from "next/dynamic";

import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const InspectionReportComp = dynamic(import("./tabs/inspection_report"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const PreviewCorComp = dynamic(import("./tabs/preview_cor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const CorDraftComp = dynamic(import("./tabs/cor_draft"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const FactoryPageComp = () => {
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
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/factory/${router.query.id}`, fetcher);

  const factory = useContext(FactoryContext);
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

  const steps = [
    {
      title: "Factory information",
      click: () => null,
    },
    {
      title: "Document verification",
      click: () => null,
    },
    {
      title: "Payment verification",
      click: () => null,
    },
    {
      title: "Inspection report",
      click: () => update_progress(95),
    },
    {
      title: "CoR draft",
      click: () => null,
    },
    {
      title: "Preview CoR",
      click: () => null,
    },
  ];
  return (
    <div>
      <DashboadWrapperComp>
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
                width: 64,
                height: 64,
                margin: "50px 0px",
              }}
            >
              <img src="/svg/loader/loader.svg" />
            </div>
          </div>
        ) : (
          <div>
            <div
              css={mq({
                display: "flex",
                alignItems: "center",
                marginTop: [30, 30, 0],
                padding: ["16px 16px", "16px 16px", 0],
              })}
              onClick={() => router.back()}
            >
              <div>
                {" "}
                <div
                  css={mq({
                    cursor: "pointer",
                    marginRight: [16, 16, 38],
                  })}
                >
                  <img
                    css={mq({
                      width: [8, 8, 24],
                      height: [12, 12, 20],
                    })}
                    src="/svg/dashboard/arrow_left.svg"
                  />
                </div>
              </div>
              <div
                css={mq({
                  fontSize: [12, 12, 24],

                  color: "#000",
                  textTransform: "capitalize",
                })}
              >
                {single_factory?.data?.factory?._occupier_name}
              </div>
            </div>
            <div
              css={(theme) => ({
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: [16, 16, 60],
              })}
            >
              <div
                css={mq({
                  display: "grid",
                  gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                  alignItems: "center",
                  justifyContent: "space-between",
                  rowGap: 0,
                  columnGap: [2, 2, 10],
                })}
              >
                {steps.map((step) => (
                  <div
                    key={step.title}
                    css={(theme) => ({
                      padding: "14px 28px",
                      backgroundColor:
                        factory.tab === step.title
                          ? theme.colors.Primary_500
                          : theme.colors.Primary_50,
                      fontSize: 12,
                      textAlign: "center",
                      cursor: "pointer",
                      color: factory.tab === step.title ? "#fff" : "#000",
                    })}
                    onClick={() => {
                      factory.set_tab(step.title);
                      step.click();
                    }}
                  >
                    {step.title}
                  </div>
                ))}
              </div>
            </div>
            {factory.tab === steps[0].title && <FactoryRegistration />}
            {factory.tab === steps[1].title && <DocumentUploadTab />}
            {factory.tab === steps[2].title && <VerifyPaymentTab />}
            {factory.tab === steps[3].title && <InspectionReportComp />}
            {factory.tab === steps[4].title && <CorDraftComp />}
            {factory.tab === steps[5].title && <PreviewCorComp />}
          </div>
        )}
      </DashboadWrapperComp>
    </div>
  );
};

export default FactoryPageComp;
