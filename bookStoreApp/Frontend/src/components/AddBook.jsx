"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

function AddBook() {
  const { theme } = useTheme()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post("http://localhost:2345/books/add", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.data) {
        toast.success("Book added successfully!")
        reset()
      }
    } catch (error) {
      console.error("Error adding book:", error)
      toast.error("Failed to add book. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`${theme === "light" ? "bg-white text-gray-800" : "bg-slate-900 text-white"} min-h-screen flex items-center justify-center`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className={`${theme === "light" ? "bg-white" : "bg-slate-800"} rounded-2xl shadow-2xl p-8`}>
          <h2 className="text-3xl font-bold text-center mb-6">Add New Book</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
                className={`${theme === "light" ? "bg-white" : "bg-slate-800"} w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
              />
              {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-medium">
                Author
              </label>
              <input
                type="text"
                id="author"
                {...register("author", { required: "Author is required" })}
                className={`${theme === "light" ? "bg-white" : "bg-slate-800"} w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
              />
              {errors.author && <span className="text-red-500 text-sm">{errors.author.message}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                className={`${theme === "light" ? "bg-white" : "bg-slate-800"} w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                rows="4"
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                type="number"
                id="price"
                {...register("price", { required: "Price is required", min: 0 })}
                className={`${theme === "light" ? "bg-white" : "bg-slate-800"} w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                step="0.01"
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="imageUrl" className="block text-sm font-medium">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                {...register("imageUrl", { required: "Image URL is required" })}
                className={`${theme === "light" ? "bg-white" : "bg-slate-800"} w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
              />
              {errors.imageUrl && <span className="text-red-500 text-sm">{errors.imageUrl.message}</span>}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md px-4 py-3 font-semibold hover:from-purple-700 hover:to-blue-600 transition duration-300 transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              {isLoading ? "Adding Book..." : "Add Book"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AddBook

