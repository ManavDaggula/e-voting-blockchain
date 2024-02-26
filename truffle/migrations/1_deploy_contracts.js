// const Ballot = artifacts.require("Ballot");
// const ElectoralPoll = artifacts.require("ElectoralPoll")
const ElectoralCommittee = artifacts.require("ElectoralCommittee")

module.exports = function (deployer) {
  // deployer.deploy(Ballot);
  deployer.deploy(ElectoralCommittee);
};
