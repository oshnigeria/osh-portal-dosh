/** @jsxImportSource @emotion/react */
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";

import { main_url, cookies_id } from "@/src/details";
import NewRegistrationComp from "./tabs/new_registration";
const RoutineInspectionComp = () => {
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
    data: factory,

    isLoading: factory_isLoading,
  } = useSWR(`${main_url}/state-officer/factories`, fetcher);

  console.log(factory);
  return <NewRegistrationComp />;
};

export default RoutineInspectionComp;
