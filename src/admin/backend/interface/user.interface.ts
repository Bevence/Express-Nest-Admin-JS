import { IFormErrorMessage } from "./common.interface.js";

export interface IUserForm {
  email: IFormErrorMessage;
  password: IFormErrorMessage;
  role: IFormErrorMessage;
}
