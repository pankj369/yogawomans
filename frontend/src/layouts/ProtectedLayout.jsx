import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function ProtectedLayout({ children, ...props }) {
  return <DashboardLayout {...props}>{children}</DashboardLayout>;
}
