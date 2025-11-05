import { Nullable } from 'xenopomp-essentials';

export interface UserServiceContract<
  Shape extends UserShape,
  ExtendedShape extends Partial<Shape>,
  UpdateShape extends Partial<Shape>,
  AuthDto extends AuthDtoShape,
  UpdateDto extends UpdateDtoShape,
> {
  getById(id: Shape['id']): Promise<Nullable<ExtendedShape>>;
  getByLogin(login: Shape['login']): Promise<Nullable<ExtendedShape>>;
  create(dto: AuthDto): Promise<Shape>;
  update(id: Shape['id'], dto: UpdateDto): Promise<Nullable<UpdateShape>>;
  delete(id: Shape['id']): Promise<void>;
}

type UserShape = {
  id: string;
  login: string;
  name?: string | null;
  password: string;
};

type AuthDtoShape = {
  login: string;
  password: string;
};

type UpdateDtoShape = AuthDtoShape & {
  name: string;
};
