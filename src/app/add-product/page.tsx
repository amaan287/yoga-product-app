"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [] as { url: string; alt: string }[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      setError("");
      if (!e.target.files) throw new Error("No files selected");

      const file = e.target.files[0];
      if (!file) throw new Error("Please select an image");

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "yoga-products");
      data.append("cloud_name", "du4q4ysi8");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/du4q4ysi8/image/upload",
        { method: "POST", body: data },
      );

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const json = await res.json();
      if (json.secure_url) {
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            { url: json.secure_url, alt: formData.name || "Product image" },
          ],
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      if (
        !formData.name ||
        !formData.description ||
        !formData.price ||
        formData.images.length === 0
      ) {
        throw new Error("Please fill all fields and upload at least one image");
      }

      const response = await fetch("/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          images: formData.images,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        price: "",
        images: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-2">
      <h1 className="mx-4 mb-3 text-lg font-bold">Add product</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Product name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input input-bordered mb-3 w-full overflow-hidden"
          type="text"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="textarea textarea-bordered mb-2 w-full overflow-hidden"
          placeholder="Description"
        ></textarea>
        <input
          required
          placeholder="Product price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="input input-bordered mb-3 w-full overflow-hidden"
          type="number"
        />
        <div className="mb-3">
          <input
            required
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isLoading}
            className="file-input file-input-bordered w-full"
            type="file"
          />
          {formData.images.length > 0 && (
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    className="h-24 w-full rounded object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? <>Processing...</> : "Add Product"}
        </button>
      </form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {success && (
        <p className="mt-2 text-green-500">Product added successfully!</p>
      )}
    </div>
  );
}
