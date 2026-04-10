const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "qltl-project.firebasestorage.app"
    });
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

// ===============================

// 🔥 UPLOAD
const uploadDocument = async (req, res) => {
    try {
        const file = req.file;
        const { title, category } = req.body;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const blob = bucket.file("documents/" + Date.now() + "_" + file.originalname);

        const blobStream = blob.createWriteStream({
            resumable: false
        });

        blobStream.on("finish", async () => {
            await blob.makePublic();

            const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            await db.collection("documents").add({
                title,
                category,
                fileUrl,
                createdAt: new Date()
            });

            res.json({
                message: "Upload thành công 🔥",
                fileUrl
            });
        });

        blobStream.on("error", (err) => {
            res.status(500).json({ error: err.message });
        });

        blobStream.end(file.buffer);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ===============================

// 🔥 GET ALL
const getDocuments = async (req, res) => {
    try {
        const snapshot = await db.collection("documents").get();

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ===============================

// 🔍 SEARCH + FILTER
const searchDocuments = async (req, res) => {
    try {
        const { keyword, category } = req.query;

        const snapshot = await db.collection("documents").get();

        let data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (keyword) {
            data = data.filter(item =>
                item.title?.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        if (category) {
            data = data.filter(item =>
                item.category?.toLowerCase() === category.toLowerCase()
            );
        }

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  DELETE
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection("documents").doc(id).delete();

        res.json({
            message: "Xoá thành công 🔥"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    searchDocuments,
    deleteDocument
};