import DashboardLayout from "@/components/layouts/DashboardLayout";
import Assignment from "@/components/views/Admin/Applicants";

const AdminApplicantsPage = () => {
  return (
    <DashboardLayout
      title="Applicants"
      description="Manage Applicants"
      type="ADMIN">
      <Assignment />
    </DashboardLayout>
  )
}

export default AdminApplicantsPage;