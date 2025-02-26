/*  Project Standards:

  - Logging standards

  - Naming standards
      function, method, variable => CAMEL
      class => PASCAL
      folder, file => KEBAB
      css => SNAKE

  - Error handling
*/

/* API:
  Traditional API
  Rest API
  GraphQl API
*/

/* Frontend Development:
  Traditional FD => SSR  =>  EJS
  Modern FD      => SPA  =>  REACT
*/

/* cookies:
  request join
  self destroy
*/

/* validation:
  Frontend validation
  Backend validation
  Database validation

  (kirdi-chiqdi validation)
*/

// -----------------TASK G:----------------------

// Yagona parametrga ega function tuzing.
// Va bu function parametr orqalik integer ma'lumot turlariga ega bo'lgan bir arrayni qabul qilsin.
// Ushbu function bizga arrayning tarkibidagi birinchi eng katta qiymatning indeksini qaytarsin.

// MASALAN: getHighestIndex([5, 21, 12, 21 ,8]); return qiladi 1 sonini
// Yuqoridagi misolda, birinchi indeksda 21 joylashgan.
// Va bu 21 soni arrayning tarkibidagi birinchi eng katta son hisobladi va bizga uning indeksi 1 qaytadi.

/*
function getHighestIndex(arr: number[]) {
    let arr1 = [...arr];

    arr.sort(function(a, b) { return b-a});

    return arr1.indexOf(arr[0]);
}

const result = getHighestIndex([5, 21, 12, 21 ,8]);
console.log(result);
*/

// -------------------H-TASK:-------------------------

// shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib, faqat positive qiymatlarni olib string holatda return qilsin
// MASALAN: getPositive([1, -4, 2]) return qiladi "12"

/*
function getPositive(a: number[]) {
  return a.filter((ele) => ele > 0).join("");
}

const result = getPositive([1, -4, 2]);
console.log(result);
*/

// --------------------H2-TASK:----------------------------

// Shunday function tuzing, unga string argument pass bolsin.
// Function ushbu agrumentdagi digitlarni yangi stringda return qilsin
// MASALAN: getDigits("m14i1t") return qiladi "141"

/*
function getDigits(str: string) {
  const arr = Array.from(str);

  return arr.filter(char => char > '0' && char < '9').join('');
}
const result = getDigits('m14i1t');
console.log(result);
*/

// -------------------TASK I:------------------------------

// Shunday function tuzing, u parametrdagi array ichida eng ko'p
// takrorlangan raqamni topib qaytarsin.
// MASALAN: majorityElement([1, 2, 3, 4, 5, 4, 3, 4]); return 4
// Yuqoridag misolda argument sifatida kiritilayotgan array tarkibida 4 soni ko'p takrorlanganligi uchun 4'ni return qilmoqda.

/*
function majorityElement(arr: (string | number)[]): number | number[] {

  const timesRepeated: Record<string, number> = arr.reduce((accumulator, num) => {
    const key = String(num);
    accumulator[key] = (accumulator[key] || 0) + 1; // 1: 1
    return accumulator;
  }, {} as Record<string, number>);

  const maxOccurrence = Math.max(...Object.values(timesRepeated));

  const maxNums = Object.keys(timesRepeated)
    .filter((key) => timesRepeated[key] === maxOccurrence)
    .map(Number);

  return maxNums.length === 1 ? maxNums[0] : maxNums;
}

const result = majorityElement([1, 2, 3, 4, 5, 4, 3, 4]);
console.log('Result:', result); // Result: 4
*/

/*
function duplicateDigits(not: number[]) {

  let mostRepeated = 0;
  let maxCount = 0;

  not.forEach(num => {
    const counting = not.filter((a) => a === num).length;

    if (counting > maxCount) {
      maxCount = counting;
      mostRepeated = num;
    }
    console.log(maxCount, mostRepeated);
  });

  return mostRepeated;
}

console.log("Result:", duplicateDigits([10, 20, 40, 50, 10, 10]));
*/

// --------------------TASK J:-----------------------

