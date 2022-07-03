export const arrayToPools = <T>(array: T[]) => {

    const pools: T[][] = array.reduce((accum, current) => {

        const lastArray = accum[accum.length - 1]

        if(lastArray.length >= 10) {
            accum.push([current])
        } else {
            lastArray.push(current)
        }

        return accum

    }, [[]])

    return pools
}