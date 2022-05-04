// const fsPromises = require('fs').promises;
// const path = require('path');
// const filepath = path.resolve(__dirname, '../test.pdf');
// let messageParams = {
//     from: "Excited User <mailgun@sandbox-123.mailgun.org>",
//     to: ["test@example.com"],
//     subject: "Test subject",
//     text: "Hello here is a file in the attachment"
// }

// fsPromises.readFile(filepath)
// .then(data => {
//   const file = {
//       filename: 'test-rename.pdf',
//       data
//   }
//   messageParams.attachment = file;
//   return mg.messages.create('sandbox-123.mailgun.org', messageParams);
// })
// .then(response => {
//     console.log(response);
// })