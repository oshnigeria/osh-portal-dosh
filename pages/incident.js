import dynamic from "next/dynamic";

const IncidentsComp = dynamic(import("@/src/components/incidents"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default IncidentsComp;
