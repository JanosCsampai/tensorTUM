
var responses = [
    ["Bob", 10],
    ["Catherine", 4]
]
class LeaderboardResults {

    getResponses() {
        return responses;
    }

    containsUsername(name) {
        return responses.map(x => x[0]).includes(name);
    }

    addResult(player, score) {
        responses.push([player, score])
        responses.sort(
            function (first, second) {
                if (first[1] > second[1]) return -1;
                if (first[1] < second[1]) return 1;
                return 0;
            });
    }
}

export default new LeaderboardResults()