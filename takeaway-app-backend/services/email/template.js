// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.

module.exports = {
  confirm: (id, firstName) => ({
    subject: 'Exotic Shaad Email Verification',
    html: `
      <h2> Hey ${firstName}, </h2>
      <p>Thank you for deciding to create an account with Exotic Shaad! You're one step closer to ordering and 
      accessing a range of what we have to offer</p>
      <p> Before we get started, We'll need to verify your email. Click on the      
      <a href='http://${process.env.FRONT_END_URL}/account/verify/${id}'>
        link
      </a> to verify your email address </p>
      <br/>
      <p>If you didn't request this please ignore this email.</p>
      <br/>
      <p>Thanks</p>
      <br/>
      <p>Exotic Shaad</p>
    
    `,
    text: `Copy and paste this link: ${process.env.FRONT_END_URL}/verify/${id}`
  })
};