// Shunday function tuzing, u string qabul qilsin.
// Va string ichidagi eng uzun so'zni qaytarsin.
// MASALAN: findLongestWord("I came from Uzbekistan!"); return "Uzbekistan!"

/* // 1st solution using sort method
function findLongestWord(string: string) {
  const stringArray: string[] | null = string.split(" ");

  if (!stringArray) return "";

  stringArray.sort((a, b) => b.length - a.length);

  return stringArray[0];
}
const result = findLongestWord("I came from Uzbekistan!");
console.log(result);
*/

/* // 2nd solution using reduce method
function findLongestWord(string: string) {
  const stringArray = string.split(" ");

  if (!stringArray) return "";

  return stringArray.reduce((accumulator, word) => {
    if (word.length > accumulator.length) {
      accumulator = word;
    }
    return accumulator;
  }, "");
}

const result = findLongestWord("I came from Uzbekistan!");
console.log(result);
*/

// --------------------TASK K:-----------------------

// Berilayotgan parametr tarkibida nechta unli harf bor ekanligini aniqlovchi function tuzing
// MASALAN: countVowels("string"); return 1
// Yuqoridagi misolda 'string' so'zi tarkibida yagona unli harf 'i' bo'lganligi uchun '1'ni qaytarmoqda

/*
function countVowels(a: string): number {
  const vowels = a.match(/[aeiou]/gi);
  return vowels ? vowels.length : 0;
}
const result = countVowels("string");
console.log(result);
*/

/*
function countVowels(a){
  const b = a.toLowerCase();
  
  const vowelsArray = ["a", "e", "i", "o", "u"];
  
  let count= 0;
  for (let i = 0; i < b.length; i++) {
    if (vowelsArray.includes(b[i])) count++;
  }
  
  return count;
}
*/

// --------------------TASK L:-----------------------
// So'zlarni ketma - ketligini buzmasdan har bir so'zni alohida teskarisiga o'girib beradigan fucntion tuzing.
// Funtion yagona string qabul qilsin

// MASALAN: reverseSentence("we like coding!") return "ew ekil !gnidoc";
// Qaytayotgan natijaga e'tibor bersangiz, so'zlar joyi o'zgarmasdan turgan o'rnida teskarisiga o'girilmoqda

/*
function reverseSentence(words: string) {
  return words
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
}
const result = reverseSentence("we like coding!");
console.log(result);
*/

// --------------------TASK M:-----------------------

// Shunday function tuzing, u raqamlardan tashkil topgan array qabul qilsin
// va array ichidagi har bir raqam uchun raqamning o'zi va hamda o'sha raqamni kvadratidan
// tashkil topgan object hosil qilib, hosil bo'lgan objectlarni array ichida qaytarsin

// MASALAN: MASALAN: getSquareNumbers([1, 2, 3])
// return [{ number: 1, square: 1 }, { number: 2, square: 4 }, { number: 3, square: 9 }];

/*
function getSquareNumbers(
  numArray: number[]
): { number: number; square: number }[] {
  return numArray.reduce(
    (accumulator: { number: number; square: number }[], item) => {
      accumulator.push({ number: item, square: item * item });
      return accumulator;
    },
    []
  );
}

const result = getSquareNumbers([1, 2, 3]);
console.log(result);
*/

// --------------------TASK N:-----------------------

// Parametr sifatida yagona string qabul qiladigan function tuzing.
// Va bu function string'ni palindrom so'z yoki palindrom so'z emasligini aniqlab (boolean)
// 'true' yokida 'false' qaytarsin.

// MASALAN: palindromCheck("dad") return true; palindromCheck("son") return false;
// Birinchi misolda 'dad' so'zini ikkala tarafdan o'qilganda ham bir xil ma'noni beradi (true)
// Ikkinchi misolda 'son' so'zini ikkala tarafdan o'qilganda bir xil ma'noni bermaydi (false)

/*
function palindromCheck(word: string): boolean {
  const wordReversed = word.split("").reverse().join("");
  return word === wordReversed;
}
const result = palindromCheck("dad");
console.log("result:", result);
*/

