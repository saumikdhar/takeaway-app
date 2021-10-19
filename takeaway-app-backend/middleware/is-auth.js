const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const rememberMe = req.body.rememberMe;

  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      'MIIEowIBAAKCAQEAw9ti2r3zJl7h7cSPbeNj+BtvaDGyPrOoG4lbUqEnRL3locQj\n' +
        'c/xZTAlzlVXM44sQ164QWFPCDfKalIfC2WJksm65RpbMGSA16aHO/4SXVOIycSYi\n' +
        'H9jeyiyKrL3nomHFeGssCkrhMR/T/A02ArZd9eFPHDt1LClkRovJrAuLE8GRU22u\n' +
        'oFV06rcunEzIW67LmsOU1lxh7xSIT3E3Ay/x9lVjUxsRi0w/ac1iViMd3b0i4QIQ\n' +
        'vHeCv5VVhJA4cXACLJOP5t8889JCq/meydQrCbxz+d/7i7EM2b6JUYJYFxL9a0oq\n' +
        '4GPDdEUJf3dQ4ixBE8HnmT8OWaW++rw2U2rLxQIDAQABAoIBAFsQvr4GY/ALXfE3\n' +
        '25i0id7qorpHoSEWV6u2Cgg5dhC4WvUERZfAVaTNIDjnVATYvFQMUv0+tJPXoZg+\n' +
        'J5L79OYiJXN02iE0oNyop56W/+Yv5lRF7sfwBmbqnvACvJj77N04t5lxh5NXwTEI\n' +
        '03wfX0DcKfRukOSfukgy5upf06KzJUihMzAava5H1wXe61LdfwWXKZF8H4uSs1Aa\n' +
        '5rNdMVRPrzICRRGZavusb3MQ6zOoWMJRiyDaeTU9+8BiyOpDnF41CBI4R7bo/h8o\n' +
        'Qo97dfbPN8q38pTfs/udHuqD61O+Qh8XoE8wkrcPAkT68v90w+ihUUEtfGkG/YRH\n' +
        'D+/ZiWECgYEA7g+TdLFn54C9ZW39/Indh7P8MZFXTfAreVPSk4EMorAFJpppAjdv\n' +
        'dRBKsOMUR5CReoh+J095csv/qmO2kVER0QmRXIz3OOwI7XwHOctNLX31qT/+w5V3\n' +
        'Pf6w4QmcfJa/4qQ5ehYxSeJaNwg74XPqANqzZ+aZQfF+/5TaYEYs2ncCgYEA0p2o\n' +
        'H5OKb/e9p/+ujy6PLsWXvlUrYPPvuLrYUHPKJpm2KgXoGpYThwfJ+daGSFEsXBur\n' +
        '7Dp4onhUZmMQSHQSl9E0BGDTbveVRUHnwtINKVjsPTv/wRhqhwxgK0ZUCBBXOOjb\n' +
        'VNuHnOzWPrTRtx9sobK6ieSHCXIApvk7yz18XqMCgYBzQ+9trQhWOyt5FQzJXid5\n' +
        'MViG14yiHAuwrzliWjW3/+o+ir0Vaan50G2ZwBltnT4TSktq1TxErSmZYrZfHhW2\n' +
        'VR+g5FA/q2mXM1p8TUeNI1PzIx1DrfcSeWNDUtgGKye1oTaDOoOa9pIf20jDHNDM\n' +
        'oRgE0s6Z80g+j+A8hT3qeQKBgBUGI9gzFCilJEt23Gfyj9xtYP5g5hmhgBaCoEE3\n' +
        'rcA4q9R6DndI794UyvajkXf6kmEHahwEojIlrNcjoGZ7H7gD7Btbxv9Wu5HUSFxM\n' +
        'N4AfHkXmjVsrIsckVx06wfykFPDbXbmUyG7DvYc46Y5MFr31Z2WIaGpq9OG2E1/w\n' +
        'XU/dAoGBAJhQSP2urKQ4SgSBaBBf22qEA7ybfcd6LboOXDtVKzxdqBi5nW5vsLGR\n' +
        'PlzK4+zr7NvDVEB1vltuJcEL69ubd78RU9eQs/zw6NlZEn5XKDH+Ml9Er5bTqTaB\n' +
        'p820+e23sMORL+Vt/5CgxnEw1fXKWAUj37tgDAfFwFRD9/j28vHY'
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not Authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userEmail = decodedToken.email;
  req.userId = decodedToken.userId;
  console.log(decodedToken);
  next();
};
