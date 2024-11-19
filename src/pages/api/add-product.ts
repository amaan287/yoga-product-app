import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, description, price, images } = req.body;

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: Number(price),
          images: {
            create: images.map((image: { url: string; alt: string }) => ({
              url: image.url,
              alt: image.alt,
            })),
          },
        },
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Error adding product" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
