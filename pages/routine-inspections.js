//  import RoutineInspectionComp from "@/src/components/dosh_admin_portal/routine_inspections";
import dynamic from "next/dynamic";

const RoutineInspectionComp = dynamic(
  import("@/src/components/dosh_admin_portal/routine_inspections"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);
// import ReplacementComp from "@/src/components/zonal_admin_portal/tabs/replacement";

export default RoutineInspectionComp;
