import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";

export const noteRouter = createTRPCRouter({
  newNote: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, { message: "Title can't be empty" }).trim(),
        description: z
          .string()
          .min(3, {
            message: "Description can't be shorter than 3 characters",
          })
          .trim(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.note.create({
          data: {
            title: input.title,
            description: input.description,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  deleteNote: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
  allNotes: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.note.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
});
