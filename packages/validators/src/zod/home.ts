import z from "zod";

export const homeGreeting = z.object({
  name: z.string({ error: "Please provide a name." })
});
