const express = require('express');
const router = express.Router();
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: 'favs-669fd',
  keyFilename: './config/favsKey.json',
});
const verifyToken = require('../verifyToken.js'); // Import the middleware function
const admin = require('firebase-admin');

//router.use(verifyToken); // Apply the middleware to all routes in this router

router.get("/", (req,res)=>{
  res.send("users list")
});

router.get("/new",(req,res)=>{
  res.render("users/new", {firstName: "Test"})
});

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

router.post('/createUser',verifyToken, async (req, res) => {
  try {
    const { userData } = req.body;
    console.log('Received data:', userData);
    const userId = req.user.uid; // Get the user's UID from the verified token

    await firestore.collection("users").doc(userId).set({
      userEmail: userData.email,
      username: userData.username,
      // Add additional user data as needed
      timestamp: admin.firestore.Timestamp.now()
    })
    res.json({ message: 'User data received and stored successfully!', userData: userData });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error storing userData in Firestore:', error);
    res.status(500).json({ error: 'Failed to store userData in Firestore' });
  }
});

router.post('/userNote',verifyToken, async (req, res) => {
  try {
    const { userNote } = req.body;
    console.log(req.user)
    console.log('Received note:', userNote);
    await firestore.collection('users').doc(req.user.user_id).collection('myNotes').add({
      userNote: userNote,
      userId: req.user.user_id, 
      timestamp: Firestore.Timestamp.now()
    });

    res.json({ message: 'User note received and stored successfully!', userNote: userNote });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error storing userNote in Firestore:', error);
    res.status(500).json({ error: 'Failed to store userNote in Firestore' });
  }
});
/* BU GENEL NOTE ICIN 
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
*/

router.get('/userNote',verifyToken, async (req, res) => {
  try {
    const snapshot = await firestore.collection('users').doc(req.user.user_id).collection('myNotes').get();
    
    // Check if snapshot exists and has documents
    if (!snapshot.empty) {
      // Map the snapshot to an array of user notes
      const myNotes = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));

      // Send the user notes in the response
      res.json({ myNotes });
    } else {
      // If the snapshot is empty, send a message indicating no notes found
      res.json({ message: 'No user notes found' });
    }
  } catch (error) {
    console.error('Error fetching user notes from Firestore:', error);
    res.status(500).json({ error: 'Failed to fetch user notes from Firestore' });
  }
});

router.get('/allUserNotes', async (req, res) => {
  try {
    const allUserNotes = [];
    const usersSnapshot = await firestore.collection('users').get();
    
    if (!usersSnapshot.empty) {
      // Map each asynchronous operation to an array of promises
      const userNotesPromises = usersSnapshot.docs.map(async userDoc => {
        const userData = userDoc.data(); // Get user data
        const myUserNotes = await firestore.collection('users').doc(userDoc.id).collection('myNotes').orderBy('timestamp', 'desc').get();
        myUserNotes.forEach(doc => {
          const userNotes = doc.data();
          userNotesWithUser ={
            ...userNotes,
            user: userData // Include user data with note
          }
          console.log(userNotesWithUser);
          allUserNotes.push(userNotesWithUser);
        });
      });
      
      // Wait for all promises to resolve
      await Promise.all(userNotesPromises);
    }

    //console.log(allUserNotes);
    res.json({ userNotes: allUserNotes }); // Return userNotes
  } catch (error) {
    console.error('Error fetching user notes from Firestore:', error);
    res.status(500).json({ error: 'Failed to fetch user notes from Firestore' });
  }
});

/*
router.get('/allUserNotes', verifyToken, async (req, res) => {
  try {
    const usersSnapshot = await firestore.collection('users').get();
    if (!usersSnapshot.empty) {
      const allUserNotes = [];
      usersSnapshot.forEach(async userDoc => {
        const userId = userDoc.id;
  
        // Fetch notes for the current user
        const userNotesSnapshot = await firestore.collection('users').doc(userId).collection('myNotes').orderBy('timestamp', 'desc').get();
  
        // If user has notes, add them to the array
        if (!userNotesSnapshot.empty) {
          const userNotes = userNotesSnapshot.docs.map(doc => ({
            data: doc.data()
          }));
          allUserNotes.push({  notes: userNotes });
          console.log(allUserNotes);
        }
      });
  
      // Send the array of user notes
      //res.json({ allUserNotes });
      res.json({ userNotes: allUserNotes });
    }else{
      res.json({ message: 'No user notes found' });
    }
    
  } catch (error) {
    console.error('Error fetching user notes from Firestore:', error);
    res.status(500).json({ error: 'Failed to fetch user notes from Firestore' });
  }
});

*/
router.delete('/userNote',verifyToken, async (req, res) => {
  try {
    const { userNoteId } = req.body; 
    await firestore.collection('users').doc(req.user.user_id).collection('myNotes').doc(userNoteId).delete();
    res.json({ message: 'User note deleted successfully!', userNoteId: userNoteId });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error deleting userNote from Firestore:', error);
    res.status(500).json({ error: 'Failed to delete userNote from Firestore' });
  }
});

router.put('/userNote', verifyToken,async (req, res) => {
  try {
    const { userNoteId, updatedNote } = req.body;
    await firestore.collection('users').doc(req.user.user_id).collection('myNotes').doc(userNoteId).set({
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
