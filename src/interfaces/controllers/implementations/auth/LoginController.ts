import { IHttpClientController } from '../../definitions';
import { HttpRequestType } from '@interfaces/helpers/types';
import { HttpClientResponse } from '@interfaces/helpers/HttpClientResponse';
import { MissingParamError } from '@interfaces/helpers/errors';
import { LoginUseCase } from '@useCases/auth/login/LoginUseCase';

export class LoginController implements IHttpClientController {

  constructor(
    private loginUseCase: LoginUseCase
  ) {}

  handle = async (httpRequest: HttpRequestType) => {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return HttpClientResponse.badRequest(new MissingParamError('email'));
      }
      if (!password) {
        return HttpClientResponse.badRequest(new MissingParamError('password'));
      }

      const accessToken = await this.loginUseCase.execute({ email, password });

      if (accessToken) {
        return HttpClientResponse.ok({ accessToken });
      } else {
        return HttpClientResponse.unauthorizedError();
      }

    } catch (error) {
      return HttpClientResponse.serverError();
    }
  }
};
