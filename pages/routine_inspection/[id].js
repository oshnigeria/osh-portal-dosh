import dynamic from "next/dynamic";

const RoutineCheckDetailsComp = dynamic(
  import(
    "@/src/components/dosh_admin_portal/routine_inspections/comps/routine_check_details"
  ),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);
// import FactoryPageComp from "@/src/components/state_admin_portal/factory_component";

export default RoutineCheckDetailsComp;
