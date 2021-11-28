var cloudinary = require('cloudinary').v2;

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.upload = async (req, res) => {
  try {
    console.log('upload', req.body);
    let result = await cloudinary.uploader.upload_large(
      req.body.image,
      {
        public_id: `pepe/${Date.now()}`,
        resource_type: 'auto', // jpeg, png
      },
      function (error, result) {
        console.log(error, result);
      }
    );
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send('ok');
  });
};