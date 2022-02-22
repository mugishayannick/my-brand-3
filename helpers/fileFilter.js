export const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
         cb(null, true)
    } else {
         cb("Invalid image", false)
    }    
}