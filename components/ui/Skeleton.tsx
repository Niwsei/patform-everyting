'use client'

import { cn } from "@/lib/utils"

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800", className)}
      {...props}
    />
  )
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm p-4 space-y-4">
      <Skeleton className="h-48 w-full rounded-2xl" />
      <div className="space-y-2 px-2">
         <Skeleton className="h-6 w-3/4" />
         <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex gap-2 px-2">
         <Skeleton className="h-8 w-20" />
         <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

export function AnalyticsSkeleton() {
   return (
      <div className="space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-3xl" />)}
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-80 w-full rounded-[2.5rem]" />
            <Skeleton className="h-80 w-full rounded-[2.5rem]" />
         </div>
      </div>
   )
}
