const dogs = [
    {name: "Fido", age: 5, owner: "Sam", adopted: true},
    {name: "Stella", age: 2, owner: "", adopted: false},
    {name: "Spot", age: 6, owner: "Diane", adopted: true},
    {name: "Clifford", age: 1, owner: "", adopted: false},
    {name: "Bruiser", age: 8, owner: "Sam", adopted: true},
    {name: "Frodo", age: 3, owner: "", adopted: false},
  ]
  const dogsId = dogs.map((dog, index)=>{
    dog.id = index;
    return dog;
  })

  console.log(dogsId);

  const puppies = dogs.filter(dog => dog.age < 5)
  const nonpuppies = dogs.filter(dog => dog.age >= 5)
  console.log(puppies);
  console.log(nonpuppies);


  //every
  const allDogsAdopted = dogs.every(dog => dog.adopted)
  const allDogsAdoptd = dogs.some(dog => dog.adopted)

  console.log();


  const sortedByAge = dogs.sort((dog1, dog2)=>{
    return dog1.age - dog2.age;
  })