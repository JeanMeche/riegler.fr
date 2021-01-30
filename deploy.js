var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
    user: "riegler",
    host: "ftp.cluster015.hosting.ovh.net",
    port: 21,
    localRoot: __dirname + "/build",
    remoteRoot: "/app/",
    // include: ["*", "**/*"],      // this would upload everything except dot files
    include: ["*", "**/*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    // use sftp or ftp
    sftp: false
};

ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));

    ftpDeploy.on("uploading", function(data) {
    console.log(data.totalFilesCount); // total file count being transferred
    console.log(data.transferredFileCount); // number of files transferred
    console.log(data.filename); // partial path with filename being uploaded
});
ftpDeploy.on("uploaded", function(data) {
    console.log(data); // same data as uploading event
});
ftpDeploy.on("log", function(data) {
    console.log(data); // same data as uploading event
});
ftpDeploy.on("upload-error", function(data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});