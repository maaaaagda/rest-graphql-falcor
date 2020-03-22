
const got = require('got');

export default got.extend({
    headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});
