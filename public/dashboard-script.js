const leaderboard2 = document.querySelector('.leaderboard');
async function leaderboard() {
  let { data } = await axios.get('/users/getUsers');
  console.log(data);
  let sorted = data.sort(compareScore);
  sorted.forEach((element) => {
    console.log(element);
    leaderboard2.innerHTML += `<li>${sorted.indexOf(element) + 1}. ${
      element.first_name
    }: ${element.highest_win_streak}</li>`;
  });
}
function compareScore(a, b) {
  return b.highest_win_streak - a.highest_win_streak;
}
