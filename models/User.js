export const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    firstName: { type: 'string', optional: true },
    lastName: { type: 'string', optional: true },
    username: { type: 'string', optional: true },
    accessToken: 'string',
    devices: { type: 'list', objectType: 'Device'}
  }
};
