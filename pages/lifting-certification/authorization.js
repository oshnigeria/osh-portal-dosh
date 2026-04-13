import dynamic from "next/dynamic";

// import AuthorizationComp from "@/src/components/dosh_admin_portal/lifting_certification/authorization"
const AuthorizationComp = dynamic(import("@/src/components/dosh_admin_portal/lifting_certification/authorization"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default AuthorizationComp