import {Request} from 'express';
import {User} from "../models/user";

export default class Context {
    static _bindings = new WeakMap<Request, Context>();

    public user: User | null = null;

    static bind(req: Request): void {
        const ctx = new Context();
        Context._bindings.set(req, ctx);
    }

    static get(req: Request): Context | null {
        return Context._bindings.get(req) || null;
    }
}