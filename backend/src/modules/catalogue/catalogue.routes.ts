import { Router } from "express";

import { asyncHandler } from "../../utils/async-handler";

import { catalogueController } from ".";

const router = Router();

router.get(
    "/",
    asyncHandler((req, res) =>
        catalogueController.getCatalogue(req, res)
    )
);

router.get(
    "/products/:slug",
    asyncHandler((req, res) =>
        catalogueController.getProduct(req, res)
    )
);

export default router;