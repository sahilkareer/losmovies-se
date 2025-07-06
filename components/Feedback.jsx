/**
 * v0 by Vercel.
 * see https://v0.dev/t/glbsOkzmNIG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


const Feedback = ({setId}) => {
  const [rating, setRating] = useState(3)
  const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [feedback, setFeedback] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)



  const submitForm = async () => {


       if (!email || email.length < 3 || !email.includes('@')) {
        console.error('Invalid email address');
        alert('Please enter a valid email address');
        return;
    }

    if (!feedback || feedback.trim().length < 3) {
        console.error('Feedback is too short');
        alert('Please provide feedback with at least 3 characters');
        return;
    }


    const data = { name, email, feedback, rating };

    const formKey = '7Q77nX0rnUWF5agHXzy1w4Beiu3R5BdT';

    setLoading(true);
    // console.log("FETCHING...");
    await fetch(`https://send.pageclip.co/${formKey}`, {
      method: 'POST',
    //   mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccess(true);
        setTimeout(() => {
          setId(false)
        }, 2000);
    })
    .catch((error) => {
        console.log("Achof aaa lhaj rah kayen error")
        console.error(error);
        setSuccess(true);
        setTimeout(() => {
          setId(false)
        }, 2000);
      }).finally(() => {
        setLoading(false);
      })

    //   console.log('Fetched, Normalment')


  }


  return (
    <Card className="w-md max-w-[90vw] border-none shadow-sm shadow-c-primary fixed bg-[#1E1E1E] text-white z-[60]">
      {success ? (
        <CardHeader>
          <CardTitle>Thank you!</CardTitle>
          <CardDescription>Your feedback has been submitted.</CardDescription>
        </CardHeader>
      ) : (
        <>
      <CardHeader>
        <CardTitle>Give us your feedback</CardTitle>
        <CardDescription>We&apos;d love to hear from you! Feel free to share a suggestion, give us your opinion, or report any issues or bugs.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input id="name" placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#2A2A2A] text-white ring-offset-0 border-c-primary focus-visible:border-2 outline-none ring-0" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="email" className="text-white">
              Email*
            </Label>
            <Input id="email" type="email" placeholder="Enter your email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#2A2A2A] text-white ring-offset-0 border-c-primary focus-visible:border-2 outline-none ring-0" />
          </div>
        </div>
          <div className="flex flex-col items-start gap-2">
          <Label htmlFor="feedback" className="text-white">
            Feedback*
          </Label>
          <Textarea
            id="feedback"
            placeholder="Share your thoughts..."
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px] bg-[#2A2A2A] text-white border-c-primary focus-visible:border-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">Rate your experience:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-6 h-6 cursor-pointer ${star <= rating ? "fill-[#FFD700] stroke-[#FFD700]" : "fill-[#A9A9A9] stroke-[#A9A9A9]"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button className="bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]" disabled={loading} onClick={submitForm}>{loading ? "Submiting..." : "Submit Feedback"}</Button>
      </CardFooter>
      </>
      )}
    </Card>
  )
}

export default Feedback

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}