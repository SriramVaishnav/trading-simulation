"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

const formSchema = z.object({
  type: z.enum(["Limit", "Market"]),
  price: z.number().positive(),
  shares: z.number().int().positive(),
  percentage: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function SellShort() {
  const [orderTotal, setOrderTotal] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Limit",
      price: 34.5,
      shares: 0,
      percentage: 0,
    },
  });

  const watchShares = form.watch("shares");
  const watchPrice = form.watch("price");

  useEffect(() => {
    setOrderTotal(watchPrice * watchShares);
  }, [watchPrice, watchShares]);

  const onSubmit = (data: FormValues) => {
    console.log("SELL/SHORT SUBMIT", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Limit">Limit</SelectItem>
                  <SelectItem value="Market">Market</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="underline">Available to Trade:</span>
          <span>0.00 USDC</span>
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (USD)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                  <span className="text-muted-foreground cursor-pointer underline">
                    Mid
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shares</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Percent</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[field.value]}
                    max={100}
                    step={1}
                    onValueChange={(val) => field.onChange(val[0])}
                    className="flex-1"
                  />
                  <div className="w-12 text-right text-sm">{field.value}%</div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <hr />

        <div className="flex justify-between text-sm">
          <span>Order Total</span>
          <span>${orderTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>To Win 📉</span>
          <span>${orderTotal.toLocaleString()}</span>
        </div>

        <Button className="w-full" type="submit">
          SELL / SHORT CSK
        </Button>
      </form>
    </Form>
  );
}
