import upload from '../../../../config/multer/multerConfig'

const multerMiddleware = upload.single("file"); 


export default multerMiddleware;
