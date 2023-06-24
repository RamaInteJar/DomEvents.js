


const capitalise = (word) => {
 // your code here
 let answer = ''
 for(let i=0; i<word.length; i++){
    // console.log(word[i].toUpperCase());
    if(i===0 || i===4){
        answer = answer + word[i].toUpperCase();
    } else{
        answer = answer + word[i]
        
    }
 }
return answer
}
console.log(capitalise('hello'));

// answer.forEach(word => {
    
// });
 // 'Hello'
// capitalize('howdy') // 'Howdy'
// capitalize('aloha') // 'Aloha'

// const capitalizes = (word) => {
//     // your code here
//        let a = word.slice()
//        return word.charAt(1).toUpperCase() + a.split('').splice(1).join(')
   
//    }
   
//    console.log(capitalizes("howdy"))

word.split('').forEach(letter => {
    
});


// Warm up COde

const capitalize = (word) => {
    let answer = "";
    word.split("").forEach((letter, i) => {
      if (i === 0 || i === word.length - 1) {
        answer += word[i].toUpperCase();
      } else {
        answer += word[i];
      }
    });
    return answer;
  
    //   let answer = "";
  
    //   for (let i = 0; i < word.length; i++) {
    //     if (i === 0 || i === word.length - 1) {
    //       answer += word[i].toUpperCase();
    //     } else {
    //       answer += word[i];
    //     }
    //   }
  
    //   return answer;
  
    //   return word.charAt(0).toUpperCase() + word.slice(1);
  };
  
  const swapcase = (word) => {
    let answer = "";
  
    word.split("").forEach((letter) => {
      if (letter === letter.toUpperCase()) {
        answer += letter.toLowerCase();
      } else {
        answer += letter.toUpperCase();
      }
    });
  
    return answer;
  };
  
  // console.log(swapcase("Superman Yeah"));
  
  const wackycase = (word) => {
    // lowecase the first letter
    // case swap inbetween other letters
    return word
      .split("")
      .map((letter, i) => {
        // map wants us to return something
        if (i % 2 === 0) {
          // the remainder is 0, then the number is even
          return letter.toLowerCase();
        } else {
          return letter.toUpperCase();
        }
      })
      .join("");
  };
  
  // console.log(wackycase("Starcbucks"));
  
  const crazyFunction = (word) => {
    return word
      .split(" ")
      .map((word) => {
        return wackycase(word);
      })
      .join(" ");
  };
  
  console.log(crazyFunction("serious fun times"));
