import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function PredictionCardSkeleton() {
  return (
    <Card className="glass-effect border-white/40 animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-300 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
        <div className="h-8 w-8 bg-gray-300 rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-6 bg-gray-300 rounded w-20" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16" />
            <div className="h-6 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCardSkeleton() {
  return (
    <Card className="glass-effect border-white/40 animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 bg-gray-300 rounded w-24" />
        <div className="h-10 w-10 bg-gray-300 rounded-lg" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-8 bg-gray-300 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-40" />
        </div>
      </CardContent>
    </Card>
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded w-16" />
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="h-4 bg-gray-300 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-20" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-300 rounded w-16" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-16" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-300 rounded w-20" />
      </td>
    </tr>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Skeleton */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass-effect animate-pulse">
        <div className="space-y-4">
          <div className="h-12 bg-gray-300 rounded w-96" />
          <div className="h-6 bg-gray-200 rounded w-full max-w-2xl" />
          <div className="flex gap-4">
            <div className="h-8 bg-gray-300 rounded w-32" />
            <div className="h-8 bg-gray-300 rounded w-32" />
          </div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* Predictions Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <PredictionCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function PredictionsPageSkeleton() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Skeleton */}
      <div className="relative mb-8 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-300 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-12 bg-gray-300 rounded w-64" />
              <div className="h-6 bg-gray-200 rounded w-48" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* Table Skeleton */}
      <Card className="glass-effect">
        <CardHeader>
          <div className="h-6 bg-gray-300 rounded w-48 animate-pulse" />
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <TableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
