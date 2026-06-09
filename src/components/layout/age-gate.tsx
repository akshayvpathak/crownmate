"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AgeGate() {
  const { showAgeGate, ageGateStep, verifyAge } = useUIStore();

  useEffect(() => {
    const verified = localStorage.getItem("frizty-age-verified");
    if (verified === "true") {
      verifyAge(true);
    }
  }, [verifyAge]);

  return (
    <Dialog open={showAgeGate}>
      <DialogContent
        className="max-w-sm rounded-xl sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {ageGateStep === "blocked" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-lg font-semibold">
                Come back when you&apos;re older
              </DialogTitle>
            </DialogHeader>
            <p className="text-center text-sm text-muted-foreground">
              Sorry, the content of this store can&apos;t be seen by a younger audience.
              Come back when you&apos;re older.
            </p>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-lg font-semibold">
                Confirm your age
              </DialogTitle>
            </DialogHeader>
            <p className="text-center text-sm text-muted-foreground">
              Are you 18 years old or older?
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 rounded-full text-xs font-semibold uppercase"
                onClick={() => verifyAge(false)}
              >
                No, I&apos;m not
              </Button>
              <Button
                variant="default"
                className="flex-1 rounded-full text-xs font-semibold uppercase"
                onClick={() => {
                  localStorage.setItem("frizty-age-verified", "true");
                  verifyAge(true);
                }}
              >
                Yes, I am
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
