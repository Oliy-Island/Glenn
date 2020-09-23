module.exports.run = async function () {
    const activeElection = await this.client.db.Election.checkActive()
    if (!activeElection) return this.error('There is currently no active election');

    let candidates = '**Election Candidates** \n'

    activeElection.candidates.forEach((candidate, i) => {
      const candidateText = candidates.concat(`<@${candidate}> `)
      candidates = candidateText;
    });


    return this.reply(candidates);
}
