import { PARTICLE_KEY, CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';
	class API {
	  constructor() {
	    this.particleDevices = {};
	    this.particleBaseUrl = 'https://api.particle.io/v1';
	    this.key = PARTICLE_KEY
	    this.defaultContentType = 'application/x-www-form-urlencoded'
	  }


	  particleLogin(username, password) {
	    return new Promise((resolve, reject) => {
	      const url = `https://api.particle.io/oauth/token`
	      fetch("https://api.particle.io/oauth/token", {
	        method: 'POST',
	        headers: {
	          'Accept': 'application/json',
	          'Authorization': `Bearer ${this.key}`,
	          'Content-Type': this.defaultContentType
	        },
	        body: this.urlEncodedBody({
	          grant_type: 'password',
	          username,
	          password,
	          client_id: CLIENT_ID,
	          client_secret: CLIENT_SECRET
	        })
	      })
	      .then((response) => response.json())
	      .then((responseJson) => resolve(responseJson))
	      .catch((error) => {
	        reject(error);
	      })
	    })
	  }

    particleListDevices(accessToken) {
      return new Promise((resolve, reject) => {
        const url = `${this.particleBaseUrl}/devices`;
        fetch(url, {
          method: 'GET',
          headers: this.setHeaders(accessToken)
        })
        .then((response) => response.json())
        .then((responseJson) => resolve(responseJson))
        .catch((error) => {
          reject(error);
        })
      })
    }

    particleGetDeviceInfo(accessToken, deviceId) {
      return new Promise((resolve, reject) => {
        const url = `${this.particleBaseUrl}/devices/${deviceId}`
        fetch(url, {
          method: 'GET',
          headers: this.setHeaders(accessToken)
        })
        .then((response) => response.json())
        .then((responseJson) => resolve(responseJson))
        .catch((error) => {
          reject(error);
        })
      })
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
	    const url = `${this.particleBaseUrl}/devices/${device.id}/${endpoint}?access_token=${this.key}`;
	    fetch(url, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': this.defaultContentType
	      },
	      body: this.urlEncodedBody({params: command})
	    }).then((response) => {
	      // TODO: need to add error handling here
	    })
	  }

    setHeaders(accessToken) {
      return {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.key}`,
        'Content-Type': this.defaultContentType
      };
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
