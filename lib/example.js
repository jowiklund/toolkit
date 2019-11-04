const ffmpeg = require('fluent-ffmpeg');
const glob = require('glob');
const fs = require("fs");
const localpath = process.cwd();

glob(`${localpath}/*.mp4`, async function (er, files) {
	if ( files.length > 0 ) {
		if (!fs.existsSync(`${localpath}/thumbnails/`)) {
			fs.mkdir(`${localpath}/thumbnails/`, (err) => {
				if (err) throw err;
			});
			files.map(file => {
				generateThumbnail(file);
			})
		} else {
			files.map(file => {
				generateThumbnail(file);
			})
		}
	}
})

function generateThumbnail(path) {
	ffmpeg(path)
	.screenshots({
		timestamps: [1],
		filename: '%b-thumbnail.png',
		folder: `${localpath}/thumbnails/`,
	});
}