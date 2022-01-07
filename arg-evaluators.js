export const ArgEvaluators = {
    PositiveInteger: (value) => (
        Number.isInteger(value) && value > 0
        ? value
        : NaN
    ),
}
