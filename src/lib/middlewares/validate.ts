import withJoi from "next-joi";

export default withJoi({
  onValidationError: (_, res, __) => {
    res.status(400).send({ msg: "Invalid Fields" });
  },
});
