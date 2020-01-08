import { Middleware } from "koa";
import { VerificaException } from "verifica";

export function handleVerificaExceptions(): Middleware {
    return async function _handleVerificaExceptions(ctx, next) {
        try {
            await next();
        } catch (e) {
            if (e instanceof VerificaException) {
                ctx.status = 400;
                ctx.body = {
                    type: "validation",
                    errors: e.errors,
                };

                ctx.app.emit("validation error", e, ctx);
            } else {
                throw e;
            }
        }
    };
}
