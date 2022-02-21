const { expect } = require("chai");

describe("Magic Number", function () {
  it("Should return the number 42", async function () {

    const [user1, user2] = await ethers.getSigners();

    const MagicNumber = await ethers.getContractFactory("MagicNum");

    this.magicNumber = await MagicNumber.deploy();

    console.log(`MagicNumber deployed to ${this.magicNumber.address}`);
    console.log(`current solver address: ${await this.magicNumber.solver()}`);
    
    const bytecode = "600a80600e600039806000f350fe602a60005260206000f3";
    const interface = ["function whatIsTheMeaningOfLife() returns (uint256)"];

    const Solution = new ethers.ContractFactory(interface, bytecode, user2);
    this.solution = await Solution.deploy();

    await this.magicNumber.setSolver(this.solution.address);
    console.log(`new solver address: ${await this.magicNumber.solver()}`);

    // should return 42 when whatIsTheMeaningOfLife() is called
    expect(await this.solution.callStatic.whatIsTheMeaningOfLife()).to.equal(42);
  });
});
