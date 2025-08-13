import HeaderEmployee from "@/components/dashboard/employees/HeaderEmployee";
import StatsEmployee from "@/components/dashboard/employees/StatsEmployee";
import FilterEmployee from "@/components/dashboard/employees/FilterEmployee";
import { getEmployees } from "@/lib/api/usersReq";

export const dynamic = "force-dynamic";

export default async function EmployeesPage() {
  const employees = await getEmployees();

  return (
    <div className="p-6 space-y-6">
      <HeaderEmployee />
      <StatsEmployee employees={employees} />
      <FilterEmployee employees={employees} />
    </div>
  );
}
