import dbConnect from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();
    return res.status(200).json({ success: true, message: 'MongoDB verbunden!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
