var deployd = require('deployd');
 
var options = {
  port:process.env.PORT || 3000
};
 
var dpd = deployd(options);
dpd.listen();