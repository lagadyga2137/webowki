let liczba = 5;
let potega = 1;
let xd = 825;

function power(a, b)
{
    if(b < 1)
    {
        console.log("nie napisalem dla mniejszych niz 1 <333")
    }
    else
    {
        number = a;
        for (let i = 1; i < b; i++)
        {
            number = a * number;
        }
        return number;
    }

}
function czynniki(a){
        d = 2;
        while(a > 1)
        {
            while(a%d == 0)
            {
                console.log(d);
                a = a/d;
            }
            d++;
        }
}

console.log(power(liczba, potega));
console.log("\n")
czynniki(xd);