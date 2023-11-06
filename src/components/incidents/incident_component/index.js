/** @jsxImportSource @emotion/react */
import React, { useState, useContext, useEffect } from "react";
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
import VisitationLetterComp from "./tabs/visitation_letter";
// import InspectionReportComp from "./tabs/inspection_report";
import dynamic from "next/dynamic";
import facepaint from "facepaint";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const InspectionReportComp = dynamic(import("./tabs/inspection_report"), {
  ssr: false,
  loading: () => (
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
        <img src="/svg/loader/loader-green.svg" />
      </div>
    </div>
  ),
});
const IncidentPageComp = () => {
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
  } = useSWR(`${main_url}/state-officer/factory/${router.query.id}`, fetcher);

  const factory = useContext(FactoryContext);

  const steps = [
    "Incident from",
    "Document verification",
    "Incident report",
    "Visitation letter",
  ];

  useEffect(() => {
    factory.set_tab("Incident from");
  }, []);

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
              css={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
                {" "}
                <div
                  css={{
                    cursor: "pointer",
                    marginRight: 38,
                  }}
                  onClick={() => router.back()}
                >
                  <img
                    css={{
                      width: 24,
                      height: 20,
                    }}
                    src="/svg/dashboard/arrow_left.svg"
                  />
                </div>
              </div>
              <div
                css={{
                  fontSize: 24,
                  color: "#000",
                  textTransform: "capitalize",
                }}
              >
                {single_factory?.data?.factory?._occupier_name}
              </div>
            </div>
            <div
              css={(theme) => ({
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: 60,
              })}
            >
              <div
                css={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                  alignItems: "center",
                  justifyContent: "space-between",
                  rowGap: 0,
                  columnGap: 10,
                }}
              >
                {steps.map((step) => (
                  <div
                    key={step}
                    css={(theme) => ({
                      padding: "14px 28px",
                      backgroundColor:
                        factory.tab === step
                          ? theme.colors.Primary_500
                          : theme.colors.Primary_50,
                      fontSize: 12,
                      textAlign: "center",
                      cursor: "pointer",
                      color: factory.tab === step ? "#fff" : "#000",
                    })}
                    onClick={() => factory.set_tab(step)}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
            {factory.tab === steps[0] && <FactoryRegistration />}
            {factory.tab === steps[1] && <DocumentUploadTab />}

            {factory.tab === steps[2] && <InspectionReportComp />}
            {factory.tab === steps[3] && <VisitationLetterComp />}
          </div>
        )}
      </DashboadWrapperComp>
    </div>
  );
};

export default IncidentPageComp;
