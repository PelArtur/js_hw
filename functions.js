function round(n)
{
    return Math.round(n * 100) / 100;
}

function reverseWords(str)
{
    return str.split(" ").reverse().join(" ");
}

function onlyEven(list)
{
    return list.filter(num => num % 2 === 0).map(num => num);
}

function isPalindrome(num)
{
    return num.toString() === num.toString().split("").reverse().join("");
}

function fizzBuzz(n)
{
    let res = [];

    for (let i = 1; i <= n; ++i)
    {
        if (i % 15 === 0)
            res.push("FizzBuzz");
        else if (i % 3 === 0)
            res.push("Fizz");
        else if (i % 5 === 0)
            res.push("Buzz");
        else
            res.push(`${i}`);
    }

    return res;
}

function test()
{
    console.log(round(2.3456) === 2.35);
    console.log(reverseWords("Hello world!") === "world! Hello");
    console.log(JSON.stringify(onlyEven([1, 2, 3, 4])) === JSON.stringify([2, 4]));
    console.log(isPalindrome(121) === true);
    console.log(isPalindrome(125) === false);
    console.log(JSON.stringify(fizzBuzz(15)) === JSON.stringify(["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]));
}

test();
