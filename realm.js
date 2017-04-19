import Realm from 'realm';
import { DeviceFunctionSchema } from './models/DeviceFunction';



let realm = new Realm({schema: [DeviceFunctionSchema]});
