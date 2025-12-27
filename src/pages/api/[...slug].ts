import type { NextApiRequest, NextApiResponse } from 'next';
import app from '../../../backend/src/app';

// Helper to run middleware-like Express apps in Next.js
// This basically wraps the Express 'app' so it can handle the Next.js req/res
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

export const config = {
    api: {
        bodyParser: false, // Disabling body parser so Express can handle it (multipart, streams, etc.)
        externalResolver: true, // Tells Next.js that this route is handled by an external resolver (Express)
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // We need to ensure the DB is connected. 
    // Ideally backend/src/app.ts handles this, but let's be safe logging here.
    // console.log(`[NextAPI] ${req.method} ${req.url}`);

    // Forward the request to the Express app
    await runMiddleware(req, res, app);
}
