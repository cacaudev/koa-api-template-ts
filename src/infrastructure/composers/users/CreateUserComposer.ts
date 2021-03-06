import { CreateUserController } from '@controllers/users/CreateUserController';
import { PasswordEncrypter } from '@infrastructure/cryptography/bcrypt/passwordEncrypter';
import { UserSequelizeRepository } from '@infrastructure/orm/sequelize/repositories/UserSequelizeRepository';
import { CreateUserUseCase } from '@useCases/users/createUserUseCase';
//import { UserKnexRepository } from '../../orm/knex/repositories/UserKnexRepository';

const usersRepository = new UserSequelizeRepository();
const bcryptPasswordEncrypter = new PasswordEncrypter();

const createUserUseCase = new CreateUserUseCase(usersRepository, bcryptPasswordEncrypter);

const createUserComposer = new CreateUserController(createUserUseCase);

export { createUserComposer };
