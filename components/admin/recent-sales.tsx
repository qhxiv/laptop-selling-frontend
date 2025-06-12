"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentSales = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    amount: "$250.00",
    avatar: "/avatars/01.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    amount: "$450.00",
    avatar: "/avatars/02.png",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    amount: "$350.00",
    avatar: "/avatars/03.png",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    amount: "$550.00",
    avatar: "/avatars/04.png",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    amount: "$150.00",
    avatar: "/avatars/05.png",
  },
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt={sale.name} />
            <AvatarFallback>
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
} 