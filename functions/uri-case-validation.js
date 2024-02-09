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
      
      input.servers.forEach(element => {
        for (const [key, value] of Object.entries(input.paths)) {
            const uri =`${element.url}${key}`;
            const root = uri.match(/^(https?:\/\/)?[a-z0-9]+(\.[a-z0-9]+)*(:\d+)?/i)[0];
            const path = uri.substring(root.length);
          if(path.length>0 && path.toLowerCase()!==path){
            errors= [...errors, {
              message: `All characters after the root path in URI ${element.url}${key} are not in lower case`,
            }]
          }
        }
      });
      return errors;
    }
  };