// --------------------TASK O:-----------------------

// Shunday function yozing va u har xil qiymatlardan iborat array qabul qilsin.
// Va array ichidagi sonlar yig'indisini hisoblab chiqgan javobni qaytarsin
// MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]); return 45

// Yuqoridagi misolda array tarkibida faqatgina ikkita yagona son mavjud bular 10 hamda 35
// Qolganlari nested bo'lib yoki type'lari number emas.

/*
function calculateSumOfNumbers(arr: any[]) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") count += arr[i];
  }
  return count;
}
const result = calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]);
console.log("result:", result);
*/

// --------------------TASK P:-----------------------

// Parametr sifatida yagona object qabul qiladigan function yozing.
// Qabul qilingan objectni nested array sifatida convert qilib qaytarsin
// MASALAN: objectToArray( {a: 10, b: 20}) return [['a', 10], ['b', 20]]

/*
function objectToArray(obj: Record<string, any>) {
  return Object.entries(obj);
}
const result = objectToArray({ a: 10, b: 20 });
console.log(result);
*/

// --------------------TASK Q:-----------------------

// Shunday function yozing, u 2 ta parametrga ega bo'lib
// birinchisi object, ikkinchisi string bo'lsin.
// Agar qabul qilinayotgan ikkinchi string, objectning
// biror bir propertysiga mos kelsa, 'true', aks holda mos kelmasa 'false' qaytarsin.

// MASALAN: hasProperty({ name: "BMW", model: "M3" }, "model"); return true;
// Ushbu misolda, 'model' string, objectning propertysiga mos kelganligi uchun 'true' natijani qaytarmoqda

// MASALAN: hasProperty({ name: "BMW", model: "M3" }, "year"); return false;
// Ushbu misolda, ikkinchi argument sifatida berilayotgan 'year' objectning
// propertysida mavjud bo'lmaganligi uchun 'false' natijani qaytarmoqda.

/*
function hasProperty(obj: Record<string, any>, str: string) {
  const result = obj.hasOwnProperty(str);
  return result;
}

const result = hasProperty({ name: "BMW", model: "M3" }, "year");
console.log(result);
*/

// --------------------TASK R:-----------------------

// Shunday function yozing, u string parametrga ega bo'lsin.
// Agar argument sifatida berilayotgan string, "1 + 2" bo'lsa,
// string ichidagi sonlarin yig'indisni hisoblab, number holatida qaytarsin

// MASALAN: calculate("1 + 3"); return 4;
// 1 + 3 = 4, shu sababli 4 natijani qaytarmoqda.

/*
function calculate(str: string): number {
  return eval(str);
}
const result = calculate("1 + 3");
console.log(result);
*/

// --------------------TASK S:-----------------------

// Shunday function tuzing, u numberlardan tashkil topgan array qabul qilsin
// va o'sha numberlar orasidagi tushib qolgan sonni topib uni return qilsin.

// MASALAN: missingNumber([3, 0, 1]); return 2

/*
function missingNumber(arr: number[]) {
  const maxNum = Math.max.apply(null, arr);
  const minNum = Math.min.apply(null, arr);
  console.log(maxNum, minNum);

  const result = [];

  for (let i = minNum + 1; i < maxNum; i++) {
    if (!arr.includes(i)) result.push(i);
  }

  return result.length === 1 ? result[0] : result.toString();
}
const result = missingNumber([3, 0, 1, 4, 7]);
console.log(result);
*/

// --------------------TASK T:-----------------------

// Shunday function tuzing, u sonlardan tashkil topgan 2'ta array qabul qilsin.
// Va ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin.

// MASALAN: mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]); return [0, 3, 4, 4, 6, 30, 31];

/*
function mergeSortedArrays(arr1: number[], arr2: number[]) {
  return arr1.concat(arr2).sort((a, b) => a - b);
}

const result = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
console.log(result);
*/

// --------------------TASK U:-----------------------

// Shunday function tuzing, uni number parametri bo'lsin.
// Va bu function berilgan parametrgacha, 0'dan boshlab
// oraliqda nechta toq sonlar borligini aniqlab return qilsi.

