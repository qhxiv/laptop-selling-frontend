"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Search, UserPlus } from "lucide-react"
import { toast } from "sonner"

// Types
type UserRole = "Admin" | "User"

interface User {
  id: number
  name: string
  email: string
  userName: string
  role: UserRole
  profileImage?: string
}

const roleColors: Record<UserRole, string> = {
  Admin: "bg-purple-100 text-purple-800",
  User: "bg-blue-100 text-blue-800",
}

const roleLabels: Record<UserRole, string> = {
  Admin: "Quản trị viên",
  User: "Người dùng",
}

export default function AdminUsersPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all")

  // Temporarily disable permission check
  useEffect(() => {
    if (status === "authenticated") {
      fetchUsers()
    }
  }, [status, session])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Không thể tải danh sách người dùng")
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: number, newRole: UserRole) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      )

      if (!response.ok) throw new Error("Failed to update user role")
      
      toast.success("Cập nhật vai trò người dùng thành công")
      fetchUsers() // Refresh users list
    } catch (error) {
      console.error("Error updating user role:", error)
      toast.error("Không thể cập nhật vai trò người dùng")
    }
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      // Log the token for debugging
      console.log("Access Token:", session?.user?.accessToken)
      console.log("User Role:", session?.user?.role)

      if (!session?.user?.accessToken) {
        throw new Error("No access token found")
      }

      if (session?.user?.role !== "Admin") {
        throw new Error("You don't have permission to delete users")
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Delete user error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        })
        throw new Error(errorData || "Failed to delete user")
      }
      
      toast.success("Xóa người dùng thành công")
      fetchUsers() // Refresh users list
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error(error instanceof Error ? error.message : "Không thể xóa người dùng")
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role === selectedRole

    return matchesSearch && matchesRole
  })

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
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Select
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value as UserRole | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              {Object.entries(roleLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => router.push("/admin/users/new")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>#{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.profileImage && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/user/profile-image/${user.profileImage}`}
                            alt={user.name}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Select
                        value={user.role}
                        onValueChange={(value) =>
                          handleRoleChange(user.id, value as UserRole)
                        }
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(roleLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Xóa
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Xác nhận xóa người dùng
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn có chắc chắn muốn xóa người dùng này? Hành động
                              này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
} 