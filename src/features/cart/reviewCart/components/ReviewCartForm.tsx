"use client"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,  
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { CalendarIcon, User } from "lucide-react"
import { formatPickupDate } from "../../../lib/formatPickupDate"
import { cn } from "@/lib/utils" // Fixed import path
import { submitOrder } from "../../action"
import { useCartContext } from "@/src/features/context/CartContext"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid WhatsApp number is required"),
  notes: z.string().optional(),
  pickupDate: z.date({
    required_error: "Please select a pickup date",
  }),
  pickupTimeSlot: z.string().min(1, "Please select a time slot"),
})

type FormValues = z.infer<typeof formSchema>

interface ReviewCartFormProps {
  onSubmit?: (data: FormValues) => void
  // cartItems: any[];
  onSuccess?: (publicCode: string) => void;
  startTransition:React.TransitionStartFunction;
}

export default function ReviewCartForm({ startTransition,onSuccess }: ReviewCartFormProps) {
  const router = useRouter();

  const {cart,totalPrice,clearCart}=useCartContext()    
  

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      notes: "",
      pickupTimeSlot: "afternoon",
    },
  })

  const  handleFormSubmit =async (data: FormValues) => {
    startTransition(async ()=>{
      const res=await submitOrder(data,cart,totalPrice)
      if (res.success && res.publicCode){
        if (onSuccess) {
          onSuccess(res.publicCode);
        } else {
          // Standard Next.js client-side navigation
          form.reset()
          router.push(`/order/${res.publicCode}`);
          // clear cart after i push
          clearCart()
        }
      }else{
        alert(res.error || "An error occurred while submitting your order.");
      }
    })
    }

  // Disable all dates before today
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
     <div className="lg:col-span-7 space-y-6">
     <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
        <User className="h-5 w-5 text-amber-500" />
        <h2 className="text-base font-bold text-neutral-900">
            Customer Information
        </h2>
        </div>
    <form id="review-cart-form" onSubmit={form.handleSubmit(handleFormSubmit)}>
      <FieldGroup className="space-y-6">
        {/* Full Name / Company Name */}
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>FULL NAME OR COMPANY NAME *</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Engr. John Chukwuemeka / Alaba Electricals"
                />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          />

        {/* Phone Number */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>PHONE NUMBER (WHATSAPP-ENABLED) *</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="e.g. 0803 123 4567 or +234 803 123 4567"
                />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          />

        {/* Pickup / Dispatch Date */}
        <Controller
          name="pickupDate"
          control={form.control}
          render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>PREFERRED PICKUP / DISPATCH DATE *</FieldLabel>
              <Popover>
                <PopoverTrigger>
                  <Button
                    id={field.name}
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatPickupDate(field.value)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={isDateDisabled}
                    autoFocus
                    />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          />

        {/* Time Slot Selection */}
        <Controller
         
         name="pickupTimeSlot"
         control={form.control}
         render={({ field, fieldState }) => (
             <Field data-invalid={fieldState.invalid} className="w-full max-w-2xl space-y-1.5">
              <FieldLabel htmlFor={field.name}>PREFERRED TIME SLOT *</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select timing slot" />
                </SelectTrigger>
                <SelectContent className="border border-gray-200 bg-white shadow-lg rounded-lg p-1">
                  <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                  <SelectItem value="evening">Evening (4:00 PM - 7:00 PM)</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          />

        {/* Order Notes */}
        <Controller
          name="notes"
          control={form.control}
          render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>ORDER NOTES / SPECIAL REQUESTS (OPTIONAL)</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Any particular brand preferences, color specifications, or delivery location..."
                />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          />
      </FieldGroup>
    </form>

    </div>
    </div>

  )
}