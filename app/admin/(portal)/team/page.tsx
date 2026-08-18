import TeamManager from "@/components/admin/team-manager";
import { db } from "@/lib/db";

export const metadata = { title: "Team — CodeTherapy Admin" };

export default async function AdminTeamPage() {
  const [members, publicMembers, roleSetting] = await Promise.all([
    db.adminUser.findMany({ orderBy: { createdAt: "asc" } }),
    db.teamMember.findMany({ orderBy: { order: "asc" } }),
    db.setting.findUnique({ where: { key: "rolePermissions" } }),
  ]);

  const rolePermissions =
    (roleSetting?.value as Record<string, string[]> | null) ?? null;

  return (
    <div className="p-6">
      <TeamManager members={members} publicMembers={publicMembers} rolePermissions={rolePermissions} />
    </div>
  );
}