// MASALAN: sumOdds(9) return 4; sumOdds(11) return 5;

/*
function sumOdds(a: number): number {
  return a % 2 === 1 ? (a - 1) / 2 : a / 2;
}
const result = sumOdds(11);
console.log(result);
*/

// --------------------TASK V:-----------------------

// Shunday function yozing, uni string parametri bo'lsin.
// Va bu function stringdagi har bir harfni o'zi bilan
// necha marotaba taktorlanganligini ko'rsatuvchi object qaytarsin.

// MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}

/*
function countChars(str: string) {
  return str.split("").reduce((acc, char) => {
    if (!acc[char]) acc[char] = 1;
    else acc[char] += 1;
    return acc;
  }, {} as Record<string, number>);
}

const result = countChars("hello");
console.log(result);
*/

// --------------------TASK W:-----------------------

// Shunday function yozing, u o'ziga parametr sifatida
// yagona array va number qabul qilsin. Siz tuzgan function
// arrayni numberda berilgan uzunlikda kesib bo'laklarga
// ajratgan holatida qaytarsin.
// MASALAN: chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
// return [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];

/*
function chunkArray(arr: any[], a: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += a) {
    result.push(arr.slice(i, i + a));
  }
  return result;
}
const result = chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
console.log(result);
*/

// --------------------TASK X:-----------------------

// Shunday function yozing, uni object va string parametrlari bo'lsin.
// Bu function, birinchi object parametri tarkibida, kalit sifatida ikkinchi string parametri
// necha marotaba takrorlanganlini sanab qaytarsin.

// Eslatma => Nested object'lar ham sanalsin

// MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2

/*
function countOccurrences(obj: object, str: string): number {
  const arr = Object.entries(obj);
  let count = 0;

  arr.forEach((char) => {
    for (let ele of char) {
      if (typeof ele == "object") {
        count = count + countOccurrences(ele, str);
      } else {
        if (ele == str) count++;
      }
    }
  });

  return count;
}

const result = countOccurrences(
  { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
  "model"
);
console.log(result);
*/

// --------------------TASK Y:-----------------------

// Shunday function yozing, uni 2'ta array parametri bo'lsin.
// Bu function ikkala arrayda ham ishtirok etgan bir xil
// qiymatlarni yagona arrayga joylab qaytarsin.

// MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3]

/*
function findIntersection(a: number[], b: number[]): number[] {
  return a.filter((num) => b.includes(num));
}
const result = findIntersection([1, 2, 3], [3, 2, 0]);
console.log(result);
*/

// --------------------TASK Z:-----------------------

// Shunday function yozing. Bu function sonlardan iborat array
// qabul qilsin. Function'ning vazifasi array tarkibidagi juft
// sonlarni topib ularni yig'disini qaytarsin.

// MASALAN:
// sumEvens([1, 2, 3]); return 2;
// sumEvens([1, 2, 3, 2]); return 4;

/*
function sumEvens(arr: number[]): number {
  return arr.reduce((total: number, number: number) => {
    // if (number % 2 === 0) total += number;
    // return total;
    return number % 2 === 0 ? total + number : total;
  }, 0);
}
const result = sumEvens([5, 11, 10, 7, 4, 8]);
console.log(result);
*/

// --------------------TASK ZA:-----------------------

// Shunday function yozing, u array ichidagi objectlarni
// 'age' qiymati bo'yicha sortlab bersin.

// MASALAN: sortByAge([{age:23}, {age:21}, {age:13}]) return [{age:13}, {age:21}, {age:23}]

/*
interface ObjectType extends Object {
  age: number;
}

const sortByAge = (array: ObjectType[]): ObjectType[] => {
  const sortedArray = array.sort((p1, p2) =>
    p1.age > p2.age ? 1 : p1.age < p2.age ? -1 : 0
  );
  return sortedArray;
};

const result = sortByAge([{ age: 23 }, { age: 21 }, { age: 13 }]);
console.log(result);
*/

// --------------------TASK ZC:-----------------------

