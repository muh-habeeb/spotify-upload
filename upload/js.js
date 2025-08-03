 // Upload to Firebase

        // document.getElementById('uploadButton').addEventListener('click', async () => {
        //     const progressDisplay = document.getElementById('progressDisplay');

        //     for (let i = 0; i < songs.length; i++) {
        //         const song = songs[i];

        //         // Upload song file
        //         const songFile = songFiles[song.filePath.split('/')[1]];
        //         const songStoragePath = `songs/${song.songName}.mp3`;
        //         await uploadFile(songFile, songStoragePath, progressDisplay);

        //         // Upload cover image
        //         const coverFile = coverFiles[song.coverPath.split('/')[1]];
        //         const coverStoragePath = `covers/${song.songName}.jpg`;
        //         const coverURL = await uploadFile(coverFile, coverStoragePath, progressDisplay); // Get cover URL

        //         // Update database with song and cover URLs
        //         await updateDatabase(song, songStoragePath, coverURL);
        //     }
        // });






        // Upload file to Firebase Storage with progress tracking

        // async function uploadFile(file, storagePath, progressElement) {
        //     return new Promise((resolve, reject) => {
        //         const fileStorageRef = storageRef(storage, storagePath);
        //         const uploadTask = uploadBytesResumable(fileStorageRef, file);

        //         uploadTask.on('state_changed',
        //             (snapshot) => {
        //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //                 const progressText = `Progress: ${progress.toFixed(2)}%`;
        //                 progressElement.textContent = progressText;
        //                 console.log(progressText);
        //             },
        //             (error) => {
        //                 console.error("Upload error:", error);
        //                 reject(error);
        //             },
        //             async () => {
        //                 const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        //                 console.log('File uploaded successfully:', storagePath);
        //                 resolve(downloadURL);
        //             }
        //         );
        //     });
        // }

