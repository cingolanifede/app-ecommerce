// Check for mandatory environment variables
const required = [
  "NODE_ENV",
  "DB_MAIN_HOST",
  "DB_MAIN_USER",
  "DB_MAIN_PASS",
  "DB_MAIN_NAME",
  "DB_MAIN_PORT",
  "PORT",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_CLOUD_NAME",
  "TOKEN_SECRET",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_SECURE",
  "EMAIL_USER",
  "EMAIL_PASS",
];

required.forEach((param) => {
  if (!process.env[param]) {
    throw new Error(`Environment parameter ${param} is missing`);
  }
});

const configuration = {
  api: {
    env: process.env.NODE_ENV,
    tokenSecret: process.env.TOKEN_SECRET,
  },
  mainDatabase: {
    user: process.env.DB_MAIN_USER,
    pass: process.env.DB_MAIN_PASS,
    host: process.env.DB_MAIN_HOST,
    name: process.env.DB_MAIN_NAME,
    port: process.env.DB_MAIN_PORT,
  },
  mailer: {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 465,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Security options to disallow using attachments from file or URL
    disableFileAccess: true,
    disableUrlAccess: true,
  }
};

module.exports = {
  configuration
};
