"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  
  // Split the pathname into segments and remove empty strings
  const segments = pathname.split("/").filter((segment) => segment !== "");
  
  // Format the segment string into a title
  const formatTitle = (segment: string) => {
    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // If we're at the root of the dashboard, just show regular dashboard link
  if (segments.length === 0 || (segments.length === 1 && segments[0] === "dashboard")) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href={`/${segments[0]}`}>{formatTitle(segments[0])}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {segments.length > 1 && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
        
        {segments.slice(1).map((segment, index) => {
          const isLast = index === segments.length - 2;
          
          // Reconstruct the path up to this segment
          const href = `/${segments.slice(0, index + 2).join("/")}`;
          
          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatTitle(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="hidden md:block">
                    <Link href={href}>{formatTitle(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {!isLast && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
