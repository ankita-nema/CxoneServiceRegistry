module.exports = input => {
  if (input.servers == null || input.servers.length == 0) {
    return [
      {
        message: 'OpenAPI "servers" must be present and non-empty array',
      },
    ];
  } else if(input.paths ==null || input.paths.length == 0){
    return [
      {
        message: 'OpenAPI "paths" must be present and non-empty object',
      }
    ];
  }
   else {
    let errors=[];
    const urlRegEx=/(https?):\/\/([a-z0-9-]+\.)+[a-z]+(:[0-9]+)?\/[a-zA-Z0-9_-]+\/V[0-9]+\/[a-zA-Z0-9_-]+.*$/i
    input.servers.forEach(element => {
      for (const [key, value] of Object.entries(input.paths)) {
        if(urlRegEx.test(`${element.url}${key}`)===false){
          errors= [...errors, {
            message: `URI ${element.url}${key} does not follow the standard format https://<host name>/<service name>/<service version>/<resource name>`,
          }]
        }
      }
    });
    return errors;
  }
};