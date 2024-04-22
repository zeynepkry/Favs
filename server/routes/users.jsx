const express = require('express')
const router = express.Router()
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: 'favs-669fd',
  keyFilename: './config/favsKey.json',
});


router.get("/", (req,res)=>{
    res.send("users list")
  })
  
router.get("/new",(req,res)=>{
    res.render("users/new", {firstName: "Test"})
})

router.post('/username', async (req, res) => {
  try {
    const { username } = req.body;
    console.log('Received username:', username);

    // Store the username in Firestore
    await firestore.collection('usernames').add({
      username: username,
      timestamp: Firestore.Timestamp.now()
    });

    res.json({ message: 'Username received and stored successfully!', username: username });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error storing username in Firestore:', error);
    res.status(500).json({ error: 'Failed to store username in Firestore' });
  }
});

router.post('/userNote', async (req, res) => {
  try {
    const { userNote } = req.body;
    console.log('Received note:', userNote);

    // Store the username in Firestore
    await firestore.collection('userNotes').add({
      userNote: userNote,
      timestamp: Firestore.Timestamp.now()
    });

    res.json({ message: 'User note received and stored successfully!', userNote: userNote });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error storing userNote in Firestore:', error);
    res.status(500).json({ error: 'Failed to store userNote in Firestore' });
  }
});
router.get('/userNote', async (req, res) => {
  try {
    const snapshot = await firestore.collection('userNotes').get();
    const userNotes = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    res.json({ userNotes });
  } catch (error) {
    console.error('Error fetching user notes from Firestore:', error);
    res.status(500).json({ error: 'Failed to fetch user notes from Firestore' });
  }
});



router.delete('/userNote', async (req, res) => {
  try {
    const { userNoteId } = req.body; 
    await firestore.collection('userNotes').doc(userNoteId).delete();
    res.json({ message: 'User note deleted successfully!', userNoteId: userNoteId });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error deleting userNote from Firestore:', error);
    res.status(500).json({ error: 'Failed to delete userNote from Firestore' });
  }
});

router.put('/userNote', async (req, res) => {
  try {
    const { userNoteId, updatedNote } = req.body;
    console.log('Received note to update :', userNoteId);
    console.log('Received update:', updatedNote);

    // Update the existing note in Firestore
    await firestore.collection('userNotes').doc(userNoteId).set({
      userNote: updatedNote,
      timestamp: Firestore.Timestamp.now()
    }, { merge: true }); 

    res.json({ message: 'User note updated successfully!',});
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error updating userNote in Firestore:', error);
    res.status(500).json({ error: 'Failed to update userNote in Firestore' });
  }
});





/*
router.post('/userSocials', async (req, res) => {
  try {
    const { facebook, twitter, instagram, linkedin } = req.body; // Destructure the properties from the request body
    console.log('Received social media data:', { facebook, twitter, instagram, linkedin });

    // Assuming you're using Firestore, you can store the data like this
    await firestore.collection('socialMedia').add({
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
      timestamp: Firestore.Timestamp.now()
    });

    res.json({ message: 'Social media data received and stored successfully!', data: { facebook, twitter, instagram, linkedin } });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error storing social media data in Firestore:', error);
    res.status(500).json({ error: 'Failed to store social media data in Firestore' });
  }
});
*/




module.exports = router






/*
router.post("/", (req,res)=> {
  const isValid = true
  if(isValid){
    users.push({firstName: req.body.firstName})
    res.redirect(`/users/${users.length -1}`)
  }else{
    console.log("eroor")
    res.render(`users/new`, {firstName: req.body.firstName})
  }
  res.send("Hi")
})

/*
router.route("/:id")
    .get((req, res) => {
        console.log(req.user);
        res.send(`get user with ID ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update user with ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`delete user with ID ${req.params.id}`)
    })
*/
/*
const users = [{ name: "Kyle "}, {name:"Sally" }]
router.param("id", (req,res,next,id)=> {
  req.user = users[id]
  next()  
})  

*/
/*

// Route to handle other requests
app.get('/', logger, (req, res) => {
  res.send("helloooo ");
});

const userRouter = require('./routes/users.jsx')
app.use('/users', userRouter);

// Middleware to log requests
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
