export const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    firstName: 'string',
    lastName: 'string',
    username: 'string',
    accessToken: 'string',
    devices: { type: 'list', objectType: 'Device'}
  }
};
