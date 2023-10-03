import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { cookies_id } from "../details";

const FactoryContext = createContext();

const FactoryProvider = ({ children }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState({});
  const [factory_details, setFactory_details] = useState({});
  const [tab, setTab] = useState("Factory information");

  const router = useRouter();

  const set_tab = (tab) => {
    setTab(tab);
  };
  const addDocuments = (factoryId) => {
    setLoading(true);

    const documentStateMap = {
      cac_certificate: setCacCertificate,
      site_plan: setSitePlan,
      list_of_machinery: setListOfMachinery,
      site_layout: setSiteLayout,
      list_of_raw_materials: setListOfRawMaterials,
      building_plan: setBuildingPlan,
      machine_layout: setMachineLayout,
      payment_reciept: setPaymentReceipt,
    };
    let processedCount = 0;
    const totalDocs = Object.keys(documentStateMap).length;
    for (const docType in documentStateMap) {
      if (documentStateMap.hasOwnProperty(docType)) {
        const formData = new FormData();
        const state = documentStateMap[docType];
        const document = state.file;
        if (document) {
          formData.append("doc", document);
          formData.append("doc_type", docType);
          formData.append("factory", factoryId);

          axios
            .post(`${main_url}/account/user/factory/doc`, formData, {
              headers: {
                "Content-Type": "multipart/form-data", // Use multipart/form-data for file upload
                Authorization: `Bearer ${Cookies.get(cookies_id)}`,
              },
            })
            .then((res) => {
              console.log(res);
              success_message(`${docType} uploaded`);
              processedCount++;

              // Check if this is the last iteration
              if (processedCount === totalDocs) {
                // This is the last iteration
                setLoading(false);
                if (!loading) {
                  // You can navigate or close the dialog here
                  // router.push("/dashboard/registration");

                  setTimeout(function () {
                    props.close();
                  }, 3000);
                }
              }
            });
        }
      }
    }
  };

  const uploadDocument = (docType, document) => {
    // Update the uploadedDocuments state with the new document
    setUploadedDocuments((prevDocuments) => ({
      ...prevDocuments,
      [docType]: document,
    }));
  };

  const add_factory_details = (object) => {
    setFactory_details(object);
  };

  return (
    <FactoryContext.Provider
      value={{
        add_factory_details,
        factory_details,
        uploadDocument,
        uploadedDocuments,
        set_tab,
        tab,
      }}
    >
      {children}
    </FactoryContext.Provider>
  );
};

export { FactoryContext, FactoryProvider };
