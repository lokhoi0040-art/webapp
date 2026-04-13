const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "qltl-project.appspot.com"
    });
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

// ===============================
// UPLOAD
const uploadDocument = async (req, res) => {
    try {
        const file = req.file;
        const { title, category, tags } = req.body;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        if (!title || !category) {
            return res.status(400).json({
                success: false,
                message: "Missing title or category"
            });
        }

        const tagArray = tags
            ? tags.split(",").map(t => t.trim().toLowerCase())
            : [];

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
                tags: tagArray,
                fileUrl,
                filePath: blob.name,
                createdAt: new Date()
            });

            res.json({
                success: true,
                message: "Upload success",
                fileUrl
            });
        });

        blobStream.on("error", (err) => {
            res.status(500).json({
                success: false,
                message: err.message
            });
        });

        blobStream.end(file.buffer);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// ===============================
// GET ALL + PAGINATION
const getDocuments = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const lastId = req.query.lastId;

        let query = db
            .collection("documents")
            .orderBy("createdAt", "desc")
            .limit(limit);

        if (lastId) {
            const lastDoc = await db.collection("documents").doc(lastId).get();
            if (lastDoc.exists) {
                query = query.startAfter(lastDoc);
            }
        }

        const snapshot = await query.get();

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json({
            success: true,
            data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// ===============================
// SEARCH + FILTER + TAG
const searchDocuments = async (req, res) => {
    try {
        const { keyword, category } = req.query;

        let query = db.collection("documents");

        if (category) {
            query = query.where("category", "==", category);
        }

        const snapshot = await query.get();

        let data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (keyword) {
            const key = keyword.toLowerCase();

            data = data.filter(item =>
                item.title?.toLowerCase().includes(key) ||
                item.tags?.some(tag => tag.includes(key))
            );
        }

        res.json({
            success: true,
            data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// ===============================
// UPDATE
const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, tags } = req.body;

        const tagArray = tags
            ? tags.split(",").map(t => t.trim().toLowerCase())
            : [];

        await db.collection("documents").doc(id).update({
            title,
            category,
            tags: tagArray
        });

        res.json({
            success: true,
            message: "Updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// ===============================
// DELETE
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const docRef = db.collection("documents").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }

        const data = doc.data();

        if (data.filePath) {
            await bucket.file(data.filePath).delete();
        }

        await docRef.delete();

        res.json({
            success: true,
            message: "Deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    searchDocuments,
    updateDocument,
    deleteDocument
};