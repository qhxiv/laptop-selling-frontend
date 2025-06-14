"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Edit, Trash2, Image as ImageIcon, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { z } from "zod"

// Form validation schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Price must be greater than 0"),
  description: z.string().min(1, "Description is required").max(1000, "Description is too long"),
  countInStock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Stock must be 0 or greater"),
  addedProperty: z.record(z.any()).optional()
})

type ProductFormData = z.infer<typeof productSchema>

interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrl: string
  addedProperty: Record<string, any>
  sold: number
  countInStock: number
  createdAt: string
  updatedAt: string
}

interface PaginatedResponse {
  items: Product[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
  links: {
    first: string
    previous: string
    next: string
    last: string
  }
}

export default function AdminProductsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    countInStock: "",
    addedProperty: {}
  })
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Temporarily disable permission check
  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts()
    }
  }, [currentPage, searchTerm, minPrice, maxPrice, status, session])

  const validateForm = (data: ProductFormData) => {
    try {
      productSchema.parse(data)
      setFormErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof ProductFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof ProductFormData] = err.message
          }
        })
        setFormErrors(errors)
      }
      return false
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      let url = `http://localhost:3000/product?page=${currentPage}&limit=10`
      if (searchTerm) url += `&productName=${searchTerm}`
      if (minPrice) url += `&minPrice=${minPrice}`
      if (maxPrice) url += `&maxPrice=${maxPrice}`
      
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${session?.user?.accessToken}`
        }
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch products")
      }
      
      const data: PaginatedResponse = await response.json()
      setProducts(data.items)
      setTotalPages(data.meta.totalPages)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error(error instanceof Error ? error.message : "Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async () => {
    if (!validateForm(formData)) return
    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:3000/product/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          countInStock: Number(formData.countInStock),
          sold: 0
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create product")
      }
      
      toast.success("Product created successfully")
      setIsCreateDialogOpen(false)
      setFormData({ name: "", price: "", description: "", countInStock: "", addedProperty: {} })
      setImagePreview(null)
      fetchProducts()
    } catch (error) {
      console.error("Error creating product:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateProduct = async () => {
    if (!selectedProduct || !validateForm(formData)) return
    setIsSubmitting(true)

    try {
      const response = await fetch(`http://localhost:3000/product/update/${selectedProduct.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          countInStock: Number(formData.countInStock)
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update product")
      }
      
      toast.success("Product updated successfully")
      setIsEditDialogOpen(false)
      setSelectedProduct(null)
      setImagePreview(null)
      fetchProducts()
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`http://localhost:3000/product/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${session?.user?.accessToken}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to delete product")
      }
      
      toast.success("Product deleted successfully")
      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error(error instanceof Error ? error.message : "Failed to delete product")
    }
  }

  const handleImageUpload = async (id: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch(`http://localhost:3000/product/uploadImage/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to upload image")
      }
      
      toast.success("Image uploaded successfully")
      fetchProducts()
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file")
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Temporarily allow all authenticated users
  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={formErrors.price ? "border-red-500" : ""}
                />
                {formErrors.price && (
                  <p className="text-sm text-red-500">{formErrors.price}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={formErrors.description ? "border-red-500" : ""}
                />
                {formErrors.description && (
                  <p className="text-sm text-red-500">{formErrors.description}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="countInStock">Stock</Label>
                <Input
                  id="countInStock"
                  type="number"
                  value={formData.countInStock}
                  onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                  className={formErrors.countInStock ? "border-red-500" : ""}
                />
                {formErrors.countInStock && (
                  <p className="text-sm text-red-500">{formErrors.countInStock}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Product Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <Button 
                onClick={handleCreateProduct}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-32"
          />
          <Input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-32"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.imageUrl ? (
                        <img
                          src={`http://localhost:3000/product/findProductImage/${product.id}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toLocaleString()}</TableCell>
                    <TableCell>{product.countInStock}</TableCell>
                    <TableCell>{product.sold}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedProduct(product)
                            setFormData({
                              name: product.name,
                              price: product.price.toString(),
                              description: product.description,
                              countInStock: product.countInStock.toString(),
                              addedProperty: product.addedProperty
                            })
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id={`image-upload-${product.id}`}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(product.id, file)
                          }}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => document.getElementById(`image-upload-${product.id}`)?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ImageIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="py-2 px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={formErrors.price ? "border-red-500" : ""}
              />
              {formErrors.price && (
                <p className="text-sm text-red-500">{formErrors.price}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={formErrors.description ? "border-red-500" : ""}
              />
              {formErrors.description && (
                <p className="text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-countInStock">Stock</Label>
              <Input
                id="edit-countInStock"
                type="number"
                value={formData.countInStock}
                onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                className={formErrors.countInStock ? "border-red-500" : ""}
              />
              {formErrors.countInStock && (
                <p className="text-sm text-red-500">{formErrors.countInStock}</p>
              )}
            </div>
            <Button 
              onClick={handleUpdateProduct}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 