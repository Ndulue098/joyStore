"use client"

import { useState, useEffect, useMemo } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Trash2, Upload, X, Package } from "lucide-react"
import Image from "next/image"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import Button from "./Button"
import { createProduct, updateProduct } from "../action"
import { CategoryType, ProductType } from "@/src/features/type"
import { ProductsType, Subcategories } from "@/src/types/types"

// Validation schema factory function
const buildFormSchema = (isEditing: boolean) =>
  z.object({
    name: z.string().min(2, "Product name is required"),
    brand: z.string().min(1, "Brand is required"),
    sku: z.string().optional(),
    category_id: z.string().min(1, "Category is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    discount: z.coerce.number().min(0).max(100, "Discount must be 0-100%").default(0),
    stockQuantity: z.coerce.number().min(0, "Quantity must be 0 or more"),
    stockStatus: z.enum(["In Stock", "Out of Stock", "Pre-Order"]),
    unit: z.string().default("pcs"),
    short_description: z.string().optional(),
    description: z.string().optional(),
    is_active: z.boolean().default(true),
    is_best_seller: z.boolean().default(false),
    is_new: z.boolean().default(false),
    image: isEditing
      ? z
          .custom<File | undefined>()
          .refine(
            (file) => !file || file.size <= 5 * 1024 * 1024,
            "Max image size is 5MB"
          )
          .refine(
            (file) =>
              !file ||
              ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only .jpg, .png, and .webp formats are supported"
          )
          .optional()
      : z
          .custom<File>((val) => val instanceof File, "An image file is required")
          .refine((file) => file && file.size <= 5 * 1024 * 1024, "Max image size is 5MB")
          .refine(
            (file) =>
              file && ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only .jpg, .png, and .webp formats are supported"
          ),
    specifications: z.array(
      z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string().min(1, "Value is required"),
      })
    ),
  })

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>

interface ProductFormProps {
  children?: React.ReactNode
  id?: number
  name?: string
  product?: ProductsType
  categoryList?: Subcategories[]
}

