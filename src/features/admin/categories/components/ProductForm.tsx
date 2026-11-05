"use client"

import { useState, useEffect, useMemo } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Trash2, Upload, X, Package, Layers } from "lucide-react"
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
import { Subcategories } from "@/src/types/types"

const buildFormSchema = (isEditing: boolean) =>
  z.object({
    name: z.string().min(2, "Product name is required"),
    brand: z.string().min(1, "Brand is required"),
    category_id: z.string().min(1, "Category is required"),
    short_description: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    unit: z.string().min(1, "Unit is required"),
    className: z.string().optional(), // Added optional class name field
    is_active: z.boolean().default(true),
    is_best_seller: z.boolean().default(false),
    is_new: z.boolean().default(false),
    
    colors: z.array(z.string()).default([]),

    specifications: z.array(
      z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string().min(1, "Value is required"),
      })
    ),

    variantFields: z.array(
      z.object({
        field_name: z.string().min(1, "Field name is required"),
        field_key: z.string().min(1, "Field key is required"),
        field_type: z.enum(["text", "number", "select", "boolean", "colour"]),
        options: z.array(z.string()).default([]),
        is_required: z.boolean().default(false),
      })
    ),

    variants: z.array(
      z.object({
        id: z.any().optional(),
        name: z.string().optional(), // Added name field to variant
        sku: z.string().optional(),
        price: z.coerce.number().min(0, "Price must be a positive number"),
        discount_price: z.coerce.number().min(0).optional(),
        stock_quantity: z.coerce.number().min(0, "Stock must be 0 or more"),
        stock_status: z.enum(["In Stock", "Out of Stock", "Pre-Order"]).default("In Stock"),
        description: z.string().optional(),
        specifications: z.array(
          z.object({
            key: z.string().min(1, "Key is required"),
            value: z.string().min(1, "Value is required"),
          })
        ).default([]),
        is_active: z.boolean().default(true),
        attributes: z.record(z.string(), z.any()),
        image: z.custom<File | undefined>().optional(),
        image_url: z.string().optional(),
      })
    ).min(1, "A product must have at least one variation"),
  })

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>
type FormOutputValues = z.output<ReturnType<typeof buildFormSchema>>

interface ProductFormProps {
  children?: React.ReactNode
  id?: number
  name?: string
  product?: any
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

  const isEditing = Boolean(product?.id)
  const defaultCategoryId = String(product?.category_id ?? id ?? "")

  const [variantPreviews, setVariantPreviews] = useState<Record<number, string>>({})

