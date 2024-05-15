const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: 'favs-669fd',
  keyFilename: './config/favsKey.json',
});
const verifyToken = require('../verifyToken.js'); // Import the middleware function
const admin = require('firebase-admin');

router.get("/", (req,res)=>{
  res.send("users list")
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create multer middleware instance with the configured storage
const upload = multer({ storage: storage });

//sigUp page in the react fetch data to this function to save authhenticated users to save in firestore
router.post('/createUser',verifyToken, async (req, res) => {
  try {
    const { userData } = req.body;
    const userId = req.user.uid; // Get the user's UID from the verified token

    await firestore.collection("users").doc(userId).set({
      userEmail: userData.email,
      username: userData.username,
      timestamp: admin.firestore.Timestamp.now()
    })
    res.json({ message: 'User data received and stored successfully!', userData: userData });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error storing userData in Firestore:', error);
    res.status(500).json({ error: 'Failed to store userData in Firestore' });
  }
});

//save usernote(books) to firestore
router.post('/userNote',verifyToken, async (req, res) => {
  try {
    const { userNote } = req.body;
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
//save usermovie to firestore collection
router.post('/userMovie',verifyToken, async (req, res) => {
  try {
    const { userNote } = req.body;
    console.log('Received note:', userNote);
    await firestore.collection('users').doc(req.user.user_id).collection('myMovies').add({
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

//fetchusernotes function in the user.jsx fetch data to here to get notes saved in books collection
router.get('/userNote',verifyToken, async (req, res) => {
  try {
    const snapshot = await firestore.collection('users').doc(req.user.user_id).collection('myNotes').get();
    if (!snapshot.empty) {
      // Map the snapshot to an array of user notes
      const myNotes = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      res.json({ myNotes });
    } else {
      res.json({ message: 'No user notes found' });
    }
  } catch (error) {
    console.error('Error fetching user notes from Firestore:', error);
    res.status(500).json({ error: 'Failed to fetch user notes from Firestore' });
  }
});

//get usermovies from the movie collection
router.get('/userMovie',verifyToken, async (req, res) => {
  try {
    const snapshot = await firestore.collection('users').doc(req.user.user_id).collection('myMovies').get();
    if (!snapshot.empty) {
      const myMovies = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      res.json({ myMovies });
    } else {
      res.json({ message: 'No user notes found' });
    }
  } catch (error) {
    console.error('Error fetching user notes from Firestore:', error);
    res.status(500).json({ error: 'Failed to fetch user notes from Firestore' });
  }
});
//discover pages fetch data here, to view all usernotes from all users, verifytoken is needed
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
        allUserNotes.push(userNotesWithUser);
        });
      });
      // Wait for all promises to resolve
      await Promise.all(userNotesPromises);
    }
    res.json({ userNotes: allUserNotes }); // Return userNotes
  } catch (error) {
    console.error('Error fetching user notes from Firestore:', error);
    res.status(500).json({ error: 'Failed to fetch user notes from Firestore' });
  }
});
//delete from books collection
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

//delete from movies collection
router.delete('/userMovie', verifyToken, async (req, res) => {
  try {
    const { userNoteId } = req.body; // Assuming you're using a different ID for movies
    await firestore.collection('users').doc(req.user.user_id).collection('myMovies').doc(userNoteId).delete();
    res.json({ message: 'User movie deleted successfully!', userNoteId: userNoteId});
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error deleting userMovie from Firestore:', error);
    res.status(500).json({ error: 'Failed to delete userMovie from Firestore' });
  }
});
//update books collection
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
//update movies collection
router.put('/userMovie', verifyToken,async (req, res) => {
  try {
    const { userNoteId, updatedNote } = req.body;
    await firestore.collection('users').doc(req.user.user_id).collection('myMovies').doc(userNoteId).set({
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

//uploads profile picture to firestore but has some errors, need verifytoken 
router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  try {
    console.log("File uploaded successfully");
    const filePath = req.file.path;
    await firestore.collection('users').add({ profilePicture: filePath });
    //await firestore.collection('users').doc(req.user.uid).update({ profilePicture: filePath });
    res.status(200).json({ imagePath: filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

module.exports = router
