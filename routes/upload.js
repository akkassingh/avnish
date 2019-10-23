var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});

// aws.config.update({
//     secretAccessKey: 'YOUR_ACCESS_SECRET_KEY',
//     accessKeyId: 'YOUR_ACCESS_KEY_ID',
//     region: 'us-east-1'
// });

// const s3 = new aws.S3();

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         acl: 'public-read',
//         bucket: 'YOUR_BUCKET_NAME',
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.originalname); //use Date.now() for unique file keys
//         }
//     })
// });


router.post('/', upload.single('data'), (req, res, next) => {
    const file = req.file
    if (!file) {
        return res.status(400).json({
            msg: 'Please upload a file.'
        });
    }
    res.send(200)
})

//used to upload file to s3
router.post('/uploadtos3', upload.single('file'), (req, res, next) => {
    //save the id received back.
    res.send("Uploaded!");
});

module.exports = router;
