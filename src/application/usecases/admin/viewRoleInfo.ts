export interface AdminRepositary {
    viewRoleInfo(roleId: string, roleInfo: string): void;
}

export class ViewRoleInfo {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(roleId: string, roleInfo: string) {
        const roleInformation = await this.adminRepositary.viewRoleInfo(
            roleId,
            roleInfo
        );

        return { roleInformation };
    }
}
