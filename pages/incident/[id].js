import dynamic from "next/dynamic";

const IncidentPageComp = dynamic(
  import("@/src/components/incidents/incident_component"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default IncidentPageComp;
