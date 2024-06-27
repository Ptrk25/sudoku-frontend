// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<JSON>
) => {
    const res1 = await fetch("http://" + process.env.BACKEND_SERVER + "/api/sudoku")
    const response: JSON = await res1.json();

    res.status(200).send(response)
}
