import Realm from 'realm';
import { DeviceFunctionSchema } from './models/DeviceFunction';
import { VariableSchema } from './models/Variable';
import { DeviceSchema } from './models/Device';
import { UserSchema } from './models/User';
import { AccountSchema } from './models/Account';

// This is our client side database, remember everytime this schema is altered,
// while in dev, you'll need to stop all processes/simulators and rebuild
export const realm = new Realm({
  schema: [
    DeviceFunctionSchema,
    VariableSchema,
    DeviceSchema,
    UserSchema,
    AccountSchema
  ],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 1) {
      let oldObjects = oldRealm.objects('User');
      let newObjects = newRealm.objects('User');
      for(let i = 0; i < oldObjects.length; i++) {
        newObjects[i].firstName = oldObjects[i].firstName;
        newObjects[i].lastName = oldObjects[i].lastName;
        newObjects[i].userName = oldObjects[i].userName;
      }
    }
  }
});
