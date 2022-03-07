export class NavigationBarModel {
  public allowRoles: string;
  constructor(
    public name: string,
    public url: string,
    public isAllowAll: boolean = false,
    public rolesAccess: string[] = []
  ) {
    this.allowRoles = rolesAccess.join(',');
  }
}
