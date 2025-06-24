"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, QrCode } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import Image from "next/image"

// Types
type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled"
type PaymentMethod = "cash" | "credit"

interface OrderProduct {
  id: number
  quantity: number
  price: number
  product: {
    id: number
    name: string
    price: number
  }
}

interface Order {
  id: number
  status: OrderStatus
  totalPrice: number
  paymentmethod: PaymentMethod
  shippingAddress: {
    fullName: string
    phone: string
    address: string
    email: string
  }
  orderProduct: OrderProduct[]
  user: {
    id: number
    name: string
    email: string
  }
  updatedAt: string
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels: Record<OrderStatus, string> = {
  pending: "Đang xử lý",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao hàng",
  delivered: "Đã giao hàng",
  cancelled: "Đã hủy",
}

const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: "Tiền mặt",
  credit: "Chuyển khoản",
}

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [showQrCode, setShowQrCode] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrderDetails()
    }
  }, [status, session, params.id])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      )
      if (!response.ok) throw new Error("Failed to fetch order details")
      const data = await response.json()
      setOrder(data)
    } catch (error) {
      console.error("Error fetching order details:", error)
      toast.error("Không thể tải thông tin đơn hàng")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/update/${order.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      )

      if (!response.ok) throw new Error("Failed to update order status")
      
      toast.success("Cập nhật trạng thái đơn hàng thành công")
      fetchOrderDetails() // Refresh order details
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error("Không thể cập nhật trạng thái đơn hàng")
    }
  }

  const handleGetQrCode = async () => {
    if (!order) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/qrcode/${order.id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      )
      if (!response.ok) throw new Error("Failed to get QR code")
      const data = await response.json()
      setQrCodeUrl(data)
      setShowQrCode(true)
    } catch (error) {
      console.error("Error getting QR code:", error)
      toast.error("Không thể tải mã QR thanh toán")
    }
  }

  if (status === "loading" || loading) {
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

  if (!order) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy đơn hàng</h1>
          <Button onClick={() => router.push("/admin/orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.push("/admin/orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <div className="flex items-center gap-4">
          <Select
            value={order.status}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {order.paymentmethod === "credit" && (
            <Button onClick={handleGetQrCode}>
              <QrCode className="mr-2 h-4 w-4" />
              Xem mã QR
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin đơn hàng</CardTitle>
            <CardDescription>
              Mã đơn hàng: #{order.id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Trạng thái</div>
                <Badge className={statusColors[order.status]}>
                  {statusLabels[order.status]}
                </Badge>
              </div>
              <div>
                <div className="font-medium">Phương thức thanh toán</div>
                <div>{paymentMethodLabels[order.paymentmethod]}</div>
              </div>
              <div>
                <div className="font-medium">Tổng tiền</div>
                <div className="text-lg font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.totalPrice)}
                </div>
              </div>
              <div>
                <div className="font-medium">Ngày cập nhật</div>
                <div>
                  {format(new Date(order.updatedAt), "dd/MM/yyyy HH:mm", {
                    locale: vi,
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Tên khách hàng</div>
                <div>{order.user.name}</div>
              </div>
              <div>
                <div className="font-medium">Email</div>
                <div>{order.user.email}</div>
              </div>
              <div>
                <div className="font-medium">Địa chỉ giao hàng</div>
                <div className="space-y-1">
                  <div>{order.shippingAddress.fullName}</div>
                  <div>{order.shippingAddress.phone}</div>
                  <div>{order.shippingAddress.address}</div>
                  <div>{order.shippingAddress.email}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chi tiết sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.orderProduct.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-medium">{item.product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Số lượng: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price * item.quantity)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}{" "}
                      / sản phẩm
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {showQrCode && qrCodeUrl && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Mã QR thanh toán</CardTitle>
              <CardDescription>
                Quét mã QR để thanh toán đơn hàng
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative w-64 h-64">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 