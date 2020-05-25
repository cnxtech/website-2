module.exports.upVote = async function (id) {
  const key = encodeURIComponent(`upvotes_${id}`)
  let vote = await votes.get(key)
  await votes.put(key, parseInt(vote, 10) + 1)
  return true
}

module.exports.downVote = async function (id) {
  const key = encodeURIComponent(`downvotes_${id}`)
  let vote = await votes.get(key)
  await votes.put(key, parseInt(vote, 10) + 1)
  return true
}

module.exports.getVotes = async function (id) {
  const upVotesKey = encodeURIComponent(`upvotes_${id}`)
  const downVotesKey = encodeURIComponent(`upvotes_${id}`)
  let data = {
    upVotes: await votes.get(upVotesKey),
    downVotes: await votes.get(downVotesKey),
  }
  data.sum = parseInt(data.upVotes, 10) - parseInt(data.downVotes, 10)
  return data
}