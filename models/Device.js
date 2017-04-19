export const DeviceSchema = {
  name: 'Device',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    connected: 'bool',
    variables: { type: 'list', objectType: 'Variable' },
    functions: { type: 'list', objectType: 'DeviceFunction' },
    lastHeard: 'date'
  }
}
