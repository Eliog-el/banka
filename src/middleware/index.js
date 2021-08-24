import { validate } from './validator';
import { userAuthentication, isClient, isStaff, isAdmin } from './authentication'

export default { validate, userAuthentication, isClient, isStaff, isAdmin }
