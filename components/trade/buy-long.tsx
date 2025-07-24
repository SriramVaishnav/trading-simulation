"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

const formSchema = z.object({
  orderType: z.enum(["Limit", "Market"]),
  price: z.number().min(0, "Price must be at least 0"),
  shares: z.number().min(0, "Shares must be at least 0"),
  percent: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function BuyLong() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderType: "Limit",
      price: 34.5,
      shares: 0,
      percent: 0,
    },
    mode: "onBlur",
  });

  const [orderTotal, setOrderTotal] = useState(0);

  const price = form.watch("price");
  const shares = form.watch("shares");

  useEffect(() => {
    const priceSafe = isNaN(price) ? 0 : price;
    const sharesSafe = isNaN(shares) ? 0 : shares;
    setOrderTotal(priceSafe * sharesSafe);
  }, [price, shares]);

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 bg-white dark:bg-zinc-900"
      >
        <FormField
          control={form.control}
          name="orderType"
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
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                  <span className="underline text-sm cursor-pointer">Mid</span>
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
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="percent"
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

        <div className="border-t pt-3 text-sm space-y-1">
          <div className="flex justify-between">
            <span>Order Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>To Win 💸</span>
            <span>$0</span>
          </div>
        </div>

        <Button type="submit" className="w-full">
          BUY/LONG CSK
        </Button>
      </form>
    </Form>
  );
}
