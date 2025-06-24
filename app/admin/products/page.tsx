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
import { MoreHorizontal, Plus, Search, Edit, Trash2, Loader2 } from "lucide-react"
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
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Sold</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{(product.price * 2000).toLocaleString()} VND</TableCell>
                  <TableCell>{product.countInStock}</TableCell>
                  <TableCell>{product.sold}</TableCell>
                  <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProduct(product)
                            setFormData({
                              name: product.name,
                              price: product.price.toString(),
                              description: product.description,
                              countInStock: product.countInStock.toString(),
                              addedProperty: product.addedProperty || {}
                            })
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="py-2 px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (VND)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className={formErrors.price ? "border-red-500" : ""}
              />
              {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="countInStock">Stock</Label>
              <Input
                id="countInStock"
                type="number"
                value={formData.countInStock}
                onChange={(e) => setFormData(prev => ({ ...prev, countInStock: e.target.value }))}
                className={formErrors.countInStock ? "border-red-500" : ""}
              />
              {formErrors.countInStock && <p className="text-sm text-red-500">{formErrors.countInStock}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={formErrors.description ? "border-red-500" : ""}
              />
              {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProduct} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price (VND)</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className={formErrors.price ? "border-red-500" : ""}
              />
              {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-countInStock">Stock</Label>
              <Input
                id="edit-countInStock"
                type="number"
                value={formData.countInStock}
                onChange={(e) => setFormData(prev => ({ ...prev, countInStock: e.target.value }))}
                className={formErrors.countInStock ? "border-red-500" : ""}
              />
              {formErrors.countInStock && <p className="text-sm text-red-500">{formErrors.countInStock}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={formErrors.description ? "border-red-500" : ""}
              />
              {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Update Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 