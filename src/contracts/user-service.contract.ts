export interface UserServiceContract<
  Shape extends UserShape,
  ExtendedShape extends Partial<Shape>,
  UpdateShape extends Partial<Shape>,
  AuthDto extends AuthDtoShape,
  UpdateDto extends UpdateDtoShape,
> {
  getById(id: Shape['id']): Promise<ExtendedShape>;
  getByLogin(login: Shape['login']): Promise<ExtendedShape>;
  create(dto: AuthDto): Promise<Shape>;
  update(id: Shape['id'], dto: UpdateDto): Promise<UpdateShape>;
  delete(id: Shape['id']): Promise<void>;
}

type UserShape = {
  id: string;
  login: string;
  name?: string;
  password: string;
};

type AuthDtoShape = {
  login: string;
  password: string;
};

type UpdateDtoShape = AuthDtoShape & {
  name: string;
};
