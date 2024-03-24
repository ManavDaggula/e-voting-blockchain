// const Ballot = artifacts.require("Ballot");
// const ElectoralPoll = artifacts.require("ElectoralPoll")
const ElectoralCommittee = artifacts.require("ElectoralCommittee");
const Identity = artifacts.require("Identity");
// const EventEmitter = artifacts.require("EventEmitter");

module.exports = function (deployer) {
  // deployer.deploy(Ballot);
  deployer.deploy(ElectoralCommittee);
  deployer.deploy(Identity);
  // deployer.deploy(EventEmitter);
};
