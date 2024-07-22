import { UserAccessToken } from "src/common/model.type";

export interface UsertokensInterface {

  storeUserAccessToken(adminId: number, accessToken: string);

  // revokeUserAccessToken(accessToken: string): Promise<UserAccessToken>;

  findUserAccessToken(accessToken: string): Promise<UserAccessToken>;
}
