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
// ERC Token Standard #20 Implementation
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------

contract TarentToken is Owned, Mortal {

	// Information about this token

    string  constant name        = "tarent Token";
    string  constant symbol      = "TARENT";
    uint8   constant decimals    = 0;
    uint256 constant totalSupply = 10;
    
    // Track how many tokens are owned by each address.

	mapping (address => uint256) balanceOf;

    constructor() public {
        // Initially assign all tokens to the contract's creator.
        balanceOf[owner] = totalSupply;
        emit Transfer(address(0), owner, totalSupply);
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
	
	// Giveaway functionality

    /**
     * Request transfer of 1 token from contract owner to sender.
     */
    function request() public {
        require(balanceOf[owner] >= 1, "Sorry, out of tokens!");
        
        balanceOf[owner] -= 1;
        balanceOf[msg.sender] += 1;
        
        emit Transfer(owner, msg.sender, 1);
    }
	
}
