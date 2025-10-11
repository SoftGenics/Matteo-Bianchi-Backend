const Video = require('../models/video');
const ffmpeg = require('fluent-ffmpeg')
const multer = require('multer');
const Sequelize = require('sequelize');
const { fn, col, literal } = Sequelize;
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './video');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const Addvideo = async (req, res) => {
    console.log('INFO -> Addvideo INFO API CALLED')
    // console.log(object)

    try {
        // Using upload.single() to handle a single file upload with the field name 'video'
        upload.single('video_url')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading video', error: err });
            }

            // Check if a video file was uploaded
            const videofile = req.file;
            console.log(videofile, 'videofilevideofilevideofile')
            
            // Assuming you want to save video metadata to the database
            const { title, description, video_type, like, shared, Videothumnail_id } = req.body;
            const videos = await Video.create({
                title,
                description,
                video_type,
                like: like || 0,
                shared: shared || 0,
                video_url: videofile.path,
                Videothumnail_id: Videothumnail_id
            })
            res.status(201).json({ message: 'Videothumnail added successfully', VideoDetails: videos });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};

const getvideo = async (req, res) => {
    console.log('INFO -> getvideo INFO API CALLED')


    // try {
    //     const videos = await Video.findAll();
    //     console.log(videos)
    //     res.json({ videos });

    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal server error', error: error });

    // }
}

const getvideoinfobyVideothumnail_id = async (req, res) => {
    console.log('INFO -> getvideoinfobyVideothumnail_id INFO API CALLED')
    // try {
    //     const { Videothumnail_id } = req.params
    //     const allvideo = await Video.findAll({
    //         where: {
    //             Videothumnail_id: Videothumnail_id
    //         }
    //     });
    //     console.log(allvideo)
    //     res.json({ allvideo });

    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal server error', error: error });

    // }
}

module.exports = {
    Addvideo,
    getvideo,
    getvideoinfobyVideothumnail_id
};