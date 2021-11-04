module.exports = (express, controller) => {
    const router = express.Router();

    router.get('/travelersArround/:lat/:lng', controller.getTravelersAround);

    router.post("/signin", controller.signIn);

    router.post("/signup", controller.signUp);

    router.put('/:id', controller.updateLocation);

    return router;
};


