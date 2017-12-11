/**
 * Helper functions for turning callback-based functions to Promises
 */

const writeFilePromise = (fs, filePath, calendar) => (
    new Promise((resolve, reject) => {
        fs.writeFile(filePath, calendar.toString(), err => {
            if (err) reject(err);
            resolve();
        })
    })
);

const downloadPromise = (res, filePath) => (
    new Promise((resolve, reject) => {
        res.download(filePath, err => {
            if (err) reject(err);
            resolve();
        });
    })
);

const unlinkPromise = (fs, filePath) => (
    new Promise((resolve, reject) => {
        fs.unlink(filePath, err => {
            if (err) reject(err);
            resolve();
        });
    })
);

module.exports = {
    writeFilePromise,
    downloadPromise,
    unlinkPromise
};
