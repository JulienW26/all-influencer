export default function handler(req, res) {
  return res.status(200).json({ 
    message: 'Hello World!',
    time: new Date().toISOString()
  });
}
