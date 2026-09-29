"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Adjust import path if needed

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface CustomBreadcrumbsProps {
  /**
   * Optional custom items array. If omitted, items will be auto-generated from the current pathname.
   */
  items?: BreadcrumbSegment[];
  /**
   * Custom label for the home link (defaults to "Home")
   */
  homeLabel?: string;
  /**
   * Additional custom styling classes for the container
   */
  className?: string;
}

export default function CustomBreadcrumbs({
  items,
  homeLabel = "Home",
  className = "",
}: CustomBreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate segments from current pathname if custom items aren't provided
  const generatedItems: BreadcrumbSegment[] = React.useMemo(() => {
    if (items) return items;

    const pathSegments = pathname.split("/").filter(Boolean);

    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      // Formats slug into capitalized readable words (e.g. "products" -> "Products", "cables-and-switches" -> "Cables And Switches")
      const label = decodeURIComponent(segment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return { label, href };
    });
  }, [items, pathname]);

  return (
    <Breadcrumb className={`my-4 ${className}`}>
      <BreadcrumbList>
        {/* Home Item */}
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              {homeLabel}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {generatedItems.map((item, index) => {
          const isLast = index === generatedItems.length - 1;

          return (
            <React.Fragment key={item.href || index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage className="font-semibold text-neutral-900">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink>
                    <Link
                      href={item.href}
                      className="hover:text-neutral-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}