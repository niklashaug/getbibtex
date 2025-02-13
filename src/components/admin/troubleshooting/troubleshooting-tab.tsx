import { api } from "@/utils/api";
import { columns } from "./troubleshooting-columns"
import { DataTable } from "./troubleshooting-table"

export const TroubleshootingTab = () => {
  const { data } = api.stats.getErrors.useQuery();

  return (
    <div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  )
}
