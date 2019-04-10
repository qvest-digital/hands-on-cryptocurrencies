pragma solidity >=0.5.0 <0.7.0;

/**
 * Base class for a contract that has an owner
 */
contract Owned {

    address owner;
    constructor() public { owner = msg.sender; }
    
    // modifier to enforce that only the contract owner can call
    // a function, otherwise an exception is thrown.
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function!");
        _;
    }
    
}

/**
 * Base class for a contract that can be killed by its owner.
 */
contract Mortal is Owned {

    /* Function to recover the funds on the contract */
    function close() public onlyOwner {
        selfdestruct(msg.sender);
    }
    
}

// ----------------------------------------------------------------------------
// Custom "Hello World" token contract, follows ERC20 standard.
// ----------------------------------------------------------------------------

contract HelloWorldToken is Owned, Mortal {

	// Information about this token

    string  constant public name        = "Hello World Token";
    string  constant public symbol      = "HELLOWORLD";
    uint8   constant public decimals    = 0;
    uint256 constant public totalSupply = 100;

    address constant zeroAddress = address(0);

    // Track how many tokens are owned by each address.

	mapping (address => uint256) public balanceOf;

    constructor() public {
        // Initially all tokens are in the "zero" address
        balanceOf[zeroAddress] = totalSupply;
        emit Transfer(zeroAddress, zeroAddress, totalSupply);
    }
    
	// Normal token transfer functionality
	
    event Transfer(address indexed from, address indexed to, uint tokens);

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value);

        balanceOf[msg.sender] -= value;  // deduct from sender's balance
        balanceOf[to] += value;          // add to recipient's balance
        emit Transfer(msg.sender, to, value);
        return true;
    }

	// Delegated transfer functionality

    mapping(address => mapping(address => uint256)) allowance;

    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(value <= balanceOf[from]);
        require(value <= allowance[from][msg.sender]);

        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        
        emit Transfer(from, to, value);
        return true;
    }
	
	// Request functionality: allow users to request 1 token per call until all tokens have been distributed.

    /**
     * Grab 1 token by transferring it from "zero" address to sender.
     */
    function grab() public {
        require(balanceOf[zeroAddress] >= 1, "Sorry, out of tokens!");
        
        balanceOf[zeroAddress] -= 1;
        balanceOf[msg.sender] += 1;
        
        emit Transfer(zeroAddress, msg.sender, 1);
    }

    /**
     * Returns the number of tokens available for grabbing.
     */
    function upForGrabs() public view returns (uint256 available) {
        return balanceOf[zeroAddress];
    }
	
}
