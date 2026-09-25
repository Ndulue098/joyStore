"use client"

import { useState, useEffect, useMemo } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Layers, Upload, X } from "lucide-react"
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
  DialogDescription,
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
import { createCategory, updateCategory } from "../action"
import { CategoryType } from "@/src/features/type"

const buildFormSchema = (isEditing: boolean) =>
  z.object({
    title: z.string().min(2, "Title is required"),
    description: z.string().optional(),
    parentId: z.string().optional(),
    isActive: z.boolean().default(true),
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
          .refine(
            (file) => file && file.size <= 5 * 1024 * 1024,
            "Max image size is 5MB"
          )
          .refine(
            (file) =>
              file &&
              ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only .jpg, .png, and .webp formats are supported"
          ),
  })

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>

interface ParentCategoryType extends CategoryType {
  subcategories?: CategoryType[];
}

interface CateFormProps { 
  categoryList?: CategoryType[]
  onSubmit?: (data: FormValues) => void
  children: React.ReactNode
  category?: CategoryType
  parentId?:number
  categoryParentList?:ParentCategoryType[];
  parentName?:string
}

export default function CateForm({ categoryList = [], category, children,parentId,categoryParentList,parentName}: CateFormProps) {


  // Calculate default parent ID properly
  const defaultParentId = category?.parent_id
    ? String(category.parent_id)
    : parentId
    ? String(parentId)
    : "none";

  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const isEditing = Boolean(category?.id)

  const schema = useMemo(() => buildFormSchema(isEditing), [isEditing])

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      parentId: defaultParentId,
      isActive: true,
    },
  })

  // Sync form values whenever dialog opens or parentId / category changes
  useEffect(() => {
    if (open) {
      if (category) {
        form.reset({
          title: category.name || "",
          description: category.description || "",
          parentId: category.parent_id ? String(category.parent_id) : "none",
          isActive: category.is_active ?? true,
        })
        setPreview(category.imageUrl || null)
      } else {
        form.reset({
          title: "",
          description: "",
          parentId: defaultParentId, // <--- Correctly uses parentId prop when creating subcategory
          isActive: true,
        })
        setPreview(null)
      }
    }
  }, [open, category, parentId, defaultParentId])

  function handleReset() {
    form.reset({
      title: "",
      description: "",
      parentId: defaultParentId,
      isActive: true,
    })
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
  }

  // ... rest of your code ...

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  async function onSubmit(data: FormValues) {
    const formData = new FormData()
    formData.append("title", data.title)
    if (data.description) formData.append("description", data.description)
    formData.append(
      "parentId",
      data.parentId === "none" ? "" : data.parentId || ""
    )
    formData.append("isActive", String(data.isActive))
    
    if (data.image) {
      formData.append("image", data.image)
    }

    let res

    if (isEditing && category?.id) {
      formData.append("id", String(category.id))
      res = await updateCategory(formData)
    } else {
      res = await createCategory(formData)
    }

    if (res?.success) {
      handleReset()
      setOpen(false)
    } else {
      alert(res?.error || `Failed to ${isEditing ? "update" : "create"} category`)
    }
  }

  // function handleReset() {
  //   form.reset({
  //     title: "",
  //     description: "",
  //     parentId: "none",
  //     isActive: true,
  //   })
  //   if (preview && preview.startsWith("blob:")) {
  //     URL.revokeObjectURL(preview)
  //   }
  //   setPreview(null)
  // }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val)
        if (!val) handleReset()
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md overflow-y-auto p-6 rounded-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-500" />
            {isEditing ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-500">
            {isEditing
              ? "Update category details and image."
              : "Provide details and upload an image for your category."} 
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup className="space-y-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title *</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Generator Parts"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* <Controller
              name="parentId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Parent Category</FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value || defaultParentId}
                  >
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>

                    <SelectContent>
                        {(!parentId && !category?.parent_id) && (
                          <SelectItem value="none">None (Top-Level Category)</SelectItem>
                        )}

                        {categoryParentList
                          ?.filter((cat) => !isEditing || cat.id !== category?.id)
                          ?.map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                              {cat.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}

         {!isEditing && parentId ? (
  <Field>
    <FieldLabel>Parent Category</FieldLabel>
    <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-300">
      <span className="text-xs uppercase font-extrabold text-indigo-600 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 px-2 py-0.5 rounded">
        Locked
      </span>
      <span>{parentName || "Selected Parent Category"}</span>
    </div>
    {/* Removed hidden <input> since React Hook Form now tracks parentId internally */}
  </Field>
) : (
  <Controller
    name="parentId"
    control={form.control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Parent Category</FieldLabel>
        <Select onValueChange={field.onChange} value={field.value || "none"}>
          <SelectTrigger id={field.name} className="w-full">
            <SelectValue placeholder="Select parent category" />
          </SelectTrigger>
          <SelectContent>
            {(!category || category.parent_id === null) && (
              <SelectItem value="none">None (Top-Level Category)</SelectItem>
            )}

            {categoryParentList
              ?.filter((cat) => cat.id !== category?.id)
              ?.map((cat) => (
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
)}

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="Add extra details..."
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="isActive"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex items-center gap-2">
                  <Checkbox
                    id="isActive"
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                    Active
                  </FieldLabel>
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field: { onChange, value, ref, ...fieldProps }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image-upload">
                    Upload Image {isEditing ? "(Optional)" : "*"}
                  </FieldLabel>

                  {preview ? (
                    <div className="relative w-full h-48 rounded-md overflow-hidden border">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        className="absolute top-2 right-2 h-7 w-7 rounded-full p-0 flex items-center justify-center"
                        onClick={() => {
                          onChange(undefined)
                          if (preview && preview.startsWith("blob:")) {
                            URL.revokeObjectURL(preview)
                          }
                          setPreview(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer hover:bg-neutral-50 transition"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-neutral-400" />
                        <p className="text-sm text-neutral-600">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-neutral-400 mt-1">
                          PNG, JPG, or WEBP (Max 5MB)
                        </p>
                      </div>
                      <input
                        {...fieldProps}
                        id="image-upload"
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
          </FieldGroup>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              icon={false}
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              icon={false}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Category"
                : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}