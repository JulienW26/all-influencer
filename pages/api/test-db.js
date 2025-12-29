export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  const jwt = process.env.JWT_SECRET;
  
  return res.status(200).json({ 
    mongodb_exists: !!uri,
    mongodb_preview: uri ? uri.substring(0, 20) + '...' : 'NICHT DEFINIERT',
    jwt_exists: !!jwt,
    all_env_keys: Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('JWT'))
  });
}
