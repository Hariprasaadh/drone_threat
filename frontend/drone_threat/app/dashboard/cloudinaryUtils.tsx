import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'dronetracking';
const COLLECTION_NAME = 'drone_threat';

export const uploadFeedToCloudinary = async (file: File): Promise<{ 
  publicId: string, 
  secureUrl: string 
}> => {
  try {
    // Generate a unique filename
    const uuid = uuidv4();
    const fileName = `${uuid}.mp4`;

    // Convert File to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          resource_type: 'video', 
          public_id: uuid,
          folder: 'drone-feeds'
        }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return {
      publicId: uploadResult.public_id,
      secureUrl: uploadResult.secure_url
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export const saveFeedToDatabase = async (feedData: {
  publicId: string,
  secureUrl: string,
  name: string,
  userId: string
}) => {
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI is not defined');
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const database = client.db(DB_NAME);
    const collection = database.collection(COLLECTION_NAME);

    const result = await collection.insertOne({
      ...feedData,
      createdAt: new Date()
    });

    return result;
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  } finally {
    await client.close();
  }
};