import dynamic from "next/dynamic";

const SettingsComp = dynamic(import("@/src/components/settings"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// import SettingsComp from "@/src/components/settings";

export default SettingsComp;
