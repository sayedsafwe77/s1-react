const texts = document.getElementsByClassName("text");
const arr = Array.from({ length: 10 }, (_, i) => {
  console.log(i);
  return texts[i]?.textContent;
});
console.log(arr);
