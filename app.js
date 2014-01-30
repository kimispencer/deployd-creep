var deployd = require('deployd');
 
var options = {
  port:process.env.PORT || 3000,
  db:{
    port:10091,              // \
    host:"troup.mongohq.com", //  \ 
    name:"app21722030",      //   \
    credentials:{            //   / replace with your own settings
      username:"admin", //  /
      password:"b00bies"  // /
    }
  }
};
 
var dpd = deployd(options);
dpd.listen();