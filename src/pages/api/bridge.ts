import type { NextApiRequest, NextApiResponse } from 'next';
import app from '../../../backend/src/app';

// This is a bridge for Next.js Pages Router
// It allows us to use our existing Express app as a single API route
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // We can just call the Express app as a function
    // Node.js http handles the rest
    return app(req, res);
}
