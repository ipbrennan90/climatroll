import Realm from 'realm';
import { DeviceFunctionSchema } from './models/DeviceFunction';
import { VariableSchema } from './models/Variable';
import { DeviceSchema } from './models/Device';
import { UserSchema } from './models/User';

// This is our client side database, remember everytime this schema is altered,
// while in dev, you'll need to stop all processes/simulators and rebuild
export const realm = new Realm({
  schema: [
    DeviceFunctionSchema,
    VariableSchema,
    DeviceSchema,
    UserSchema
  ]
});
