//* Library
const multer = require("multer");

//* upload avatar
const M_uploadAvatar = (req, res, next) => {
  //* khai báo storage engine của Multer
  const storage = multer.diskStorage({
    //* setup path save image
    destination: (req, res, callback) => {
      callback(null, "./Public/Images/Avatars");
    },

    //* set name of image
    filename: (req, file, callback) => {
      callback(null, Date.now() + "_" + file.originalname);
    },
  });

  //* declare middleware upload
  const upload = multer({
    storage: storage,

    //* check đuôi file image
    fileFilter: (req, file, callback) => {
      const extensionImage = [".png", ".jpg"];
      const extension = file.originalname.slice(-4);

      extensionImage.includes(extension)
        ? callback(null, true)
        : callback(new Error("extension file image ko hop le"));
    },

    //* check size of image <= 1MB
    limits: {
      fileSize: 1000000,
    },
  });

  //   next();
  return upload.single("avatar");
};

module.exports = {
  M_uploadAvatar,
};