// Selisy (°C) shkalasi bo'yicha raqam qabul qilib, uni
// Ferenhayt (°F) shkalisaga o'zgaritib beradigan function yozing.

// MASALAN: celsiusToFahrenheit(0) return 32;
// MASALAN: celsiusToFahrenheit(10) return 50;

// Formula	(0°C × 9/5) + 32 = 32°F

/*
const celsiusToFahrenheit = (temp: number) => {
  return (temp * 9) / 5 + 32;
};

const result = celsiusToFahrenheit(10);
console.log(result);
*/

// --------------------TASK ZD:-----------------------

// Shunday function yozing. Bu function o'ziga, parametr sifatida
// birinchi oddiy number, keyin yagona array va uchinchi bo'lib oddiy number
// qabul qilsin. Berilgan birinchi number parametr, arrayning tarkibida indeks bo'yicha hisoblanib,
// shu aniqlangan indeksni uchinchi number parametr bilan alashtirib, natija sifatida
// yangilangan arrayni qaytarsin.

// MASALAN: changeNumberInArray(1, [1,3,7,2], 2) return [1,2,7,2];

// Yuqoridagi misolda, birinchi raqam bu '1' va arrayning '1'chi indeksi bu 3.
// Bizning function uchinchi berilgan '2' raqamini shu '3' bilan almashtirib,
// yangilangan arrayni qaytarmoqda.

/*
const changeNumberInArray = (ind: number, arr: number[], num: number) => {
  arr[ind] = num;
  return arr;
};
const result = changeNumberInArray(1, [1, 3, 7, 2], 2);
console.log(result);
*/

// --------------------TASK ZE:-----------------------

// Shunday function yozing, uniygona string parametri mavjud bo'lsin.
// Bu function string tarkibidagi takrorlangan xarflarni olib tashlab qolgan
// qiymatni qaytarsin.

// MASALAN: removeDuplicate('stringg') return 'string'

/*
const removeDuplicate = (string: string) => {
  return string
    .split("")
    .filter((char, i, arr) => char !== arr[i - 1])
    .join("");
};

const result = removeDuplicate("ssssstttrrinnngg wooowww");
console.log(result);
*/

// --------------------TASK ZF:-----------------------

// Shunday function yozing, uni string parametri bo'lsin.
// Ushbu function, har bir so'zni bosh harflarini katta harf qilib qaytarsin.
// Lekin uzunligi 1 yoki 2 harfga teng bo'lgan so'zlarni esa o'z holicha
// qoldirsin.

// MASALAN: capitalizeWords('name should be a string'); return 'Name Should be a String';

/*
const capitalizeWords = (input: string) => {
  return input
    .split(" ")
    .map((word: string) => {
      if (word.length > 2) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
};
const result = capitalizeWords("name should be a string");
console.log(result);
*/

// --------------------TASK ZG:-----------------------

// String sifatida berilgan string parametrni
// snake case'ga o'tkazib beradigan function yozing.

// MASALAN: convertToSnakeCase('name should be a string')
// return 'name_should_be_a_string'

/*
const convertToSnakeCase = (input: string) => {
  return input.split(" ").join("_");
};
const result = convertToSnakeCase("name should be a string");
console.log(result);
*/

// --------------------TASK ZH:-----------------------

// Shunday function yozing, u berilgan array parametri ichidagi
// raqamlar orasidan, tartib bo'yicha eng kichik raqamdan, eng katta raqamgacha
// tushirib qoldirilgan sonlarni o'zinigina topib bir array sifatida qaytarsin.

// MASALAN: findDisappearedNumbers([1, 3, 4, 7]); return [2, 5, 6];

function findDisappearedNumbers(arr: number[]) {
  const maxNum = Math.max.apply(null, arr);
  const minNum = Math.min.apply(null, arr);
  // console.log(maxNum, minNum);

  const result = [];

  for (let i = minNum + 1; i < maxNum; i++) {
    if (!arr.includes(i)) result.push(i);
  }

  return result;
}
const result = findDisappearedNumbers([1, 3, 4, 7]);
console.log(result);
