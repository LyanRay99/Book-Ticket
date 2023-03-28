//* Library
const multer = require("multer");
const mkdirp = require("mkdirp");

//* upload avatar
const M_uploadAvatar = (type) => {
  //* create folder before save image
  const createFolder = mkdirp.sync(`./Public/Images/${type}`);

  //* khai báo storage engine của Multer
  const storage = multer.diskStorage({
    //* setup path save image
    destination: (req, res, callback) => {
      callback(null, `./Public/Images/${type}`);
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

  return upload.single(type);
};

module.exports = {
  M_uploadAvatar,
};
