pragma solidity >=0.5.0 <0.7.0;

/**
 * Base class for a contract that has an owner
 */
contract owned {

    constructor() public { owner = msg.sender; }
    address owner;
    
    // modifier to enforce that only the contract owner can call
    // a function, otherwise an exception is thrown.
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function!"
        );
        _;
    }
    
}

/**
 * Base class for a contract that can be killed by its owner.
 */
contract mortal is owned {

    /* Function to recover the funds on the contract */
    function close() public onlyOwner {
        selfdestruct(msg.sender);
    }
    
}
