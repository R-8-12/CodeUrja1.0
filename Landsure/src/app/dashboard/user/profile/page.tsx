"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function ProfileSettings() {
  const { register, handleSubmit } = useForm();
  const [twoFactor, setTwoFactor] = useState(false);

  const onSubmit = async (data: any) => {
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile & Settings</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email")}
              disabled
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-4">
            <Label>Phone Number</Label>
            <Input type="tel" {...register("phone")} />
          </div>

          <div className="space-y-4">
            <Label>Address</Label>
            <Input type="text" {...register("address")} />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Enable for extra security
              </p>
            </div>
            <Switch
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}