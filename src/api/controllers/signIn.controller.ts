import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/api.types";
import { ICredentials, ILoginResponse } from "types/credentials.types";

export class SignInController {
  constructor(private request = new RequestApi()) {}

  async signIn(body: ICredentials) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.LOGIN,
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      data: body,
    };
    return await this.request.send<ILoginResponse>(options);
  }
}