export default function ProductForm({
  children,
  id,
  name,
  product,
  categoryList,
}: ProductFormProps) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const isEditing = Boolean(product?.id)
  const defaultCategoryId = String(product?.category_id ?? id ?? "")

  const schema = useMemo(() => buildFormSchema(isEditing), [isEditing])

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    name: "",
    brand: "",
    sku: "",
    category_id: defaultCategoryId,
    price: 5000,
    discount: 0,
    stockQuantity: 20,
    stockStatus: "In Stock",
    unit: "pcs",
    short_description: "",
    description: "",
    is_active: true,
    is_best_seller: false,
    is_new: false,
    specifications: [
      { key: "Wattage", value: "15W" },
      { key: "Voltage", value: "220–240V AC" },
    ],
  },
})

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specifications",
  })

  // Watch chosen category_id to display the selected category name in header badge
  const selectedCategoryId = form.watch("category_id")
  const currentCategoryName = useMemo(() => {
    const found = categoryList?.find((cat) => String(cat.id) === selectedCategoryId)
    return found?.name || name || "Unassigned"
  }, [selectedCategoryId, categoryList, name])

  useEffect(() => {
    if (open) {
      if (product) {
        let parsedSpecs: { key: string; value: string }[] = []
        if (product.specifications) {
          try {
            const rawSpecs =
              typeof product.specifications === "string"
                ? JSON.parse(product.specifications)
                : product.specifications
            parsedSpecs = Object.entries(rawSpecs).map(([k, v]) => ({
              key: k,
              value: String(v),
            }))
          } catch (e) {
            console.error("Failed to parse specifications", e)
          }
        }

        form.reset({
          name: product.name || "",
          brand: product.brand || "",
          sku: product.sku || "",
          category_id: String(product.category_id || id || ""),
          price: product.price ?? 0,
          discount: product.discount ?? 0,
          // stockQuantity: product.stock_quantity ?? product.stockQuantity ?? 0,
          stockQuantity: product.stock_quantity ?? product.stock_quantity ?? 0,
          // stockStatus: (product.stock_status || product.stockStatus || "In Stock") as
          stockStatus: (product.stock_status || product.stock_status || "In Stock") as
            | "In Stock"
            | "Out of Stock"
            | "Pre-Order",
          unit: product.unit || "pcs",
          short_description: product.short_description || "",
          description: product.description || "",
          is_active: product.is_active ?? true,
          is_best_seller: product.is_best_seller ?? false,
          is_new: product.is_new ?? false,
          specifications: parsedSpecs,
        })

        setPreview(product.imageUrl || null)
      } else {
        handleReset()
      }
    }
  }, [open, product, id])

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  async function onSubmit(data: FormValues) {
    const specsObject = data.specifications.reduce((acc, curr) => {
      if (curr.key.trim()) acc[curr.key.trim()] = curr.value.trim()
      return acc
    }, {} as Record<string, string>)

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("brand", data.brand)
    if (data.sku) formData.append("sku", data.sku)
    formData.append("category_id", data.category_id)
    formData.append("price", String(data.price))
    formData.append("discount", String(data.discount))
    formData.append("stock_quantity", String(data.stockQuantity))
    formData.append("stock_status", data.stockStatus)
    formData.append("unit", data.unit)
    if (data.short_description) formData.append("short_description", data.short_description)
    if (data.description) formData.append("description", data.description)
    formData.append("is_active", String(data.is_active))
    formData.append("is_best_seller", String(data.is_best_seller))
    formData.append("is_new", String(data.is_new))
    formData.append("specifications", JSON.stringify(specsObject))

    if (data.image) {
      formData.append("image", data.image)
    }

    let res

    if (isEditing && product?.id) {
      formData.append("id", String(product.id))
      res = await updateProduct(formData)
    } else {
      res = await createProduct(formData)
    }

    if (res?.success) {
      handleReset()
      setOpen(false)
    } else {
      alert(res?.error || `Failed to ${isEditing ? "update" : "save"} product`)
    }
  }

  function handleReset() {
    form.reset({
      name: "",
      brand: "",
      sku: "",
      category_id: defaultCategoryId,
      price: 5000,
      discount: 0,
      stockQuantity: 20,
      stockStatus: "In Stock",
      unit: "pcs",
      short_description: "",
      description: "",
      is_active: true,
      is_best_seller: false,
      is_new: false,
      specifications: [
        { key: "Wattage", value: "15W" },
        { key: "Voltage", value: "220–240V AC" },
      ],
    })
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val)
        if (!val) handleReset()
      }}
    >
      <DialogTrigger >{children}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-md">
        <DialogHeader className="space-y-1 mt-2">
          <DialogTitle className="text-lg justify-between font-bold text-neutral-900 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-500" />
              {isEditing ? "Edit Product" : "Add New Product"}
            </div>

            <div className="text-sm font-normal text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200">
              Category: <span className="font-semibold text-neutral-900">{currentCategoryName}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <FieldGroup className="space-y-4">
            {/* Product Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                    Product Name *
                  </FieldLabel>
                  <Input {...field} placeholder="e.g. Philips LED Bulb 12W E27" className="h-10 text-sm" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Brand & SKU Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Controller
                name="brand"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                      Brand *
                    </FieldLabel>
                    <Input {...field} placeholder="e.g. Philips" className="h-10 text-sm" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="sku"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                      SKU (Optional)
                    </FieldLabel>
                    <Input {...field} placeholder="e.g. PH-LED-12W" className="h-10 text-sm font-mono" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Price, Discount, Unit Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                      Price (₦) *
                    </FieldLabel>
                    <Input {...field} type="number" placeholder="5000" className="h-10 text-sm font-mono" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="discount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                      Discount (%)
                    </FieldLabel>
                    <Input {...field} type="number" placeholder="0" className="h-10 text-sm font-mono" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="unit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                      Unit
                    </FieldLabel>
                    <Input {...field} placeholder="pcs / box / kg" className="h-10 text-sm" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Quantity, Stock Status, Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <Controller
                name="stockQuantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                      Stock Quantity *
                    </FieldLabel>
                    <Input {...field} type="number" placeholder="20" className="h-10 text-sm font-mono" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="stockStatus"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                      Stock Status
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 text-sm">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        <SelectItem value="Pre-Order">Pre-Order</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Category Selector disabled during Creation, enabled during Editing */}
              <Controller
                name="category_id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-bold text-neutral-700 uppercase tracking-wide"
                    >
                      Category
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!isEditing}
                    >
                      <SelectTrigger id={field.name} className="h-10 text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryList?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Short Description */}
            <Controller
              name="short_description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                    Short Description
                  </FieldLabel>
                  <Input {...field} placeholder="Brief product overview..." className="h-10 text-sm" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Full Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                    Full Description
                  </FieldLabel>
                  <Textarea {...field} rows={3} placeholder="Comprehensive description..." className="text-sm resize-none" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Toggles / Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 border-t border-neutral-100">
              <Controller
                name="is_active"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_active" checked={field.value} onCheckedChange={field.onChange} />
                    <label htmlFor="is_active" className="text-xs font-medium cursor-pointer">
                      Active Product
                    </label>
                  </div>
                )}
              />

              <Controller
                name="is_best_seller"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_best_seller" checked={field.value} onCheckedChange={field.onChange} />
                    <label htmlFor="is_best_seller" className="text-xs font-medium cursor-pointer">
                      Best Seller
                    </label>
                  </div>
                )}
              />

              <Controller
                name="is_new"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_new" checked={field.value} onCheckedChange={field.onChange} />
                    <label htmlFor="is_new" className="text-xs font-medium cursor-pointer">
                      Mark as New
                    </label>
                  </div>
                )}
              />
            </div>

            {/* Product Image Upload */}
            <Controller
              name="image"
              control={form.control}
              render={({ field: { onChange, value, ref, ...fieldProps }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                    Product Image {isEditing ? "(Optional)" : "*"}
                  </FieldLabel>

                  {preview ? (
                    <div className="relative w-full h-40 rounded-md overflow-hidden border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                      <Image src={preview} alt="Preview" fill className="object-contain p-2" />
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-neutral-900/70 text-white hover:bg-neutral-900 transition cursor-pointer"
                        onClick={() => {
                          onChange(undefined)
                          if (preview && preview.startsWith("blob:")) {
                            URL.revokeObjectURL(preview)
                          }
                          setPreview(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="product-image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-md cursor-pointer hover:border-neutral-400 hover:bg-neutral-50/50 transition"
                    >
                      <div className="flex flex-col items-center justify-center pt-4 pb-5 text-neutral-500">
                        <Upload className="w-6 h-6 mb-1 text-neutral-400" />
                        <p className="text-xs">
                          <span className="font-semibold text-neutral-700">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">PNG, JPG, or WEBP (Max 5MB)</p>
                      </div>
                      <input
                        {...fieldProps}
                        id="product-image-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            onChange(file)
                            setPreview(URL.createObjectURL(file))
                          }
                        }}
                      />
                    </label>
                  )}
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Dynamic Key-Value Specifications */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <FieldLabel className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Key Specifications
                </FieldLabel>
                <button
                  type="button"
                  onClick={() => append({ key: "", value: "" })}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Field</span>
                </button>
              </div>

              <div className="space-y-2">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between gap-2">
                    <Controller
                      name={`specifications.${index}.key`}
                      control={form.control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Spec Name (e.g. Wattage)" className="h-9 text-xs" />
                      )}
                    />
                    <Controller
                      name={`specifications.${index}.value`}
                      control={form.control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Value (e.g. 12W)" className="h-9 text-xs" />
                      )}
                    />
                    {fields.length > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Remove specification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FieldGroup>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-neutral-200">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Product"
                : "Save Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}