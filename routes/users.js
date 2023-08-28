const express = require("express");
const multer = require("multer");
const mongodb = require("mongodb");

const db = require("../data/database");

const router = express.Router();

/*execute multer function. In addition we pass parameter.
{ dest: "images" } - where uploaded files should be stored.In this case, in 'images' folder. dest - destination.*/

//simple option -> const upload = multer({ dest: "images" }); 


//if we use in 'dest', we configure the path of the storage only. if we want to configure extra configuration,such us add
// extension to images(it is alow us to see the images in vscode) we use in 'storage'.
const storageConfig = multer.diskStorage({   //creates a new storage object as expected by Multer.
  destination: (req, file, callback)=>{
    callback(null, 'images');  //the first parameter is error that might occur, but now we don't use it.
    // storage destination folder: 'images' (like 'dest' option).
  },
  fileName: (req, file, cb)=>{
    cb(null, Date.now() + '-' + file.originalname)  //file.originalname - the originalname name of the image. 
    // we don't want yo use that only because another file with the same name override it. 
    // with Date.now() we create uniq name.
  }
}); 


// pass the new storage object that we created:
const upload = multer({ storage: storageConfig});  //'storage' accept complete storage object that contains detail instructions.



router.get("/", function (req, res) {
  res.render("profiles");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});


/*
in express route, you can add an unlimited list of middleware function. so we can add 'upload.single()'.
we want that upload.single() execute first, That's we add it in middle parameter.
upload is object.
to upload.single() we pass the input name of the file in the form.
upload.single("image") - return middleware that execute for all request in this path. It search for file in the request 
and give us access to this file.
*/
router.post("/profiles", upload.single('image'), (req, res) => {
  //req.file is object that give us extra information. things like filename and the path,
  // the full path to image that stored automatically in 'image' folder on hard disk.
  const imageFile = req.file;
  const userData = req.body; //hold the other data of the form.
  // db.getDb().collection().insertOne({ imageFile });
  console.log(userData);
  console.log(imageFile);
  res.redirect('/');
});

module.exports = router;

/*
דאטאבייס לא מיועד לשמירת קבצים, אלא לאיפוסים פשוטים כמו מחזורת, מספרים וכו'.
מולטר, בנוסף לכך שהיא מנתחת את הקובץ שנשלח בטופס, היא שומרת לנו אותו אוטומטית במערכת קבצים, כמו דיסק קשיח. הדיסק קשיח במחשב שלנו מיועד לשמירת קבצים.
מה שישמר בדאטאבייס זה הנתיב למקום האחסון בדיסק קשיח.
*/
