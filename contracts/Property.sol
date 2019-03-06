pragma solidity ^0.5.0;

contract Property {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        uint licenseNumber;
        uint registrationNumber;
        uint size;
        string location;
        uint rooms;
        uint price;
        string ownerName;
        address ownerAddress;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("House A", 1234, 1111, 120, "NED", 4, 250, "Ali");
        addCandidate("House B", 2541, 2222, 240, "Johar", 6, 750, "Furqan");
        addCandidate("House C", 1234, 1111, 120, "NED", 4, 250, "Ali");
        addCandidate("House D", 2541, 2222, 240, "Johar", 6, 750, "Furqan");
    }

    function addCandidate (string memory _name, uint _licenseNumber, uint _registrationNumber, uint _size, string memory _location, uint _rooms, uint _price, string memory _ownerName) public {
        candidatesCount ++;
        address senderAddress = msg.sender;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _licenseNumber, _registrationNumber, _size, _location, _rooms, _price, _ownerName, senderAddress);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
