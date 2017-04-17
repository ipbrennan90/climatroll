
class API {
  constructor() {
    this.particleDevices = {};
    this.particleBaseUrl = 'https://api.particle.io/v1';
    this.token = '';
  }

  particleLogin(username, password) {
  }
  urlEncodedBody(body) {
    formBody = [];
    for (let property in body) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(body[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    return formBody.join('&');
  }

  particlePost(device, endpoint, command) {
    const url = `${this.baseUrl}/devices/${device.id}/${endpoint}?access_token=${this.key}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: this.urlEncodedBody({params: command})
    }).then((response) => {
      // TODO: need to add error handling here
    })
  }

  // particleGet(device, endpoint) {
  //   const url = `${this.baseUrl}devices/${device.id}/${endpoint}?access_token=${this.key}`;
  //   fetch(url, {
  //     method: 'GET',
  //     headers
  //   })
  // }
}

export const ApiService = new API()
