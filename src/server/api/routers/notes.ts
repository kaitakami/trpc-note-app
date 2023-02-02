import { string, z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import Note from "../../../pages/[id]";

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
  getNote: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.note
        .findUniqueOrThrow({
          where: {
            id: input.id,
          },
        })
        .catch((err) => console.log(err));
    }),
  editNote: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().trim().min(1, {
          message: "Title can't be shorter than 1 characters",
        }),
        description: z.string().trim().min(1, {
          message: "Description can't be shorter than 1 characters",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.note
        .update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            description: input.description,
          },
        })
        .catch((err) => console.log(err));
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
