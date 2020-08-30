import { LoginRequestDTO } from './LoginDTO';
import { IUseCase } from '@useCases/IUseCase';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { IHashComparer, IHasher } from '../../../security/cryptography';

class LoginUseCase implements IUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private passwordComparer: IHashComparer,
    private tokenGenerator: IHasher
  ) {};

  async execute (data: LoginRequestDTO) {
    console.log('Executing Login Use Case:');

    const userAccountFound = await this.usersRepository.findByEmail(data.email);
    console.log('userAccountFound',userAccountFound);

    if (userAccountFound) {
      const isPasswordValid = await this.passwordComparer.compare(data.password, userAccountFound.password);

      if (isPasswordValid) {
        const accessToken = await this.tokenGenerator.hash(userAccountFound.id);
        return accessToken;
      }
    }

    return null;
  }
};

export { LoginUseCase };