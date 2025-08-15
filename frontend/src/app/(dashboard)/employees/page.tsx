import HeaderEmployee from "@/components/dashboard/employees/HeaderEmployee";
import StatsEmployee from "@/components/dashboard/employees/StatsEmployee";
import FilterEmployee from "@/components/dashboard/employees/FilterEmployee";
import { getEmployees } from "@/lib/api/usersReq";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function EmployeesPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    throw new Error("No token found. Please log in.");
  }

  const employees = await getEmployees(accessToken);

  return (
    <div className="p-6 space-y-6">
      <HeaderEmployee />
      <StatsEmployee employees={employees} />
      <FilterEmployee employees={employees} />
    </div>
  );
}
