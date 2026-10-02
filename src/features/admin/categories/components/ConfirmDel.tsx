"use client"
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
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
interface ConfirmDelProps {
  children:React.ReactNode;
  name:string;
  tablename:string
  onDelete: () => Promise<{ success: boolean; error?: string } | any>;
}

export default function ConfirmDel({children,name,tablename,onDelete}: ConfirmDelProps) {
   const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const {success}=await onDelete()

      setOpen(false)
      if(success){
        toast.add({
          type: "success",
          description: `Successfully deleted "${name}".`,
        });
      }

    } catch (error: any) {
      setOpen(false)

      toast.add({
        type: "error",
        priority: "high",
        description: `Failed to delete ${tablename}: "${error?.message || error}"`,
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[420px] text-center p-6 rounded-md border border-neutral-200 bg-white">
        <AlertDialogHeader className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
          
          {/* Warning Icon Badge */}
          <div className="flex h-12 items-center justify-center w-full rounded-md bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400 shrink-0">
            <AlertTriangle className="h-6 w-6 stroke-[1.75]" />
          </div>

          <div className="space-y-1">
            <AlertDialogTitle className="text-lg text-center font-bold text-neutral-900 dark:text-neutral-100">
              Delete <span className="text-red-600 dark:text-red-400">&ldquo;{name}&rdquo;</span>?
            </AlertDialogTitle>
            
            <AlertDialogDescription className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              This action cannot be undone. This will permanently remove{" "}
              <strong className="text-neutral-700 dark:text-neutral-300 font-semibold">
                {name}
              </strong>{" "}
              and all associated data from your store.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <AlertDialogCancel
            disabled={loading}
            className="w-full sm:w-auto mt-0 border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="w-full sm:w-auto bg-rose-600 hover:bg-red-700 text-white font-medium transition-colors cursor-pointer dark:bg-red-600 dark:hover:bg-red-700"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete Item"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}