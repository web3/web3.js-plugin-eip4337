import Web3, { core } from "web3";
import { EIP4337Plugin } from "../src";

describe("EIP4337Plugin Tests", () => {
  it("should register TokensPlugin plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new EIP4337Plugin());
    expect(web3Context.EIP4337).toBeDefined();
  });

  it("should register TokensPlugin plugin on Web3 instance", () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    web3.registerPlugin(new EIP4337Plugin());
    expect(web3.EIP4337).toBeDefined();
  });

  describe("EIP4337Plugin method tests", () => {
    let consoleSpy: jest.SpiedFunction<typeof global.console.log>;

    let web3Context: Web3;

    beforeAll(() => {
      web3Context = new Web3("http://127.0.0.1:8545");
      web3Context.registerPlugin(new EIP4337Plugin());
      consoleSpy = jest.spyOn(global.console, "log").mockImplementation();
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });

    it("should call TempltyPlugin test method with expected param", () => {
      web3Context.EIP4337.test("test-param");
      expect(consoleSpy).toHaveBeenCalledWith("test-param");
    });
  });
});
