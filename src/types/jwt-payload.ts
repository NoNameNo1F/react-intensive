import type { JwtPayload } from "jwt-decode";

export default interface JwtPayloadModel extends JwtPayload {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
}
