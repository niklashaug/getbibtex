import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  getCitation,
  serializeUrl,
} from "@/server/citations/get-citation-data";
import { TRPCError } from "@trpc/server";
import { entriesService } from "@/server/db/entries-service";
import { saveErrorLogToDb } from "@/server/db/errors-service";

export const citationsRouter = createTRPCRouter({
  getBibtexInfo: publicProcedure
    .input(z.object({ url: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        entriesService
          .saveRequestToDb({
            url: input.url,
            userId: input.userId,
          })
          .catch((e) => console.log(">> entry log db saving error", e));

        const url = serializeUrl(input.url);
        const res = await getCitation(url);

        return res;
      } catch (e) {
        const error = e as Error;
        console.error(">> getBibtexInfo", error.message);

        await saveErrorLogToDb({
          url: input.url,
          userId: input.userId,
          message: error.message ?? "UNKNOWN",
        }).catch((e) => console.log(">> error log db saving error", e));

        throw new TRPCError({
          cause: "Mine our yours stupidity.",
          code: "INTERNAL_SERVER_ERROR",
          message: "Something wrong happened on the server.",
        });
      }
    }),
});