  const schema = useMemo(() => buildFormSchema(isEditing), [isEditing])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      brand: "",
      category_id: defaultCategoryId,
      short_description: "",
      description: "",
      unit: "pcs",
      className: "",
      is_active: true,
      is_best_seller: false,
      is_new: false,
      colors: [],
      specifications: [
        { key: "Wattage", value: "15W" },
        { key: "Voltage", value: "220–240V AC" },
      ],
      variantFields: [],
      variants: [
        {
          name: "",
          sku: "",
          price: 5000,
          discount_price: 0,
          stock_quantity: 20,
          stock_status: "In Stock",
          description: "",
          specifications: [],
          is_active: true,
          attributes: {},
          image: undefined,
        },
      ],
    },
  })

  const { fields: baseSpecsFields, append: appendBaseSpec, remove: removeBaseSpec } = useFieldArray({
    control: form.control,
    name: "specifications",
  })

  const { fields: fieldDefinitions, append: appendField, remove: removeField } = useFieldArray({
    control: form.control,
    name: "variantFields",
  })

  const { fields: variantRows, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants",
  })

  const selectedCategoryId = form.watch("category_id")
  const currentCategoryName = useMemo(() => {
    const found = categoryList?.find((cat) => String(cat.id) === selectedCategoryId)
    return found?.name || name || "Unassigned"
  }, [selectedCategoryId, categoryList, name])

  const watchedVariantFields = form.watch("variantFields")

  // Hydrate form when editing an existing product
  useEffect(() => {
    if (open) {
      if (product) {
        let parsedBaseSpecs: { key: string; value: string }[] = []
        if (product.specifications) {
          try {
            const rawSpecs = typeof product.specifications === "string" ? JSON.parse(product.specifications) : product.specifications
            parsedBaseSpecs = Object.entries(rawSpecs).map(([k, v]) => ({ key: k, value: String(v) }))
          } catch (e) {
            console.error("Failed to parse base specifications", e)
          }
        }

        // Parse base colors
        let parsedColors: string[] = []
        if (product.colors) {
          if (Array.isArray(product.colors)) {
            parsedColors = product.colors
          } else if (typeof product.colors === "string") {
            try { 
              parsedColors = JSON.parse(product.colors) 
            } catch (e) { 
              parsedColors = product.colors.split(",").map((s: string) => s.trim()) 
            }
          }
        }

        let parsedVariantFields = []
        const fieldsSource = product.product_variant_fields || []
        if (fieldsSource.length > 0) {
          parsedVariantFields = fieldsSource.map((f: any) => {
            let opts = f.options || []
            if (typeof opts === "string") {
              try { opts = JSON.parse(opts) } catch (err) { opts = [] }
            }
            return {
              field_name: f.field_name || "",
              field_key: f.field_key || "",
              field_type: f.field_type || "select",
              options: Array.isArray(opts) ? opts : [],
              is_required: f.is_required ?? false,
            }
          })
        }

        let parsedVariants = []
        let initialPreviews: Record<number, string> = {}
        const variantsSource = product.product_variants || []

        if (variantsSource.length > 0) {
          parsedVariants = variantsSource.map((v: any, idx: number) => {
            let parsedVariantSpecs: { key: string; value: string }[] = []
            if (v.specifications) {
              try {
                const rawVarSpecs = typeof v.specifications === "string" ? JSON.parse(v.specifications) : v.specifications
                parsedVariantSpecs = Object.entries(rawVarSpecs).map(([k, val]) => ({ key: k, value: String(val) }))
              } catch (e) {
                console.error("Failed to parse variant specifications", e)
              }
            }

            if (v.image_url) {
              initialPreviews[idx] = v.image_url
            }

            return {
              id: v.id,
              name: v.name || "",
              sku: v.sku || "",
              price: v.price ?? product.price ?? 5000,
              discount_price: v.discount_price ?? 0,
              stock_quantity: v.stock_quantity ?? 10,
              stock_status: v.stock_status || "In Stock",
              description: v.description || "",
              specifications: parsedVariantSpecs,
              is_active: v.is_active ?? true,
              attributes: v.attributes || {},
              image_url: v.image_url || undefined,
              image: undefined,
            }
          })
        } else {
          parsedVariants = [{
            name: "",
            sku: product.sku || "",
            price: product.price ?? 5000,
            discount_price: product.discount ?? 0,
            stock_quantity: product.stock_quantity ?? 20,
            stock_status: product.stock_status || "In Stock",
            description: "",
            specifications: [],
            is_active: true,
            attributes: {},
            image: undefined,
          }]
        }

        setVariantPreviews(initialPreviews)

        form.reset({
          name: product.name || "",
          brand: product.brand || "",
          category_id: String(product.category_id || id || ""),
          short_description: product.short_description || "",
          description: product.description || "",
          unit: product.unit || "pcs",
          className: product.class_name || product.className || "",
          is_active: product.is_active ?? true,
          is_best_seller: product.is_best_seller ?? false,
          is_new: product.is_new ?? false,
          colors: parsedColors,
          specifications: parsedBaseSpecs,
          variantFields: parsedVariantFields,
          variants: parsedVariants,
        })
      } else {
        handleReset()
      }
    }
  }, [open, product, id])

  useEffect(() => {
    return () => {
      Object.values(variantPreviews).forEach((url) => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [variantPreviews])

  async function onSubmit(data: FormValues) {
    const baseSpecsObject = data.specifications.reduce((acc, curr) => {
      if (curr.key.trim()) acc[curr.key.trim()] = curr.value.trim()
      return acc
    }, {} as Record<string, string>)

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("brand", data.brand)
    formData.append("category_id", data.category_id)
    if (data.short_description) formData.append("short_description", data.short_description)
    formData.append("description", data.description)
    formData.append("unit", data.unit)
    if (data.className) formData.append("class_name", data.className)
    formData.append("is_active", String(data.is_active))
    formData.append("is_best_seller", String(data.is_best_seller))
    formData.append("is_new", String(data.is_new))
    formData.append("colors", JSON.stringify(data.colors))
    formData.append("specifications", JSON.stringify(baseSpecsObject))

    formData.append("variantFields", JSON.stringify(data.variantFields))
    
    const serializedVariants = data.variants.map((v, idx) => {
      if (v.image) {
        formData.append(`variant_image_${idx}`, v.image)
      }

      const variantSpecsObject = v.specifications.reduce((acc, curr) => {
        if (curr.key.trim()) acc[curr.key.trim()] = curr.value.trim()
        return acc
      }, {} as Record<string, string>)

      return {
        id: v.id || undefined,
        name: v.name || "",
        sku: v.sku || "",
        price: v.price,
        discount_price: v.discount_price,
        stock_quantity: v.stock_quantity,
        stock_status: v.stock_status,
        description: v.description || null,
        specifications: variantSpecsObject,
        is_active: v.is_active,
        attributes: v.attributes,
        image_url: v.image_url || null,
      }
    })

    formData.append("variants", JSON.stringify(serializedVariants))

    let res
    if (isEditing && product?.id) {
      formData.append("id", String(product.id))
      res = await updateProduct(formData)
    } else {
      res = await createProduct(formData)
    }

    if (res?.success) {
      setOpen(false)
    } else {
      alert(res?.error || `Failed to ${isEditing ? "update" : "save"} product`)
    }
  }

  function handleReset() {
    form.reset({
      name: "",
      brand: "",
      category_id: defaultCategoryId,
      short_description: "",
      description: "",
      unit: "pcs",
      className: "",
      is_active: true,
      is_best_seller: false,
      is_new: false,
      colors: [],
      specifications: [
        { key: "Wattage", value: "15W" },
        { key: "Voltage", value: "220–240V AC" },
      ],
      variantFields: [],
      variants: [
        {
          name: "",
          sku: "",
          price: 5000,
          discount_price: 0,
          stock_quantity: 20,
          stock_status: "In Stock",
          description: "",
          specifications: [],
          is_active: true,
          attributes: {},
          image: undefined,
        },
      ],
    })
    Object.values(variantPreviews).forEach((url) => {
      if (url && url.startsWith("blob:")) URL.revokeObjectURL(url)
    })
    setVariantPreviews({})
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val)
      if (!val) handleReset()
    }}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-md">
        <DialogHeader className="space-y-1 mt-2">
          <DialogTitle className="text-lg justify-between font-bold text-neutral-900 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-500" />
              {isEditing ? "Edit Product & Variations" : "Add New Product & Variations"}
            </div>
            <div className="text-sm font-normal text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200">
              Category: <span className="font-semibold text-neutral-900">{currentCategoryName}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
          
          {/* SECTION 1: BASE PRODUCT INFORMATION */}
          <div className="space-y-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">1. Base Product Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Controller 
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase">Product Name *</FieldLabel>
                    <Input {...field} placeholder="e.g. Philips LED Bulb 12W E27" className="h-10 text-sm bg-white" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="brand"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase">Brand *</FieldLabel>
                    <Input {...field} placeholder="e.g. Philips" className="h-10 text-sm bg-white" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <Controller
                name="category_id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase">Category *</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                      <SelectTrigger className="h-10 text-sm bg-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryList?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="unit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase">Unit *</FieldLabel>
                    <Input {...field} placeholder="pcs / box / kg" className="h-10 text-sm bg-white" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="className"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs font-bold text-neutral-700 uppercase">Class Name (Optional)</FieldLabel>
                    <Input {...field} placeholder="e.g. Premium Series" className="h-10 text-sm bg-white" />
                  </Field>
                )}
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Controller
                name="is_active"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_active" checked={field.value} onCheckedChange={field.onChange} />
                    <label htmlFor="is_active" className="text-xs font-medium cursor-pointer">Active</label>
                  </div>
                )}
              />
              <Controller
                name="is_best_seller"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_best_seller" checked={field.value} onCheckedChange={field.onChange} />
                    <label htmlFor="is_best_seller" className="text-xs font-medium cursor-pointer">Best Seller</label>
                  </div>
                )}
              />
              <Controller
                name="is_new"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_new" checked={field.value} onCheckedChange={field.onChange} />
                    <label htmlFor="is_new" className="text-xs font-medium cursor-pointer">Mark as New</label>
                  </div>
                )}
              />
            </div>

            {/* BASE PRODUCT COLORS (OPTIONAL & MULTIPLE) */}
            <div className="space-y-1.5 pt-1">
              <FieldLabel className="text-xs font-bold text-neutral-700 uppercase">Base Product Colors (Optional, Multiple)</FieldLabel>
              <Controller
                name="colors"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-1.5">
                    <Input
                      value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                      onChange={(e) => {
                        const val = e.target.value
                        const colorArray = val ? val.split(",").map((s) => s.trim()) : []
                        field.onChange(colorArray)
                      }}
                      placeholder="e.g. Matte Black, Pure White, Silver"
                      className="h-10 text-sm bg-white"
                    />
                    <p className="text-[11px] text-neutral-500">
                      Separate multiple colors with commas.
                    </p>
                  </div>
                )} 
              />
            </div>

            <Controller 
              name="short_description"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel className="text-xs font-bold text-neutral-700 uppercase">Short Description</FieldLabel>
                  <Input {...field} placeholder="Brief overview..." className="h-10 text-sm bg-white" />
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs font-bold text-neutral-700 uppercase">Full Description *</FieldLabel>
                  <Textarea {...field} rows={3} placeholder="Comprehensive description..." className="text-sm bg-white resize-none" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <FieldLabel className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Base Product Specifications
                </FieldLabel>
                <button
                  type="button"
                  onClick={() => appendBaseSpec({ key: "", value: "" })}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Spec</span>
                </button>
              </div>

              <div className="space-y-2">
                {baseSpecsFields.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between gap-2">
                    <Controller
                      name={`specifications.${index}.key`}
                      control={form.control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Spec Name (e.g. Wattage)" className="h-9 text-xs bg-white" />
                      )}
                    />
                    <Controller
                      name={`specifications.${index}.value`}
                      control={form.control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Value (e.g. 15W)" className="h-9 text-xs bg-white" />
                      )}
                    />
                    {baseSpecsFields.length > 0 && (
                      <button
                        type="button"
                        onClick={() => removeBaseSpec(index)}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: DYNAMIC VARIATION ATTRIBUTE BUILDER */}
          <div className="space-y-4 p-4 bg-amber-50/40 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900">2. Variation Attribute Builder</h3>
                <p className="text-[11px] text-amber-700">Define custom attributes that distinguish versions (e.g. Gang Type, Size)</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => appendField({ field_name: "", field_key: "", field_type: "select", options: [], is_required: true })}
                className="text-xs h-8 border-amber-300 text-amber-900 hover:bg-amber-100"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Attribute Field
              </Button>
            </div>

            <div className="space-y-3">
              {fieldDefinitions.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-white p-3 rounded-md border border-amber-100 shadow-xs">
                  <Controller
                    name={`variantFields.${index}.field_name`}
                    control={form.control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Field Name (e.g. Size)" className="h-9 text-xs" />
                    )}
                  />
                  <Controller
                    name={`variantFields.${index}.field_key`}
                    control={form.control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Key (e.g. size)" className="h-9 text-xs font-mono" />
                    )}
                  />
                  <Controller
                    name={`variantFields.${index}.options`}
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                        onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
                        placeholder="Options (comma separated: Small, Large)"
                        className="h-9 text-xs"
                      />
                    )}
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="p-2 text-neutral-400 hover:text-red-600 rounded-md transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: PRODUCT VARIATIONS ENTRY CARDS */}
          <div className="space-y-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">3. Product Variations ({variantRows.length})</h3>
                <p className="text-[11px] text-neutral-500">Manage individual stock items, pricing, attributes, and variation-specific specs</p>
              </div>
              <Button
                type="button"
                variant="primary"
                onClick={() => appendVariant({ name: "", sku: "", price: 5000, discount_price: 0, stock_quantity: 10, stock_status: "In Stock", description: "", specifications: [], is_active: true, attributes: {}, image: undefined })}
                className="text-xs h-8"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Variation
              </Button>
            </div>

            <div className="space-y-4">
              {variantRows.map((variantItem, vIndex) => {
                const currentPreview = variantPreviews[vIndex] || variantItem.image_url

                return (
                  <VariantRowCard
                    key={variantItem.id || vIndex}
                    control={form.control}
                    vIndex={vIndex}
                    variantRowsLength={variantRows.length}
                    watchedVariantFields={watchedVariantFields}
                    currentPreview={currentPreview}
                    form={form}
                    variantPreviews={variantPreviews}
                    setVariantPreviews={setVariantPreviews}
                    removeVariant={removeVariant}
                  />
                )
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-neutral-200">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving Product..." : "Save Product & Variations"}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}

function VariantRowCard({
  control,
  vIndex,
  variantRowsLength,
  watchedVariantFields,
  currentPreview,
  form,
  variantPreviews,
  setVariantPreviews,
  removeVariant,
}: any) {
  const { fields: variantSpecFields, append: appendVariantSpec, remove: removeVariantSpec } = useFieldArray({
    control,
    name: `variants.${vIndex}.specifications`,
  })

  return (
    <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-xs space-y-4 relative">
      <div className="flex items-center justify-between border-b pb-2">
        <span className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-500" /> Variation #{vIndex + 1}
        </span>
        {variantRowsLength > 1 && (
          <button
            type="button"
            onClick={() => {
              if (variantPreviews[vIndex]?.startsWith("blob:")) {
                URL.revokeObjectURL(variantPreviews[vIndex])
              }
              setVariantPreviews((prev: any) => {
                const updated = { ...prev }
                delete updated[vIndex]
                return updated
              })
              removeVariant(vIndex)
            }}
            className="text-neutral-400 hover:text-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Controller
          name={`variants.${vIndex}.name`}
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel className="text-[10px] font-bold uppercase">Variant Name (Optional)</FieldLabel>
              <Input {...field} placeholder="e.g. Warm White / 1-Gang" className="h-9 text-xs" />
            </Field>
          )}
        />

        <Controller
          name={`variants.${vIndex}.sku`}
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel className="text-[10px] font-bold uppercase">SKU (Optional)</FieldLabel>
              <Input {...field} placeholder="Auto-generated if blank" className="h-9 text-xs font-mono" />
            </Field>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Controller
          name={`variants.${vIndex}.price`}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-[10px] font-bold uppercase">Price (₦) *</FieldLabel>
              <Input {...field} type="number" placeholder="5000" className="h-9 text-xs font-mono" />
            </Field>
          )}
        />

        <Controller
          name={`variants.${vIndex}.stock_quantity`}
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel className="text-[10px] font-bold uppercase">Stock Qty *</FieldLabel>
              <Input {...field} type="number" placeholder="10" className="h-9 text-xs font-mono" />
            </Field>
          )}
        />

        <Controller
          name={`variants.${vIndex}.stock_status`}
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel className="text-[10px] font-bold uppercase">Status</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  <SelectItem value="Pre-Order">Pre-Order</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </div>

      <Controller
        name={`variants.${vIndex}.description`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel className="text-[10px] font-bold uppercase text-neutral-600">Variant Description (Optional)</FieldLabel>
            <Textarea {...field} rows={2} placeholder="Specific notes or details for this exact variation..." className="text-xs resize-none" />
          </Field>
        )}
      />

      {watchedVariantFields.length > 0 && (
        <div className="pt-2 border-t border-neutral-100">
          <p className="text-[10px] font-bold text-neutral-500 uppercase mb-2">Variant Attributes</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {watchedVariantFields.map((attrDef: any) => (
              <Controller
                key={attrDef.field_key}
                name={`variants.${vIndex}.attributes.${attrDef.field_key}`}
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-[10px] text-neutral-600">{attrDef.field_name}</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder={`Select ${attrDef.field_name}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {attrDef.options?.map((opt: string) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            ))}
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-neutral-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase text-neutral-600">Variant Specific Specifications (Optional)</span>
          <button
            type="button"
            onClick={() => appendVariantSpec({ key: "", value: "" })}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 hover:text-amber-800 transition cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add Spec</span>
          </button>
        </div>

        <div className="space-y-2">
          {variantSpecFields.map((specItem, sIndex) => (
            <div key={specItem.id} className="flex items-center justify-between gap-2">
              <Controller
                name={`variants.${vIndex}.specifications.${sIndex}.key`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Spec Name (e.g. Lumens)" className="h-8 text-xs" />
                )}
              />
              <Controller
                name={`variants.${vIndex}.specifications.${sIndex}.value`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Value (e.g. 800lm)" className="h-8 text-xs" />
                )}
              />
              <button
                type="button"
                onClick={() => removeVariantSpec(sIndex)}
                className="p-1.5 text-neutral-400 hover:text-red-600 rounded transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 space-y-2">
        <FieldLabel className="text-[10px] font-bold uppercase text-neutral-600">Variant Image</FieldLabel>
        
        {currentPreview ? (
          <div className="relative w-28 h-28 rounded-md overflow-hidden border border-neutral-200 bg-neutral-50 flex items-center justify-center">
            <Image src={currentPreview} alt="Variant preview" fill className="object-contain p-1" />
            <button
              type="button"
              className="absolute top-1 right-1 p-1 rounded-full bg-neutral-900/70 text-white hover:bg-neutral-900 transition cursor-pointer"
              onClick={() => {
                form.setValue(`variants.${vIndex}.image`, undefined)
                if (variantPreviews[vIndex]?.startsWith("blob:")) {
                  URL.revokeObjectURL(variantPreviews[vIndex])
                }
                setVariantPreviews((prev: any) => {
                  const updated = { ...prev }
                  delete updated[vIndex]
                  return updated
                })
              }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <Controller
            name={`variants.${vIndex}.image`}
            control={control}
            render={({ field: { onChange } }) => (
              <label
                htmlFor={`variant-image-${vIndex}`}
                className="flex items-center gap-3 w-full max-w-sm h-10 px-3 border border-dashed border-neutral-300 rounded-md cursor-pointer hover:border-neutral-400 hover:bg-neutral-50 transition"
              >
                <Upload className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="text-xs text-neutral-500 truncate">Choose variant image...</span>
                <input
                  id={`variant-image-${vIndex}`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      onChange(file)
                      const blobUrl = URL.createObjectURL(file)
                      setVariantPreviews((prev: any) => ({ ...prev, [vIndex]: blobUrl }))
                    }
                  }}
                />
              </label>
            )}
          />
        )}
      </div>

    </div>
  )
}