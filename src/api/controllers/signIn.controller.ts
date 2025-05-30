import { APIRequestContext } from "@playwright/test";
import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/api.types";
import { IAPICredentials, ILoginFromResponse } from "types/user.types";
import { logStep } from "utils/reporter.utils";

export class SignInController {
  private request: RequestApi;
  constructor(context: APIRequestContext) {
    this.request = new RequestApi(context);
  }

  @logStep("Login")
  async signIn(body: IAPICredentials) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.LOGIN,
      method: "post",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    };
    return await this.request.send<ILoginFromResponse>(options);
  }
}
