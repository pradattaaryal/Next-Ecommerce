import { Star } from "lucide-react"

import ReviewForm from "@/components/review-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// This would typically come from an API or database
const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "/placeholder.svg",
    rating: 5,
    date: "2 days ago",
    content:
      "These headphones are amazing! The sound quality is exceptional, and the noise cancellation works perfectly. Battery life is impressive too.",
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "/placeholder.svg",
    rating: 4,
    date: "1 week ago",
    content:
      "Great headphones overall. Comfortable for long listening sessions and good sound quality. The only minor issue is that the app could be more user-friendly.",
  },
  {
    id: 3,
    author: "Emily Parker",
    avatar: "/placeholder.svg",
    rating: 5,
    date: "2 weeks ago",
    content: "Absolutely love these! The sound is crystal clear, and they're so comfortable. Worth every penny.",
  },
]

export default function ProductReviews({ productId }: { productId: string }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button>Write a Review</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Summary</CardTitle>
          <CardDescription>Based on {reviews.length} reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">4.7</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <ReviewForm productId={productId} />

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={review.avatar} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{review.author}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.content}</p>
              </div>
            </div>
            <Separator className="my-6" />
          </div>
        ))}
      </div>
    </div>
  )
}

