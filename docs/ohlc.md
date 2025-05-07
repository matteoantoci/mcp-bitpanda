Endpoint

https://api.bitpanda.com/v3/ohlc/{id}/{fiatCurrency}/{day|week}

eg: https://api.bitpanda.com/v3/ohlc/1ed6b2a8-e22e-6a08-adae-deceb40c990c/USD/week


ZOD schema

```ts
export const schema = z.object({
  data: z.array(
    z.object({
      type: z.string(),
      attributes: z.object({
        open: z.string(),
        high: z.string(),
        low: z.string(),
        close: z.string(),
        time: z.object({ date_iso8601: z.string(), unix: z.string() })
      })
    })
  )
})
```
