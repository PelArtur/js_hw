function max(arr)
{
    if (arr.length === 0) return NaN;
    let max = arr[0];

    for (let i = 1; i < arr.length; i++)
    {
        const current = arr[i];

        if (current > max)
            max = current;
    }

    return max;
}

console.log(max([1, 2, 3, 4, 5])) // 5
console.log(max([])) // NaN

// You can imagine that arr is padded with zeroes from both sides.
function maxPair(arr)
{
    if (arr.length === 0) return NaN;

    let max = [];

    for (let i = 0; i < arr.length; i++)
    {
        const current = arr[i];
        const next = arr[i + 1] || 0;

        if (max.length === 0 || current + next > max[0] + max[1])
            max = [current, next];
    }

    return max
}

console.log(maxPair([1, 2, 3, 4, 5])); // [4, 5]
console.log(maxPair([1, 2, 3, -4, 10])); // [10, 0]
console.log(maxPair([10, 1, 2, 3, -4, 4])); // [0, 10]   pair [10, 1] has bigger sum
console.log(maxPair([1, 2, -3, 10, -4, 4])); // [-3, 10]

function recordProgress(object, tuple) {
    if (tuple.length === 0) return object;

    const { age = 0, weight = 0 } = object;

    const [ageChange, weightChange] = tuple;

    const result = {
        age: age + ageChange,
        weight: weight + weightChange
    };

    return { ...object, ...result };
}

console.log(recordProgress({ name: 'Mike', age: 13, weight: 100 }, [1, 20])); // { name: 'Mike', age: 14, weight: 120 }
